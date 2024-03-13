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

export class RessourceCreateInput {
  @Field()
  title!: string;
}

@InputType()
export class RessourceUpdateInput {
  @Field()
  title!: string;
}
