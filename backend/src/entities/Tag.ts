import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { MaxLength, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./User";

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
  name!: string;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: number;

  @BeforeInsert()
  updateDate() {
    this.created_at = Date.now();
  }

  @ManyToOne(() => User, (users) => users.tags)
  @JoinColumn()
  @Field(() => User)
  created_by!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: number;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field()
  updated_by!: User;
}

@InputType()
export class TagCreateInput {

}

@InputType()
export class TagUpdateInput {

}
