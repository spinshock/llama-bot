import express from "express";
import EmotesRouter from "./emotes.router";

const router = express.Router();

router.use("/emotes", EmotesRouter);

export default router;
