import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { ImageCreateInput, ImageUpdateInput, Image } from "../entities/Image";
import { validate } from "class-validator";
import { ContextType } from "../middlewares/auth";
import { User } from "../entities/User";

@Resolver(Image)
export class ImageResolver {

  @Authorized()
  @Query(() => [Image])
  async getAllImages(): Promise<Image[]> {
    return await Image.find();
  }

  @Authorized()
  @Query(() => Image)
  async getOneImage(@Arg("id", () => ID) id: number): Promise<Image | null> {
    try {
      const image = await Image.findOne({ where: { id: id } });
      return image;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
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

  @Authorized()
  @Mutation(() => Image, { nullable: true })
  async updateImage(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => ImageUpdateInput) data: ImageUpdateInput
  ): Promise<Image | null> {
    const image = await Image.findOne({ where: { id: id } });
    if (image) {
      Object.assign(image, data);
      const errors = await validate(image);
      if (errors.length > 0) {
        throw new Error(`error occured ${JSON.stringify(errors)}`);
      } else {
        await image.save();
      }
    }
    return image;
  }

  @Authorized()
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

  @Authorized()
  @Mutation(() => Image, { nullable: true })
  async deleteAvatar(
    @Arg("id", () => ID) id: number,
    @Ctx() context: ContextType
  ): Promise<Image | null> {
    try {
      if (!context.user) {
        throw new Error(`User not found.`);
      }
      const image = await Image.findOne({ where: { id: id } });
      if (!image) {
        throw new Error(`Image with ID ${id} not found.`);
      }
      const user = await User.findOne({
        where: { id: context.user.id },
        relations: { avatar: true },
      });
      if (!user) {
        throw new Error(`User not found.`);
      }
      if (user.avatar && user.avatar.id === image.id) {
        // Remove the avatar reference from the user
        user.avatar.remove();
      } else {
        throw new Error(`The user does not have the specified avatar.`);
      }
      return image;
    } catch (error) {
      throw new Error(`error occured here ${JSON.stringify(error)}`);
    }
  }
}
