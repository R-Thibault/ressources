import { graphql, print } from "graphql";
import { schema, mockContext } from "../jest.setup";
import { token } from "../user/user.jest";
import * as groupRequest from "./request";

export const groupResolverTests = () => {
  it("user creates a new group", async () => {
    const mock = mockContext(token);
    const result = (await graphql({
      schema,
      source: print(groupRequest.CREATE_GROUP),
      variableValues: {
        data: {
          name: "test group",
          description: "test group description",
        },
      },
      contextValue: mock.context,
    })) as any;
    expect(result?.data?.createGroup?.id).toBe("1");
  });
  it("returns user's groups", async () => {
    const mock = mockContext(token);
    const result = (await graphql({
      schema,
      source: print(groupRequest.GET_MY_GROUPS),
      contextValue: mock.context,
    })) as any;
    expect(result?.data?.items).toBeInstanceOf(Array);
    expect(result?.data?.items[0].id).toBe("1");
    expect(result?.data?.items[0].name).toBe("test group");
  });
};
