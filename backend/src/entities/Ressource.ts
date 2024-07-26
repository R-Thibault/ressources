import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Link } from "./Link";
import { File } from "./File";
import { Image } from "./Image";
import { Group } from "./Group";
@Entity()
@ObjectType()
export class Ressource extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  title!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  description!: string;

  @Column({ type: "boolean", default: 0 })
  @Field()
  is_favorite!: boolean;

  @OneToOne(() => Image, { onDelete: "CASCADE" })
  @JoinColumn()
  @Field(() => Image, { nullable: true })
  image_id!: Image | null;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    if (!this.created_at) {
      this.created_at = new Date();
    }
  }

  @ManyToOne(() => User, (user) => user.ressources_creation)
  @JoinColumn({ name: "created_by" })
  @Field(() => User)
  created_by_user!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.ressources_update)
  @JoinColumn({ name: "updated_by" })
  @Field(() => User)
  updated_by_user!: User | undefined;

  @OneToOne(() => File, { onDelete: "CASCADE" })
  @JoinColumn()
  @Field(() => File, { nullable: true })
  file_id!: File;

  @OneToOne(() => Link, { onDelete: "CASCADE" })
  @JoinColumn()
  @Field(() => Link, { nullable: true })
  link_id!: Link;

  @ManyToOne(() => Group, (group) => group.ressources, {
    onDelete: "SET NULL",
  })
  @Field(() => Group, { nullable: true })
  group_id!: Group;
}

@InputType()
export class RessourceCreateInput {
  @Field()
  title!: string;
  @Field()
  description!: string;
  @Field({ nullable: true })
  entityId!: number;
  @Field({ nullable: true }) // enlever nullable:true
  type!: string;
  @Field({ nullable: true })
  groupId!: number;
  @Field({ nullable: true })
  imageId!: number;
}

@InputType()
export class RessourceUpdateInput {
  @Field()
  title!: string;
  @Field()
  description!: string;
  @Field({ nullable: true })
  imageId!: number;
}

@InputType()
export class RessourcesWhereInput {
  @Field(() => ID, { nullable: true })
  created_by_user!: number;
  @Field({ nullable: true })
  title!: string;
}

@InputType()
export class RessourcesWhereGroupInput {
  @Field(() => ID)
  group_id!: number;
  @Field({ nullable: true })
  title?: string;
}
@InputType()
export class RessourcesOrderByInput {
  @Field({ nullable: true })
  created_at?: "ASC" | "DESC";
  @Field({ nullable: true })
  title?: "ASC" | "DESC";
}
