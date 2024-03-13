import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Member } from "./Member";
import { Message } from "./Message";

@Entity()
@ObjectType()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  name!: string;

  @Column({ type: "text" })
  @Field()
  description!: string;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  token!: string;

  @Column({ type: "timestamp", nullable: true }) // to false for prod
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @ManyToOne(() => User)
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

  @OneToMany(() => Member, (members) => members.group)
  @Field(() => [Member])
  members!: Member[];

  @OneToMany(() => Message, (messages) => messages.group)
  @Field(() => [Message])
  messages!: Message[];
}

@InputType()
export class GroupCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class GroupUpdateInput {
  @Field()
  name!: string;
}
