import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { dataSource } from "./datasource";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { TagResolver } from "./resolvers/Tag";
import { CategoryResolver } from "./resolvers/Category";
import { AdResolver } from "./resolvers/Ad";

const start = async () => {
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  });

  const server = new ApolloServer({ schema });
  await dataSource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};
start();
