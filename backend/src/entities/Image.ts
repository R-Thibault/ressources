import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  path!: string;

  @Column({ type: "timestamp", nullable: true }) // to false for prod
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @ManyToOne(() => User, (user) => user.images_creation)
  @JoinColumn({ name: "created_by" })
  @Field(() => User)
  created_by_user!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.images_update)
  @JoinColumn({ name: "updated_by" })
  @Field(() => User, { nullable: true })
  updated_by_user!: User;
}

@InputType()
export class ImageCreateInput {
  @Field()
  name!: string;
  @Field()
  path!: string;
}

@InputType()
export class ImageUpdateInput {
  @Field()
  name!: string;
  @Field()
  path!: string;
}
