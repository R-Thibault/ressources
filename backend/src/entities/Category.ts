import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Field()
  @MinLength(1, { message: "titre trop court" })
  @MaxLength(100, { message: "titre trop long" })
  title!: string;

  @OneToMany(() => Ad, (ads) => ads.category)
  @Field(() => [Ad])
  ads!: Ad[];
}

@InputType()
export class InputCategory {
  @Field()
  title!: string;
}
