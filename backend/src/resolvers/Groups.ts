import {
  Arg,
  Authorized,
  ID,
  Mutation,
  Query,
  Resolver,
  Ctx,
} from "type-graphql";
import { Group, GroupInput, GroupsMembers } from "../entities/Group";
import { Member } from "../entities/Member";
import { validate } from "class-validator";
import { DummyGroups } from "../dummyDatas";
import { ContextType } from "../middlewares/auth";

@Resolver(Group)
export class GroupResolver {
  @Query(() => [Group])
  async getAllGroups(): Promise<Group[]> {
    return await Group.find();
  }

  @Query(() => Group)
  async getOneGroup(@Arg("id", () => ID) id: number): Promise<Group | null> {
    try {
      const group = await Group.findOne({ where: { id: id } });
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
        where: { created_by_user: { id: context.user?.id } },
        relations: {
          created_by_user: true,
        },
      });

      const groupMember = await Member.find({
        where: { user: { id: context.user?.id } },
        relations: {
          group: true,
          user: true,
        },
      });

      if (groupMember.length > 0) {
        groupMember.forEach((element) => {
          group.push(element.group);
        });
      }

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
      newGroup.name = data.name;
      newGroup.description = data.description;

      if (context.user) {
        newGroup.created_by_user = context.user;
      }

      const error = await validate(newGroup);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newGroup.save();
        return datas;
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
  async deleteGroup(@Arg("id", () => ID) id: number): Promise<Group | null> {
    try {
      const group = await Group.findOne({ where: { id: id } });
      if (group) {
        await group.remove();
        group.id = id;
      }
      return group;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
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
          const datas = await newGroup.save();
        }
      } catch (error) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      }
    }
    return await this.getAllGroups();
  }
}
