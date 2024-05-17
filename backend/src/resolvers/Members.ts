import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import {
  MemberCreateInput,
  Member,
  MemberUpdateInput,
} from "../entities/Member";
import { validateDatas } from "../utils/validate";
import { validate } from "class-validator";
import { DummyMembers } from "../dummyDatas";

@Resolver(Member)
export class MemberResolver {
  @Query(() => [Member])
  async getAllMembers(): Promise<Member[]> {
    return await Member.find();
  }

  @Query(() => Member)
  async getOneMember(@Arg("id", () => ID) id: number): Promise<Member | null> {
    try {
      const member = await Member.findOne({ where: { id: id } });
      return member;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

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
      } else {
        await member.save();
      }
    }
    return member;
  }

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

  @Mutation(() => [Member])
  async populateMemberTable(): Promise<Member[] | null> {
    for (let i = 0; i < DummyMembers.length; i++) {
      try {
        const newMember = new Member();
        newMember.group = DummyMembers[i].group_id;
        newMember.last_visit = DummyMembers[i].last_visit;
        newMember.user = DummyMembers[i].user;
        newMember.created_at = DummyMembers[i].created_at;

        const error = await validate(newMember);

        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          const datas = await newMember.save();
        }
      } catch (error) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      }
    }
    return await this.getAllMembers();
  }
}
