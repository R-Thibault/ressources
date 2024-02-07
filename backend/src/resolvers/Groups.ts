import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Group, GroupCreateInput, GroupUpdateInput } from "../entities/Group";
import { validate } from "class-validator";

@Resolver(Group)
export class GroupResolver {
  @Query(() => [Group])
  async getAllGroup(): Promise<Group[]> {
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

  @Mutation(() => Group)
  async createGroup(@Arg("data", () => GroupCreateInput) data: GroupCreateInput): Promise<Group> {
    try {
      const newGroup = new Group();
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

  @Mutation(() => Group, { nullable: true })
  async updateGroup(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => GroupUpdateInput) data: GroupUpdateInput
  ): Promise<Group | null> {
    try {
      const group = await Group.findOne({ where: { id: id } });
      if (group) {
        Object.assign(group, data);
        const errors = await validate(group);
        if (errors.length > 0) {
        } else {
          await group.save();
        }
      }
      return group;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

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
}
