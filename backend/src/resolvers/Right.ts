import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Right, RightUpdateInput, RightCreateInput } from "../entities/Right";
import { validate } from "class-validator";

@Resolver(Right)
export class RightResolver {
  @Query(() => [Right])
  async getAllRight(): Promise<Right[]> {
    return await Right.find();
  }

  @Query(() => Right)
  async getOneRight(@Arg("id", () => ID) id: number): Promise<Right | null> {
    try {
      const right = await Right.findOne({ where: { id: id } });
      return right;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Right)
  async createRight(@Arg("data", () => RightCreateInput) data: RightCreateInput): Promise<Right> {
    try {
      const newRight = new Right();
      const error = await validate(newRight);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newRight.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Right, { nullable: true })
  async updateRight(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => RightUpdateInput) data: RightUpdateInput
  ): Promise<Right | null> {
    try {
      const right = await Right.findOne({ where: { id: id } });
      if (right) {
        Object.assign(right, data);
        const errors = await validate(right);
        if (errors.length > 0) {
        } else {
          await right.save();
        }
      }
      return right;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Right, { nullable: true })
  async deleteRight(@Arg("id", () => ID) id: number): Promise<Right | null> {
    try {
      const right = await Right.findOne({ where: { id: id } });
      if (right) {
        await right.remove();
        right.id = id;
      }
      return right;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
