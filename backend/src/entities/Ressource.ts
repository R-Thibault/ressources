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
} from "typeorm";
import { User } from "./User";
import { Link } from "./Link";
import { File } from "./File";
import { Image } from "./Image";
@Entity()
@ObjectType()
export class Ressource extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  @Field()
  title!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  @Field()
  type!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  description!: string;

  @Column({ type: "boolean", default: 0 })
  @Field()
  is_favorite!: string;

  @OneToOne(() => Image)
  @JoinColumn()
  @Field()
  image_id!: Image;

  @Column({ type: "timestamp", nullable: false })
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

  @OneToOne(() => File)
  @JoinColumn()
  @Field()
  file_id!: File;

  @OneToOne(() => Link)
  @JoinColumn()
  @Field()
  link_id!: Link;

  @ManyToMany(() => User, (user) => user.ressource)
  @JoinTable()
  @Field(() => [User])
  user!: User[];
}

@InputType()
export class RessourceCreateInput {}

@InputType()
export class RessourceUpdateInput {}
