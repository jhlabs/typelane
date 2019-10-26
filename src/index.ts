import dotenv from "dotenv";
dotenv.config();
import { connectionFactory } from "./shared/infra/database/createConnection";
import { appfactory } from "./shared/infra/http/app";

connectionFactory(appfactory);
