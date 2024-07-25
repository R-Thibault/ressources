import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { IsEmail, Matches } from "class-validator";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { Member } from "./Member";
import { Message } from "./Message";
import { Ressource } from "./Ressource";
import { Image } from "./Image";
import { Link } from "./Link";
import { Group } from "./Group";
import { File } from "./File";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  hashed_password!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  lastname!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  firstname!: string;

  @OneToOne(() => Image, { onDelete: "SET NULL", nullable: true })
  @JoinColumn()
  @Field(() => Image, { nullable: true })
  avatar!: Image;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Field(() => String)
  email_validation_token!: string | null;

  @Column({ type: "timestamp", nullable: true })
  @Field(() => Int)
  email_validation_token_expires!: Date | null;

  @Column({ type: "boolean", default: false })
  @Field()
  is_account_validated!: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  @Field(() => String)
  reset_password_token!: string | null;

  @Column({ type: "timestamp", nullable: true })
  @Field(() => Int)
  reset_password_token_expires!: Date | null;

  @Column({ type: "timestamp" })
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @OneToMany(() => Member, (member) => member.user)
  @Field(() => [Member])
  members!: Member[];

  @OneToMany(() => Message, (message) => message.created_by_user)
  @Field(() => [Message])
  messages_creation!: Message[];

  @OneToMany(() => Message, (message) => message.updated_by_user)
  @Field(() => [Message])
  messages_update!: Message[];

  @OneToMany(() => Ressource, (ressource) => ressource.created_by_user)
  @Field(() => [Ressource])
  ressources_creation!: Ressource[];

  @OneToMany(() => Ressource, (ressource) => ressource.updated_by_user)
  @Field(() => [Ressource])
  ressources_update!: Ressource[];

  @OneToMany(() => Link, (link) => link.created_by_user)
  @Field(() => [Link])
  links_creation!: Link[];

  @OneToMany(() => Link, (link) => link.updated_by_user)
  @Field(() => [Link])
  links_update!: Link[];

  @OneToMany(() => Image, (image) => image.created_by_user)
  @Field(() => [Image])
  images_creation!: Image[];

  @OneToMany(() => Image, (image) => image.updated_by_user)
  @Field(() => [Image])
  images_update!: Image[];

  @OneToMany(() => Group, (group) => group.created_by_user)
  @Field(() => [Group])
  groups_creation!: Group[];

  @OneToMany(() => Group, (group) => group.updated_by_user)
  @Field(() => [Group])
  groups_update!: Group[];

  @OneToMany(() => File, (file) => file.created_by_user)
  @Field(() => [File])
  files_creation!: File[];

  @OneToMany(() => File, (file) => file.updated_by_user)
  @Field(() => [File])
  files_update!: File[];
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
  @Matches(/^.{8,50}$/)
  confirmPassword!: string;
  @Field({ nullable: true })
  lastname!: string;
  @Field({ nullable: true })
  firstname!: string;
  @Field()
  isTest!: boolean;
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
  @Field()
  isTest!: boolean;
}
