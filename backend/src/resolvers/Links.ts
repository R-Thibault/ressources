import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { LinkCreateInput, Link, LinkUpdateInput } from "../entities/Link";
import { validate } from "class-validator";

@Resolver(Link)
export class LinkResolver {
  @Query(() => [Link])
  async getAllLink(): Promise<Link[]> {
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

  @Mutation(() => Link)
  async createLink(
    @Arg("data", () => LinkCreateInput) data: LinkCreateInput
  ): Promise<Link> {
    try {
      const newLink = new Link();
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

  @Mutation(() => Link, { nullable: true })
  async updateLink(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => LinkUpdateInput) data: LinkUpdateInput
  ): Promise<Link | null> {
    try {
      const link = await Link.findOne({ where: { id: id } });
      if (link) {
        Object.assign(link, data);
        const errors = await validate(link);
        if (errors.length > 0) {
        } else {
          await link.save();
        }
      }
      return link;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

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
