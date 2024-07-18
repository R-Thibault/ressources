import { graphql, print } from "graphql";
import { schema, mockContext } from "../jest.setup";
import * as userRequest from "./request";

let token: string | undefined;

export const userResolverTests = () => {
  it("creates a new user", async () => {
    const result = (await graphql({
      schema,
      source: print(userRequest.SIGN_UP),
      variableValues: {
        data: {
          email: "test@gmail.com",
          password: "monSup3rP@ssword",
          confirmPassword: "monSup3rP@ssword",
          firstname: "User",
          lastname: "Test",
          isTest: true,
        },
      },
    })) as any;
    expect(result?.data?.item?.id).toBe("1");
  });
  it("cannot create the same user", async () => {
    const result = (await graphql({
      schema,
      source: print(userRequest.SIGN_UP),
      variableValues: {
        data: {
          email: "test@gmail.com",
          password: "monSup3rP@ssword",
          confirmPassword: "monSup3rP@ssword",
          firstname: "User",
          lastname: "Test",
          isTest: true,
        },
      },
    })) as any;
    expect(!!result.errors).toBe(true);
  });
  it("sign in with the user", async () => {
    const mock = mockContext();
    const result = (await graphql({
      schema,
      source: print(userRequest.SIGN_IN),
      variableValues: {
        data: {
          email: "test@gmail.com",
          password: "monSup3rP@ssword",
          isTest: true,
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
      source: print(userRequest.MY_PROFILE),
      contextValue: mock.context,
    })) as any;
    expect(result?.data?.item).toBeNull();
  });
  it("returns the profile if connected", async () => {
    const mock = mockContext(token);
    const result = (await graphql({
      schema,
      source: print(userRequest.MY_PROFILE),
      contextValue: mock.context,
    })) as any;
    expect(result?.data?.item.id).toBeTruthy();
    expect(result?.data?.item.email).toBeTruthy();
  });
};

export { token };
