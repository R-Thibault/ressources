import { GraphQLSchema, graphql, print } from "graphql";
import { DataSource } from "typeorm";
import { getSchema } from "../../src/schema";
import { dataSourceOptions } from "../../src/datasource";
import * as userMutations from "./mutations";
import { serialize, parse } from "cookie";

let schema: GraphQLSchema;
let dataSource: DataSource;
let token: string | undefined;

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

describe("tests user resolver", () => {
  it("creates a new user", async () => {
    const result = (await graphql({
      schema,
      source: print(userMutations.SIGN_UP),
      variableValues: {
        data: {
          email: "test@gmail.com",
          password: "monsuperpassword",
          firstname: "User",
          lastname: "Test",
        },
      },
    })) as any;
    expect(result?.data?.item?.id).toBe("1");
  });
  it("cannot create the same user", async () => {
    const result = (await graphql({
      schema,
      source: print(userMutations.SIGN_UP),
      variableValues: {
        data: {
          email: "test@gmail.com",
          password: "monsuperpassword",
          firstname: "User",
          lastname: "Test",
        },
      },
    })) as any;
    expect(!!result.errors).toBe(true);
  });
  it("sign in with the user", async () => {
    const mock = mockContext();
    const result = (await graphql({
      schema,
      source: print(userMutations.SIGN_IN),
      variableValues: {
        data: {
          email: "test@gmail.com",
          password: "monsuperpassword",
        },
      },
      contextValue: mock.context,
    })) as any;
    expect(result?.data?.item?.id).toBe("1");
    expect(!!mock.token).toBe(true);
    token = mock.token;
  });
  it("returns null if not connected", async () => {
    const mock = mockContext();
    const result = (await graphql({
      schema,
      source: print(userMutations.MY_PROFILE),
      contextValue: mock.context,
    })) as any;
    expect(result?.data?.item).toBeNull();
  });
  it("returns the profile if connected", async () => {
    const mock = mockContext(token);
    const result = (await graphql({
      schema,
      source: print(userMutations.MY_PROFILE),
      contextValue: mock.context,
    })) as any;
    expect(result?.data?.item.id).toBeTruthy();
    expect(result?.data?.item.email).toBeTruthy();
  });
});
