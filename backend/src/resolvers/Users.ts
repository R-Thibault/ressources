require("dotenv").config();
import { Resolver, Query, Arg, Mutation, Ctx, ID } from "type-graphql";
import {
  User,
  UserCreateInput,
  UserUpdateInput,
  UserSignInInput,
} from "../entities/User";
import { validateDatas } from "../utils/validate";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import Cookies from "cookies";
import { ContextType, getUser } from "../middlewares/auth";
import { DummyUser } from "../dummyDatas";
import { validate } from "class-validator";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await User.find({});
  }

  @Query(() => User, { nullable: true })
  async getOneUser(@Arg("id", () => ID) id: number): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { id: id } });
      return user;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => UserUpdateInput) data: UserUpdateInput
  ): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (user) {
        Object.assign(user, data);
        const errors = await validate(user);
        if (errors.length > 0) {
        } else {
          await user.save();
        }
      }
      return user;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Arg("id", () => ID) id: number): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { id: id } });
      if (user) {
        await user.remove();
        user.id = id;
      }
      return user;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => User)
  async signUp(
    @Arg("data", () => UserCreateInput) data: UserCreateInput
  ): Promise<User | null> {
    const error = await validateDatas(data);
    if (error.length > 0) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error(`User already exists`);
    }
    const newUser = new User();
    newUser.email = data.email;
    newUser.hashed_password = await argon2.hash(data.password);
    newUser.lastname = data.lastname;
    newUser.firstname = data.firstname;
    await newUser.save();
    return newUser;
  }

  @Mutation(() => User, { nullable: true })
  async signIn(
    @Ctx() context: ContextType,
    @Arg("data", () => UserSignInInput) data: UserSignInInput
  ): Promise<User | null> {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      if (await argon2.verify(existingUser.hashed_password, data.password)) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
            id: existingUser.id,
          },
          `${process.env.JWT_SECRET_KEY}`
        );

        const cookies = new Cookies(context.req, context.res);
        cookies.set("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });

        return existingUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  @Mutation(() => User, { nullable: true })
  async signOut(@Ctx() context: ContextType): Promise<User | null> {
    const cookies = new Cookies(context.req, context.res);
    cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0,
    });

    return null;
  }

  @Query(() => User, { nullable: true })
  async myProfile(@Ctx() context: ContextType): Promise<User | null> {
    const user = await getUser(context.req, context.res);
    return user;
  }

  // @Mutation(() => User)
  // async populateUserTable(): Promise<User | null> {
  //   const error = await validateDatas(DummyUser);
  //   if (error.length > 0) {
  //     throw new Error(`error occured ${JSON.stringify(error)}`);
  //   }
  //   const existingUser = await User.findOneBy({ email: DummyUser.email });
  //   if (existingUser) {
  //     throw new Error(`User already exists`);
  //   }
  //   const newUser = new User();
  //   newUser.email = DummyUser.email;
  //   newUser.hashed_password = await argon2.hash(DummyUser.password);
  //   await newUser.save();
  //   return newUser;
  // }
}
