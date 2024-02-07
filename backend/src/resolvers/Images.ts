import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { ImageCreateInput, ImageUpdateInput, Image } from "../entities/Image";
import { validateDatas } from "../utils/validate";
import { validate } from "class-validator";

@Resolver(Image)
export class ImageResolver {
  @Query(() => [Image])
  async getAllImage(): Promise<Image[]> {
    return await Image.find();
  }

  @Query(() => Image)
  async getOneImage(@Arg("id", () => ID) id: number): Promise<Image | null> {
    try {
      const image = await Image.findOne({ where: { id: id } });
      return image;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Image)
  async createImage(
    @Arg("data", () => ImageCreateInput) data: ImageCreateInput
  ): Promise<Image> {
    try {
      const newImage = new Image();
      newImage.name = data.name;
      newImage.path = data.path;

      const error = await validate(newImage);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newImage.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Image, { nullable: true })
  async updateImage(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => ImageUpdateInput) data: ImageUpdateInput
  ): Promise<Image | null> {
    try {
      const image = await Image.findOne({ where: { id: id } });
      if (image) {
        Object.assign(image, data);
        const errors = await validate(image);
        if (errors.length > 0) {
        } else {
          await image.save();
        }
      }
      return image;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Image, { nullable: true })
  async deleteImage(@Arg("id", () => ID) id: number): Promise<Image | null> {
    try {
      const image = await Image.findOne({ where: { id: id } });
      if (image) {
        await image.remove();
        image.id = id;
      }
      return image;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
