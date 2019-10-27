import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { useExpressServer } from "routing-controllers";
import { EmployeeController } from "../controllers";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

useExpressServer(app, {
  controllers: [EmployeeController]
});

function appfactory() {
  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
}

export { appfactory };
