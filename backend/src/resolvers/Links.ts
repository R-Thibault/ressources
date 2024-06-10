import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { LinkCreateInput, Link } from "../entities/Link";
import { validate } from "class-validator";
import { ContextType } from "../middlewares/auth";

@Resolver(Link)
export class LinkResolver {
  @Query(() => [Link])
  async getAllLinks(): Promise<Link[]> {
    return await Link.find();
  }

  @Query(() => Link)
  async getOneLink(@Arg("id", () => ID) id: number): Promise<Link | null> {
    try {
      const link = await Link.findOne({ where: { id: id } });
      return link;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => Link)
  async createLink(
    @Arg("data", () => LinkCreateInput) data: LinkCreateInput,
    @Ctx() context: ContextType
  ): Promise<Link> {
    try {
      const newLink = new Link();
      newLink.url = data.url;

      if (context.user) {
        newLink.created_by_user = context.user;
      }

      const error = await validate(newLink);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newLink.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  // @Mutation(() => Link, { nullable: true })
  // async updateLink(
  //   @Arg("id", () => ID) id: number,
  //   @Arg("data", () => LinkUpdateInput) data: LinkUpdateInput
  // ): Promise<Link | null> {
  //   const link = await Link.findOne({ where: { id: id } });
  //   if (link) {
  //     Object.assign(link, data);
  //     const errors = await validate(link);
  //     if (errors.length > 0) {
  //     } else {
  //       await link.save();
  //     }
  //   }
  //   return link;
  // }

  @Mutation(() => Link, { nullable: true })
  async deleteLink(@Arg("id", () => ID) id: number): Promise<Link | null> {
    try {
      const link = await Link.findOne({ where: { id: id } });
      if (link) {
        await link.remove();
        link.id = id;
      }
      return link;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
