import {
  Arg,
  Authorized,
  ID,
  Mutation,
  Query,
  Resolver,
  Ctx,
} from "type-graphql";
import { DeleteGroupInput, Group, GroupInput } from "../entities/Group";
import { Member } from "../entities/Member";
import { validate } from "class-validator";
import { ContextType, getUser } from "../middlewares/auth";
import { DummyGroups } from "../dummyDatas";

@Resolver(Group)
export class GroupResolver {
  @Authorized()
  @Query(() => [Group])
  async getAllGroups(): Promise<Group[]> {
    return await Group.find();
  }

  @Authorized()
  @Query(() => Group)
  async getOneGroup(@Arg("id", () => ID) id: number): Promise<Group | null> {
    try {
      const group = await Group.findOne({
        where: { id: id },
        relations: { created_by_user: true },
      });
      return group;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Query(() => [Group])
  async getMyGroups(@Ctx() context: ContextType): Promise<Group[]> {
    try {
      const group = await Group.find({
        where: { members: { user: { id: context.user?.id } } },
        relations: {
          created_by_user: true,
          members: { user: true },
        },
      });

      return group;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Group)
  async createGroup(
    @Ctx() context: ContextType,
    @Arg("data", () => GroupInput) data: GroupInput
  ): Promise<Group> {
    try {
      const newGroup = new Group();
      const newMember = new Member();
      newGroup.name = data.name;
      newGroup.description = data.description;

      if (context.user) {
        newGroup.created_by_user = context.user;
        newMember.user = context.user;
      }

      const error = await validate(newGroup);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const group = await newGroup.save();
        newMember.group = group;
        newMember.last_visit = new Date();
        await newMember.save();
        return group;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Group, { nullable: true })
  async updateGroup(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => GroupInput) data: GroupInput
  ): Promise<Group | null> {
    const group = await Group.findOne({ where: { id: id } });
    if (group) {
      group.updated_at = new Date();
      Object.assign(group, data);
      const errors = await validate(group);
      if (errors.length > 0) {
        throw new Error(`error occured ${JSON.stringify(errors)}`);
      } else {
        await group.save();
      }
      return group;
    } else {
      throw new Error(`No group found for id`);
    }
  }

  @Authorized()
  @Mutation(() => Group, { nullable: true })
  async deleteGroup(
    @Ctx() context: ContextType,
    @Arg("data", () => DeleteGroupInput) data: DeleteGroupInput
  ): Promise<Group | undefined> {
    const user = await getUser(context.req, context.res);
    if (user) {
      const group = await Group.findOne({
        where: { id: data.group_id },
        relations: { created_by_user: true, members: true, ressources: true },
      });
      if (group) {
        const groupMembers = await Member.findAndCount({
          where: { group: { id: data.group_id } },
        });
        if (group.created_by_user.id !== user.id) {
          throw new Error(`Vous n'êtes pas le créateur du groupe.`);
        } else {
          if (groupMembers[1] === 1 && group.created_by_user.id === user.id) {
            await group.remove();
            group.id = data.group_id;

            return group;
          } else {
            throw new Error("Vous n'êtes pas seul dans le groupe.");
          }
        }
      }
    } else {
      throw new Error(`No user found `);
    }
  }

  @Mutation(() => [Group])
  async populateGroupTable(): Promise<Group[] | null> {
    for (let i = 0; i < DummyGroups.length; i++) {
      try {
        const newGroup = new Group();
        newGroup.name = DummyGroups[i].name;
        newGroup.description = DummyGroups[i].description;
        newGroup.token = DummyGroups[i].token;
        newGroup.created_by_user = DummyGroups[i].created_by_user;
        newGroup.created_at = DummyGroups[i].created_at;

        const error = await validate(newGroup);

        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          await newGroup.save();
        }
      } catch (error) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      }
    }
    return await this.getAllGroups();
  }
}
