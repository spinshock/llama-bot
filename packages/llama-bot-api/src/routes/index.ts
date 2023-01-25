import express from "express";
import EmoteRouter from "./emotes.router";

const router = express.Router();

router.use("/emote", EmoteRouter);

export default router;
