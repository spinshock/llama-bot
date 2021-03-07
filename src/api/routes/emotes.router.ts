import express from "express";
import { getEmoteByCode } from "../../database/repositories/emotes.repository";

const router = express.Router();

router.get("/:code", async (req, res) => {
  const codeParam = req.params.code;
  const emote = getEmoteByCode(codeParam);

  return res.send({ emote });
});

export default router;
