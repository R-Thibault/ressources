import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Member, MemberLeavingGroupInput } from "../entities/Member";
import { sendGroupInvitation } from "../utils/sendemail";
import { User } from "../entities/User";
import { ContextType, getUser } from "../middlewares/auth";
import { Group } from "../entities/Group";

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
  @Mutation(() => Boolean)
  async inviteGroupMembers(
    @Arg("groupId", () => ID) groupId: number,
    @Arg("email") email: string
  ): Promise<boolean> {
    try {
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        throw new Error(`No user found with email: ${email}`);
        // au lieu de throw une erreur, genérer un mail d'invitation, mais retourner la page d'inscsription + l'id du groupe
      }
      const newMember = new Member();
      newMember.user = user;
      //newMember.group = await Group.findOne({ where: { id: groupId } });
      const group = await Group.findOne({ where: { id: groupId } });
      if (group) {
        newMember.group = group;
      } else {
        throw new Error("Group not Found!");
      }
      newMember.last_visit = new Date();

      await newMember.save();

      await sendGroupInvitation(email, String(groupId));
      return true;
    } catch (error) {
      throw new Error(`Failed to send group invitation`);
    }
  }

  @Authorized()
  @Mutation(() => Member, { nullable: true })
  async deleteMember(
    @Ctx() context: ContextType,
    @Arg("data", () => MemberLeavingGroupInput)
    whereMember: MemberLeavingGroupInput
  ): Promise<Member> {
    const user = await getUser(context.req, context.res);
    if (user) {
      const group = await Group.findOne({
        where: { id: whereMember.group_id },
        relations: { created_by_user: true },
      });

      if (group && group.created_by_user.id === user.id) {
        throw new Error(`Vous êtes le créateur du groupe, action non autorisé`);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const queryWhereMember: any = {
        user: { id: user.id },
      };

      if (whereMember?.group_id) {
        queryWhereMember.group = { id: whereMember.group_id };
      }

      const member = await Member.findOne({
        where: queryWhereMember,
        relations: { user: true, group: true },
      });
      if (!member) {
        throw new Error(`No member found `);
      }
      const id = member.id;
      await member.remove();
      member.id = id;
      return member;
    } else {
      throw new Error(`No user found `);
    }
  }
}
