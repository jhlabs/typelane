import { ConnectionOptions } from "typeorm";
import { Employee } from "../entities";

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_HOST),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [Employee],
  migrations: []
};

export { config };
