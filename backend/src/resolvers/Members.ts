import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { MemberInput, Member } from "../entities/Member";
import { validateDatas } from "../utils/validate";
import { validate } from "class-validator";

@Resolver(Member)
export class MemberResolver {
  @Query(() => [Member])
  async getAllMember(): Promise<Member[]> {
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
    @Arg("data", () => MemberInput) data: MemberInput
  ): Promise<Member> {
    try {
      const newMember = new Member();
      newMember.user = data.user;
      newMember.group = data.group;
      newMember.rights = data.rights;
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
    @Arg("data", () => MemberInput) data: MemberInput
  ): Promise<Member | null> {
    try {
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
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
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
}
