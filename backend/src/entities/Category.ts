import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {MaxLength, MinLength } from "class-validator";
import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @MinLength(1, { message: "titre trop court" })
  @MaxLength(100, { message: "titre trop long" })
  title!: string;

  @OneToMany(() => Ad, (ads) => ads.category)
  ads!: Ad[];
}
