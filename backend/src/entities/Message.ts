import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Group } from "./Group";

@Entity()
@ObjectType()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  // @ManyToOne(() => User, (users) => users.messages)
  // @Field(() => [User])
  // user!: User;

  @ManyToOne(() => Group, (group) => group.messages)
  @Field(() => Group)
  group!: Group;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: number;

  @BeforeInsert()
  updateDate() {
    this.created_at = Date.now();
  }

  @ManyToOne(() => User, (users) => users.messages)
  @JoinColumn()
  @Field(() => User)
  created_by!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: number;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  updated_by!: User;
}
@InputType()
export class MessageCreateInput {

}

@InputType()
export class MessageUpdateInput {

}
