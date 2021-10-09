import express from "express";
import {
  getEmoteByCode,
  getEmotes,
} from "../database/repositories/emotes.repository";

const router = express.Router();

router.get("/:code", async (req, res) => {
  const codeParam = req.params.code;
  const emote = await getEmoteByCode(codeParam);

  return res.send({ emote });
});

router.get("/", async (_req, res) => {
  const emotes = await getEmotes();

  return res.send({ emotes });
});

export default router;
