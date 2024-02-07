import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  title!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  type!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  @Field()
  path!: string;

  @Column({ type: "timestamp", nullable: false })
  @Field()
  created_at!: number;

  @BeforeInsert()
  updateDate() {
    this.created_at = Date.now();
  }

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  created_by!: User;

  @Column({ type: "timestamp", nullable: true })
  @Field()
  updated_at!: number;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User)
  updated_by!: User;
}
