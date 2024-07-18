import { DataSource } from "typeorm";
import { getSchema } from "../src/schema";
import { dataSourceOptions } from "../src/datasource";
import { GraphQLSchema } from "graphql";
import { serialize, parse } from "cookie";

let schema: GraphQLSchema;
let dataSource: DataSource;

function mockContext(token?: string) {
  const value: { context: any; token?: string } = {
    token,
    context: {
      req: {
        headers: {
          cookie: token ? serialize("token", token) : undefined,
        },
        connection: { encrypted: false },
      },
      res: {
        getHeader: () => "",
        setHeader: (key: string, cookieValue: string | string[]) => {
          if (key === "Set-Cookie") {
            const parsedValue = parse(
              Array.isArray(cookieValue) ? cookieValue[0] : cookieValue
            );
            if (parsedValue.token) {
              value.token = parsedValue.token;
            }
          }
        },
        headers: {},
      },
    },
  };
  return value;
}

beforeAll(async () => {
  schema = await getSchema();

  dataSource = new DataSource({
    ...dataSourceOptions,
    dropSchema: true,
    logging: false,
  });

  await dataSource.initialize();
});

afterAll(() => {
  dataSource.destroy();
});

export { schema, mockContext };
