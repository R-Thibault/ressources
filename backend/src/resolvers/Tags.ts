import { Resolver, Query, Arg, Mutation, Authorized } from "type-graphql";
import { Tag, TagCreateInput, TagUpdateInput } from "../entities/Tag";
import { validateDatas } from "../utils/validate";
import { DummyTag } from "../dummyDatas";
import { validate } from "class-validator";

@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    return await Tag.find({});
  }

  @Query(() => Tag)
  async getOneTag(@Arg("id") id: number): Promise<Tag | null> {
    try {
      const datas = await Tag.findOne({
        where: {
          id: id,
        },
      });
      return datas;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Tag)
  async createTag(@Arg("data", () => TagCreateInput) data: TagCreateInput): Promise<Tag> {
    try {
      const newTag = new Tag();
      const error = await validate(newTag);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newTag.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  // @Mutation(() => [Tag])
  // async populateTagTable(): Promise<Tag[] | null> {
  //   for (let i = 0; i < DummyTag.length; i++) {
  //     try {
  //       const newTag = new Tag();
  //       newTag.name = DummyTag[i].name;

  //       const error = await validateDatas(newTag);

  //       if (error.length > 0) {
  //         throw new Error(`error occured ${JSON.stringify(error)}`);
  //       } else {
  //         const datas = await newTag.save();
  //       }
  //     } catch (error) {
  //       throw new Error(`error occured ${JSON.stringify(error)}`);
  //     }
  //   }
  //   return await this.getAllTags();
  // }

  @Mutation(() => Tag)
  async deleteTag(
    @Arg("id")
    id: number
  ): Promise<Tag | undefined> {
    try {
      const tag = await Tag.findOne({
        where: {
          id: id,
        },
      });
      const datas = await tag?.remove();
      return datas;
    } catch (error) {
      console.log(error);
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Tag)
  async updateTag(
    @Arg("id")
    id: number,
    @Arg("data", () => TagUpdateInput) data: TagUpdateInput
  ): Promise<Tag | null> {
    try {
      const tag = await Tag.findOne({
        where: {
          id: id,
        },
      });

      if (tag) {
        Object.assign(tag, data, { id: id });
        const error = await validateDatas(tag);
        if (error.length > 0) {
          throw new Error(`error occured ${JSON.stringify(error)}`);
        } else {
          const datas = await Tag.save(tag);
          return datas;
        }
      } else {
        throw new Error(`no ad found`);
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
