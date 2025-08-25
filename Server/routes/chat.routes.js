import express from "express";
import mongoose from "mongoose";
import { protect } from "../middleware/auth.middleware.js";
import { parseTextNLU } from "../services/nluClient.js";
import { applyNluToCjenik } from "../services/cjenikApplyFromNlu.js";
import Cjenik from "../models/cjenik.models.js";

const router = express.Router();

router.post("/", protect, async (req, res) => { 
  console.log("[/api/chat] DB:", {
    db: mongoose.connection.name,
    host: mongoose.connection.host,
    readyState: mongoose.connection.readyState,
    uri: process.env.MONGO_URI ?? "UNDEFINED",
  });

  try {
    const text = req.body?.text ?? req.body?.message ?? "";
    const restaurantId = req.body?.restaurantId || undefined;
    if (!text) return res.status(400).json({ error: "Missing message/text" });

    const userId = req.user._id; 

    const nlu = await parseTextNLU(text);

    if (nlu?.intent === "GREET") {
      return res.json({ reply: "Hej! 👋 Kako mogu pomoći?", nlu });
    }
    if (nlu?.intent === "ASK_MENU") {
      return res.json({ reply: "Reci što želiš dodati/izmijeniti. Npr: “Dodaj kava 2€”", nlu });
    }

    const result = await applyNluToCjenik({ nlu, userId, restaurantId });

    const verify = await Cjenik.findOne({ userId, restaurantId: result.restaurantId }).lean();
    console.log("[/api/chat][verify]", {
      found: !!verify,
      items: verify?.sections?.[0]?.items?.length ?? 0,
      cjenikId: verify?._id?.toString(),
      db: mongoose.connection.name,
    });

    return res.json({ reply: result.summary, nlu, result, verify });
  } catch (err) {
    console.error("[/api/chat] ERROR:", err?.name, err?.message);
    return res.status(500).json({ error: "CHAT_FAILED", message: err?.message });
  }
});

export default router;
