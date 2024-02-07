import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Member } from "./Member";

@Entity()
@ObjectType()
export class Right extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  name!: string;

  @ManyToMany(() => Member, (members) => members.rights)
  @Field(() => [Member])
  members!: Member[];
}

@InputType()
export class RightCreateInput {

}

@InputType()
export class RightUpdateInput {

}
