// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Ctx,
  ID,
  Authorized,
} from "type-graphql";
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
import { validate } from "class-validator";
import { randomBytes } from "crypto";
import {
  sendResetPasswordEmail,
  sendValidationEmail,
} from "../utils/sendemail";
import { checkEmail, checkPasswords } from "../utils/checkInput";

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await User.find({});
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async getOneUser(@Arg("id", () => ID) id: number): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: { id: id },
        relations: { avatar: true },
      });
      return user;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Authorized()
  @Mutation(() => User, { nullable: true })
  async updateUser(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => UserUpdateInput) data: UserUpdateInput
  ): Promise<User | null> {
    const user = await User.findOne({ where: { id: id } });
    if (user) {
      Object.assign(user, data);
      const errors = await validate(user);
      if (errors.length > 0) {
        throw new Error(`error occured ${JSON.stringify(errors)}`);
      } else {
        await user.save();
      }
    }
    return user;
  }

  @Authorized()
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

    const validPassword = checkPasswords(data.password, data.confirmPassword);
    const validEmail = checkEmail(data.email);

    if (!validPassword.result) {
      throw new Error(validPassword.errorMessage);
    }

    if (!validEmail) {
      throw new Error("Merci de renseigner un email valide!");
    }

    const newUser = new User();
    newUser.email = data.email;
    newUser.hashed_password = await argon2.hash(data.password);
    newUser.lastname = data.lastname;
    newUser.firstname = data.firstname;
    const token = randomBytes(48).toString("hex");
    newUser.email_validation_token = token; // génération de token
    newUser.email_validation_token_expires = new Date(Date.now() + 3600000); // Expiration dans 1 heure
    await newUser.save();
    if (!data.isTest) {
      await sendValidationEmail(newUser.email, newUser.email_validation_token); //envoi du mail avec token validation
    }
    return newUser;
  }

  @Mutation(() => Boolean)
  async validateAccount(@Arg("token") token: string): Promise<boolean> {
    const user = await User.findOneBy({ email_validation_token: token });
    if (!user) {
      throw new Error("User not found");
    }
    const tokenExpired = user.email_validation_token_expires
      ? Date.now() > user.email_validation_token_expires.getTime()
      : true;

    if (tokenExpired) {
      throw new Error("Token expired");
    } else {
      user.is_account_validated = true;
      user.email_validation_token = null;
      user.email_validation_token_expires = null;
      await user.save();
      return true;
    }
  }

  @Mutation(() => Boolean)
  async resendValidationEmail(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // Générer un nouveau token de validation
    const token = randomBytes(48).toString("hex");
    user.email_validation_token = token;
    user.email_validation_token_expires = new Date(Date.now() + 3600000); // Expiration dans 1 heure
    await user.save();
    // Appeler la fonction d'envoi d'email
    await sendValidationEmail(user.email, user.email_validation_token);
    return true;
  }

  @Mutation(() => Boolean)
  async requestPasswordReset(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOneBy({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const validEmail = checkEmail(email);

    if (!validEmail) {
      throw new Error("Merci de renseigner un email valide!");
    }
    const token = randomBytes(48).toString("hex");
    user.reset_password_token = token;
    user.reset_password_token_expires = new Date(Date.now() + 3600000); // Expiration dans 1 heure
    await user.save();
    // Appeler la fonction d'envoi d'email pour la réinitialisation du mot de passe
    await sendResetPasswordEmail(user.email, user.reset_password_token);
    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Arg("confirmNewPassword") confirmNewPassword: string
  ): Promise<boolean> {
    const user = await User.findOneBy({ reset_password_token: token });
    if (!user) {
      throw new Error("User not found");
    }
    const tokenExpired = user.reset_password_token_expires
      ? Date.now() > user.reset_password_token_expires.getTime()
      : true;

    if (tokenExpired) {
      throw new Error("Token expired");
    } else {
      const validPassword = checkPasswords(newPassword, confirmNewPassword);

      if (!validPassword.result) {
        throw new Error(validPassword.errorMessage);
      }

      // Mettre à jour le mot de passe de l'utilisateur
      user.hashed_password = await argon2.hash(newPassword);
      user.reset_password_token = null;
      user.reset_password_token_expires = null;
      await user.save();
      return true;
    }
  }

  @Mutation(() => User, { nullable: false })
  async signIn(
    @Ctx() context: ContextType,
    @Arg("data", () => UserSignInInput) data: UserSignInInput
  ): Promise<User> {
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      if (await argon2.verify(existingUser.hashed_password, data.password)) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            id: existingUser.id,
          },
          `${process.env.JWT_SECRET_KEY}`
        );

        const cookies = new Cookies(context.req, context.res);
        cookies.set("token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });

        if (existingUser.is_account_validated || data.isTest) {
          return existingUser;
        } else {
          throw new Error("account not validated");
        }
      } else {
        throw new Error("user and password dont match");
      }
    } else {
      throw new Error("user not found");
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async signOut(@Ctx() context: ContextType): Promise<boolean> {
    const cookies = new Cookies(context.req, context.res);
    cookies.set("token", "", {
      httpOnly: true,
      secure: false,
      maxAge: 0,
    });

    return true;
  }

  @Authorized()
  @Query(() => User, { nullable: true })
  async myProfile(@Ctx() context: ContextType): Promise<User | null> {
    const user = await getUser(context.req, context.res);
    return user;
  }
}
