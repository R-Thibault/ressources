import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
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

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  title!: string;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  description!: string;

  @Column({ type: "boolean", default: 0 })
  @Field()
  is_favorite!: boolean;

  @OneToOne(() => Image)
  @JoinColumn()
  @Field()
  image_id!: Image;

  @Column({ type: "timestamp", nullable: true }) // to false for prod
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
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
  updated_by_user!: User;

  @OneToOne(() => File)
  @JoinColumn()
  @Field(() => File)
  file_id!: File;

  @OneToOne(() => Link)
  @JoinColumn()
  @Field(() => Link)
  link_id!: Link;

  @OneToMany(() => Group, (group) => group.ressources)
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
}

@InputType()
export class RessourceUpdateInput {
  @Field()
  title!: string;
}
