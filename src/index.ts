import * as dotenv from "dotenv";
import express from "express";
import { createConnection } from "typeorm";
import cors from "cors";
import helmet from "helmet";
import { commentsRouter } from "./controllers/CommentsController";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

createConnection().then(() => {
  // create and setup express app
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // register routes
  app.use("/api/comments", commentsRouter);

  // start express server

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
