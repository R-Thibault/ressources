require('dotenv').config()
import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import { User, InputUser } from "../entities/User";
import { validateDatas } from "../utils/validate";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import Cookies from "cookies";
import { ContextType } from "../middlewares/auth";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await User.find({});
  }

  @Mutation(() => User)
  async signUp(
    @Arg("data", () => InputUser) data: InputUser
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
    newUser.hashPassword = await argon2.hash(data.password);
    await newUser.save();
    return newUser;
  }

  @Mutation(() => User, { nullable: true })
  async signIn(
    @Ctx() context: ContextType,
    @Arg("data", () => InputUser) data: InputUser
  ): Promise<User | null> {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      if (await argon2.verify(existingUser.hashPassword, data.password)) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
            id: existingUser.id,
          },
          `${process.env.JWT_SECRET_KEY}`
        );

        const cookies = new Cookies(context.req, context.res);
        cookies.set("token", token, {
          httpOnly: false,
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

  @Authorized()
  @Query(() => User)
  async myProfile(@Ctx() context: ContextType): Promise<User | null> {
    if (context.user) {
      return context.user;
    }
    return null;
  }
}
