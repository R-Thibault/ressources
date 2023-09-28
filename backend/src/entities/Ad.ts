import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @MinLength(1, { message: "titre trop court" })
  @MaxLength(100, { message: "titre trop long" })
  title!: string;

  @Column()
  description!: string;

  @Column()
  @IsEmail()
  owner!: string;

  @Column()
  price!: number;

  @Column()
  createdAt!: Date;

  @BeforeInsert()
  updateDate() {
    this.createdAt = new Date();
  }

  @Column()
  imageUrl!: string;

  @Column()
  location!: string;

  @ManyToOne(() => Category, (category) => category.ads)
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags!: Tag[];
}
