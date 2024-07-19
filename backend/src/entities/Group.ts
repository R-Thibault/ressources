import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Member } from "./Member";
import { Message } from "./Message";
import { v4 as uuidv4 } from "uuid";
import { Ressource } from "./Ressource";

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

  @BeforeInsert()
  generateToken() {
    this.token! = uuidv4();
  }

  @Column({ type: "timestamp", nullable: true }) // to false for prod
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @ManyToOne(() => User, (user) => user.groups_creation)
  @JoinColumn({ name: "created_by" })
  @Field(() => User, { nullable: true })
  created_by_user!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.groups_update)
  @JoinColumn({ name: "updated_by" })
  @Field(() => User)
  updated_by_user!: User;

  @OneToMany(() => Member, (members) => members.group)
  @Field(() => [Member])
  members!: Member[];

  @OneToMany(() => Message, (messages) => messages.group)
  @Field(() => [Message])
  messages!: Message[];

  @OneToMany(() => Ressource, (ressources) => ressources.group_id)
  @Field(() => [Ressource])
  ressources!: Ressource[];
}

@InputType()
export class GroupInput {
  @Field()
  name!: string;
  @Field()
  description!: string;
}

@ObjectType()
export class GroupsMembers {
  @Field(() => ID)
  id!: number;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  token!: string;

  @Field()
  created_at!: Date;

  @Field(() => User, { nullable: true })
  created_by_user?: User;

  @Field({ nullable: true })
  updated_at!: Date;

  @Field(() => User)
  updated_by_user!: User;
}

@InputType()
export class DeleteGroupInput {
  @Field(() => ID)
  group_id!: number;
}
