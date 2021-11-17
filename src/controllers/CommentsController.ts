import express, { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Comment } from "../entity/Comment";

export const commentsRouter = express.Router();
const commentRepository = () => getRepository(Comment);

commentsRouter.get("/", async function (req: Request, res: Response) {
  const comments = await commentRepository().find();
  res.json(comments);
});

commentsRouter.get(
  "/:id",
  async function (req: Request, res: Response) {
    const comment = await commentRepository().findOne(req.params.id);
    if (comment === undefined) {
      return res.send(404);
    }
    return res.json(comment);
  }
);

commentsRouter.post(
  "/",
  async function (req: Request, res: Response) {
    const comment = commentRepository().create(req.body);
    const results = await commentRepository().save(comment);
    return res.send(results);
  }
);

commentsRouter.put(
  "/:id",
  async function (req: Request, res: Response) {
    const comment = await commentRepository().findOne(req.params.id);
    if (comment === undefined) {
      return res.status(404);
    }
    commentRepository().merge(comment, req.body);
    const results = await commentRepository.save(comment);
    return res.send(results);
  }
);

commentsRouter.delete(
  "/:id",
  async function (req: Request, res: Response) {
    const comment = await commentRepository().findOne(req.params.id);
    if (comment === undefined) {
      return res.status(404);
    }
    const results = await commentRepository().delete(comment);
    return res.send(results);
  }
);
