
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  res.send({ __typename: 'OK', message: "System up and running!" });
});

export { router as indexRouter }