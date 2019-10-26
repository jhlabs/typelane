import "reflect-metadata";
import { createConnection } from "typeorm";
import { config } from "./config/config";
import { Employee } from "./entities";

createConnection(config)
  .then(connection => {
    // here you can start to work with your entities
  })
  .catch(error => console.log(error));
