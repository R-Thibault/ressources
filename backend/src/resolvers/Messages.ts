import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import {
  MessageCreateInput,
  Message,
  MessageUpdateInput,
} from "../entities/Message";
import { validate } from "class-validator";

@Resolver(Message)
export class MessageResolver {
  @Query(() => [Message])
  async getAllMessages(): Promise<Message[]> {
    return await Message.find();
  }

  @Query(() => Message)
  async getOneMessage(
    @Arg("id", () => ID) id: number
  ): Promise<Message | null> {
    try {
      const message = await Message.findOne({ where: { id: id } });
      return message;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Message)
  async createMessage(
    @Arg("data", () => MessageCreateInput) data: MessageCreateInput
  ): Promise<Message> {
    try {
      const newMessage = new Message();
      const error = await validate(newMessage);

      if (error.length > 0) {
        throw new Error(`error occured ${JSON.stringify(error)}`);
      } else {
        const datas = await newMessage.save();
        return datas;
      }
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Message, { nullable: true })
  async updateMessage(
    @Arg("id", () => ID) id: number,
    @Arg("data", () => MessageUpdateInput) data: MessageUpdateInput
  ): Promise<Message | null> {
    const message = await Message.findOne({ where: { id: id } });
    if (message) {
      Object.assign(message, data);
      const errors = await validate(message);
      if (errors.length > 0) {
        throw new Error(`error occured ${JSON.stringify(errors)}`);
      } else {
        await message.save();
      }
    }
    return message;
  }

  @Mutation(() => Message, { nullable: true })
  async deleteMessage(
    @Arg("id", () => ID) id: number
  ): Promise<Message | null> {
    try {
      const message = await Message.findOne({ where: { id: id } });
      if (message) {
        await message.remove();
        message.id = id;
      }
      return message;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
