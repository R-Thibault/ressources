import { Arg, Authorized, ID, Mutation, Query, Resolver } from "type-graphql";
import {
  MemberCreateInput,
  Member,
  MemberUpdateInput,
} from "../entities/Member";
import { validate } from "class-validator";

@Resolver(Member)
export class MemberResolver {
  @Authorized()
  @Query(() => [Member])
  async getAllMembers(): Promise<Member[]> {
    return await Member.find();
  }

  @Authorized()
  @Query(() => Member)
  async getOneMember(@Arg("id", () => ID) id: number): Promise<Member | null> {
    try {
      const member = await Member.findOne({ where: { id: id } });
      return member;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Member)
  async createMember(
    @Arg("data", () => MemberCreateInput) data: MemberCreateInput
  ): Promise<Member> {
    try {
      const newMember = new Member();
      const error = await validate(newMember);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newMember.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Member, { nullable: true })
  async updateMember(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => MemberUpdateInput) data: MemberUpdateInput
  ): Promise<Member | null> {
    const member = await Member.findOne({ where: { id: id } });
    if (member) {
      Object.assign(member, data);
      const errors = await validate(member);
      if (errors.length > 0) {
        throw new Error(`error occured `);
      } else {
        await member.save();
      }
    }
    return member;
  }

  @Authorized()
  @Mutation(() => Member, { nullable: true })
  async deleteMember(@Arg("id", () => ID) id: number): Promise<Member | null> {
    try {
      const member = await Member.findOne({ where: { id: id } });
      if (member) {
        await member.remove();
        member.id = id;
      }
      return member;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
