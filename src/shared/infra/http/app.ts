import express, { Request, Response } from "express";
import "reflect-metadata";
import { AppRouter } from "./AppRouter";

const app = express();

app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
