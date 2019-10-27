import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import { connectionFactory } from "./database/createConnection";
import { appfactory } from "./http/app";

connectionFactory(appfactory);
