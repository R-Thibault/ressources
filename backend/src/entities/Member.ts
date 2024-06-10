import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Group } from "./Group";
import { Right } from "./Right";

@Entity()
@ObjectType()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "timestamp" })
  @Field()
  last_visit!: Date;

  @ManyToMany(() => Right, (rights) => rights.members)
  @Field(() => [Right])
  rights!: Right[];

  @Column({ type: "timestamp", nullable: true })
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @ManyToOne(() => Group, (group) => group.members)
  @JoinColumn({ name: "group_id" })
  @Field(() => Group)
  group!: Group | null;

  @ManyToOne(() => User, (user) => user.members)
  @JoinColumn({ name: "user_id" })
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
