require("dotenv").config();
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
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Tag } from "./Tag";
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
  email_validation_token_expires!: number;

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

  @OneToMany(() => Tag, (tag) => tag.created_by_user)
  @Field(() => [Tag])
  tags_creation!: Tag[];

  @OneToMany(() => Tag, (tag) => tag.updated_by_user)
  @Field(() => [Tag])
  tags_update!: Tag[];

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

@InputType()
export class UserSignInInput {
  @Field()
  email!: string;
  @Field()
  password!: string;
}
