import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { dataSource } from "./datasource";
import { ContextType } from "./middlewares/auth";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { populateBdd } from "./utils/populateBdd";
import { getSchema } from "./schema";
import { User } from "./entities/User";
import { initializeRoutes } from "./routes";

const start = async () => {
  const schema = await getSchema();

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<ContextType>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    cors<cors.CorsRequest>({
      credentials: true,
      origin: "http://localhost:3000",
      methods: ["POST", "GET"],
    })
  );

  initializeRoutes(app);

  app.use(
    "/",
    express.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async (arg) => {
        return {
          req: arg.req,
          res: arg.res,
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  //console.log(`🚀 Server ready at http://localhost:4000/`);

  await dataSource.initialize();
  const user = await User.findOneBy({ email: "admin@ressources.com" });
  if (!user) {
    await populateBdd();
  }
};
start();
