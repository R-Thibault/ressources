import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Group } from "./Group";

@Entity()
@ObjectType()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "timestamp" })
  @Field()
  last_visit!: Date;

  @Column({ type: "timestamp" })
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @ManyToOne(() => Group, (group) => group.members, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  @Field(() => Group)
  group!: Group;

  @ManyToOne(() => User, (user) => user.members)
  @JoinColumn()
  @Field(() => User)
  user!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;
}

@InputType()
export class MemberCreateInput {
  @Field({ nullable: true })
  last_visit!: Date;
}

@InputType()
export class MemberUpdateInput {
  @Field({ nullable: true })
  last_visit!: Date;
}

@InputType()
export class MemberLeavingGroupInput {
  @Field(() => ID)
  group_id!: number;
}
