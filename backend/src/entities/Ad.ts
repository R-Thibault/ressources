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
import { MaxLength, MinLength } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { ObjectType, Field, ID, InputType, Int } from "type-graphql";
import { ObjectID } from "./ObjectId";
import { User } from "./User";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  @MinLength(1, { message: "titre trop court" })
  @MaxLength(100, { message: "titre trop long" })
  title!: string;

  @Column()
  @Field()
  description!: string;


  @Column()
  @Field()
  price!: number;

  @Column()
  @Field()
  createdAt!: Date;

  @BeforeInsert()
  updateDate() {
    this.createdAt = new Date();
  }

  @Column()
  @Field()
  imageUrl!: string;

  @Column()
  @Field()
  location!: string;

  @ManyToOne(() => Category, (category) => category.ads)
  @Field(() => Category)
  category!: Category;

  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  @Field(() => [Tag])
  tags!: Tag[];

  @ManyToOne(() => User, (user) => user.ads)
  @Field(() => User)
  user!: User;
}

@InputType()
export class InputAd {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  price!: number;

  @Field()
  imageUrl!: string;

  @Field()
  location!: string;

  @Field(() => ObjectID)
  category!: Category;

  @Field(() => [ObjectID])
  tags!: Tag[];

}

@ObjectType()
export class AdsWithMaxPrice {
  @Field(() => [Ad])
  ads!: Ad[];

  @Field(() => Int)
  maxPrice!: number;
}

@InputType()
export class UpdatedAd {
  @Field({ nullable: true })
  title!: string;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable: true })
  price!: number;

  @Field({ nullable: true })
  imageUrl!: string;

  @Field({ nullable: true })
  location!: string;

  @Field(() => ObjectID, { nullable: true })
  category!: Category;

  @Field(() => [ObjectID], { nullable: true })
  tags!: Tag[];
}

@InputType()
export class WhereAd {
  @Field(() => [ID], { nullable: true })
  category!: [number];

  @Field(() => [ID], { nullable: true })
  tags!: number[];

  @Field({ nullable: true })
  searchTitle!: string;

  @Field({ nullable: true })
  priceGTE!: number;

  @Field({ nullable: true })
  priceLTE!: number;
}
