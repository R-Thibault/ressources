require("dotenv").config();
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  BeforeInsert,
  Timestamp,
  JoinTable,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { IsEmail, Matches } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Tag } from "./Tag";
import { Member } from "./Member";
import { Message } from "./Message";
import { Ressource } from "./Ressource";
import { Image } from "./Image";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  @Field()
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  hashed_password!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  lastname!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  firstname!: string;

  @OneToOne(() => Image)
  @JoinColumn()
  @Field()
  image_id!: Image;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  email_validation_token!: string;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  email_validation_token_expires!: number;

  @Column({ type: "boolean", nullable: false })
  @Field()
  is_account_validated!: boolean;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: number;

  @BeforeInsert()
  updateDate() {
    this.created_at = Date.now();
  }

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: number;

  @OneToMany(() => Tag, (tags) => tags.created_by)
  @Field(() => [Tag])
  tags!: Tag[];

  @OneToMany(() => Member, (members) => members.created_by)
  @Field(() => [Member])
  members!: Member[];

  @OneToMany(() => Message, (messages) => messages.created_by)
  @Field(() => [Message])
  messages!: Message[];

  @ManyToMany(() => Ressource, (ressource) => ressource.user)
  @JoinTable()
  @Field(() => [Ressource])
  ressource!: Ressource[];
}

@InputType()
export class UserCreateInput {
  @Field()
  @IsEmail()
  email!: string;
  @Field()
  @Matches(/^.{8,50}$/)
  password!: string;
  @Field()
  lastname!: string;
  @Field()
  firstname!: string;
}

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  lastname!: string;
  @Field({ nullable: true })
  firstname!: string;
}
