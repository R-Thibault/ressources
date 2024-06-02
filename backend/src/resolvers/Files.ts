import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { File, FileCreateInput, FileUpdateInput } from "../entities/File";
import { validate } from "class-validator";

@Resolver(File)
export class FileResolver {
  @Query(() => [File])
  async getAllFiles(): Promise<File[]> {
    return await File.find();
  }

  @Query(() => File)
  async getOneFile(@Arg("id", () => ID) id: number): Promise<File | null> {
    try {
      const file = await File.findOne({ where: { id: id } });
      return file;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => File)
  async createFile(
    @Arg("data", () => FileCreateInput) data: FileCreateInput
  ): Promise<File> {
    try {
      const newFile = new File();
      newFile.name = data.name;
      const error = await validate(newFile);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newFile.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => File, { nullable: true })
  async updateFile(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => FileUpdateInput) data: FileUpdateInput
  ): Promise<File | null> {
    const file = await File.findOne({ where: { id: id } });
    if (file) {
      Object.assign(file, data);
      const errors = await validate(file);
      if (errors.length > 0) {
        throw new Error(`error occured ${JSON.stringify(errors)}`);
      } else {
        await file.save();
      }
    }
    return file;
  }

  @Mutation(() => File, { nullable: true })
  async deleteFile(@Arg("id", () => ID) id: number): Promise<File | null> {
    try {
      const file = await File.findOne({ where: { id: id } });
      if (file) {
        await file.remove();
        file.id = id;
      }
      return file;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
