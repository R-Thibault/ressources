import { Field, ID, ObjectType, InputType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  url!: string;

  @Column({ type: "timestamp", nullable: true }) // to false for prod
  @Field()
  created_at!: Date;

  @BeforeInsert()
  updateDate() {
    this.created_at = new Date();
  }

  @ManyToOne(() => User, (user) => user.links_creation)
  @JoinColumn({ name: "created_by" })
  @Field(() => User)
  created_by_user!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: Date;

  @ManyToOne(() => User, (user) => user.links_update)
  @JoinColumn({ name: "updated_by" })
  @Field(() => User)
  updated_by_user!: User;
}
@InputType()
export class LinkCreateInput {
  @Field()
  url!: string;
}
