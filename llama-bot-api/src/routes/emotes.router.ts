import express from "express";
import validator from "validator";
import {
  addEmote,
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

router.post("/", async (req, res) => {
  const { code, url } = req.body;
  if (
    !code ||
    !url ||
    typeof code !== "string" ||
    typeof url !== "string" ||
    !validator.isURL(url)
  ) {
    res.status(400).send({ error: "Invalid parameters" });
  }
  const emote = await addEmote(code, url);

  return res.status(201).send(emote);
});

export default router;
