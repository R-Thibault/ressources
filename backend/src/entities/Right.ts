import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Member } from "./Member";

@Entity()
@ObjectType()
export class Right extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: true }) // to false for prod
  @Field()
  name!: string;

  @ManyToMany(() => Member, (members) => members.rights)
  @Field(() => [Member])
  members!: Member[];
}

@InputType()
export class RightCreateInput {
  @Field()
  name!: string;
}

@InputType()
export class RightUpdateInput {
  @Field()
  name!: string;
}
