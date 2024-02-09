import {NonEmptyArray, buildSchema } from "type-graphql";
import { TagResolver } from "./resolvers/Tags";
import { UserResolver } from "./resolvers/Users";
import { RightResolver } from "./resolvers/Right";
import { RessourceResolver } from "./resolvers/Ressources";
import { MessageResolver } from "./resolvers/Messages";
import { MemberResolver } from "./resolvers/Members";
import { LinkResolver } from "./resolvers/Links";
import { ImageResolver } from "./resolvers/Images";
import { GroupResolver } from "./resolvers/Groups";
import { FileResolver } from "./resolvers/Files";
import { customAuthChecker } from "./middlewares/auth";

export const testSchema: NonEmptyArray<Function> = [UserResolver];
export const prodSchema: NonEmptyArray<Function> = [
  TagResolver,
  UserResolver,
  RightResolver,
  RessourceResolver,
  MessageResolver,
  MemberResolver,
  LinkResolver,
  ImageResolver,
  GroupResolver,
  FileResolver,
];

export async function getSchema(schema: NonEmptyArray<Function>) {
  return await buildSchema({
    resolvers: schema,
    authChecker: customAuthChecker,
  });
}
