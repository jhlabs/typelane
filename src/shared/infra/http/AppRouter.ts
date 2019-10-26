import express from "express";

export class AppRouter {
  public static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
  private static instance: express.Router;
}
