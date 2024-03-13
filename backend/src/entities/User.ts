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
import { Group } from "./Group";
import { File } from "./File";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true }) // to false for prod
  @Field()
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  hashed_password!: string;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  lastname!: string;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  firstname!: string;

  @OneToOne(() => Image)
  @JoinColumn()
  @Field()
  image_id!: Image;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Field()
  email_validation_token!: string;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  email_validation_token_expires!: Date;

  @Column({ type: "boolean", default: false })
  @Field()
  is_account_validated!: boolean;

  @Column({ type: "timestamp", nullable: true }) // to false for prod
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @OneToMany(() => Group, (groups) => groups.created_by_user)
  @Field(() => [Group])
  groups!: Group[];

  @OneToMany(() => Tag, (tags) => tags.created_by)
  @Field(() => [Tag])
  tags!: Tag[];

  @OneToMany(() => File, (files) => files.created_by_user)
  @Field(() => [File])
  files!: File[];

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
  @Field({nullable: true})
  lastname!: string;
  @Field({nullable: true})
  firstname!: string;
}

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  lastname!: string;
  @Field({ nullable: true })
  firstname!: string;
}

@InputType()
export class UserSignInInput {
  @Field()
  email!: string;
  @Field()
  password!: string;
}