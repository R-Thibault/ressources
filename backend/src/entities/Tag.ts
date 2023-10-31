import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  @MinLength(1, { message: "titre trop court" })
  @MaxLength(100, { message: "titre trop long" })
  title!: string;

  @ManyToMany(() => Ad, (ads) => ads.tags)
  @Field(() => [Ad])
  ads!: Ad[];
}

@InputType()
export class InputTag {
  @Field()
  title!: string;
}
