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
  const { code, url, author } = req.body;
  if (
    !code ||
    !url ||
    !author ||
    typeof code !== "string" ||
    typeof url !== "string" ||
    typeof author !== "string" ||
    !validator.isURL(url)
  ) {
    res.status(400).send({ error: "Invalid parameters" });
  } else {
    try {
      if (await getEmoteByCode(code)) {
        res.status(409).send({ error: "Emote already exists" });
      }
      const emote = await addEmote(code, url, author);

      res.status(201).send(emote);
    } catch (error) {
      console.error(error);

      res.status(500).send({ error: "Internal server error" });
    }
  }
});

export default router;
