import { createConnection } from "typeorm";
import { config } from "./config";

function connectionFactory(callback: () => void): void {
  createConnection(config)
    .then(connection => {
      console.log("Database connection established");
      callback();
    })
    .catch(error => console.log(error));
}

export { connectionFactory };
