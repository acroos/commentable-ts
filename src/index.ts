import * as dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import helmet from "helmet";
import { Comment } from "entity/Comment";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

createConnection().then(connection => {
  const commentRepository = connection.getRepository(Comment);

  // create and setup express app
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // register routes

  app.get("/comments", async function (req: Request, res: Response) {
    const comments = await commentRepository.find();
    res.json(comments);
  });

  app.get("/comments/:id", async function (req: Request, res: Response) {
    const comment = await commentRepository.findOne(req.params.id);
    if (comment === undefined) {
      return res.send(404);
    }
    return res.json(comment);
  });

  app.post("/comments", async function (req: Request, res: Response) {
    const comment = commentRepository.create(req.body);
    const results = await commentRepository.save(comment);
    return res.send(results);
  });

  app.put("/comments/:id", async function (req: Request, res: Response) {
    const comment = await commentRepository.findOne(req.params.id);
    if (comment === undefined) {
      return res.status(404);
    }
    commentRepository.merge(comment, req.body);
    const results = await commentRepository.save(comment);
    return res.send(results);
  });

  app.delete("/comments/:id", async function (req: Request, res: Response) {
    const comment = await commentRepository.findOne(req.params.id);
    if (comment === undefined) {
      return res.status(404);
    }
    const results = await commentRepository.delete(comment);
    return res.send(results);
  });

  // start express server

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
