import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
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

  @ManyToOne(() => Group, (group) => group.members)
  @Field(() => Group)
  group!: Group;

  @Column({ type: "timestamp" })
  @Field()
  last_visit!: Date;

  @ManyToMany(() => Right, (rights) => rights.members)
  @Field(() => [Right])
  rights!: Right[];

  @Column({ type: "timestamp", nullable: true }) // to false for prod
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @ManyToOne(() => User, (users) => users.messages)
  @JoinColumn()
  @Field(() => User)
  created_by!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  updated_by!: User;
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
