require("dotenv").config();
import { DataSource } from "typeorm";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Ad, Category, Tag, User],
  synchronize: true,
  logging: true,
});
