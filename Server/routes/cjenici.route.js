import express from "express";
import Cjenik from "../models/cjenik.models.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const cjenik = await Cjenik.findById(req.params.id);
    if (!cjenik) return res.status(404).json({ error: "Cjenik nije pronađen" });
    res.json(cjenik);
  } catch (err) {
    res.status(500).json({ error: "Greška prilikom dohvaćanja cjenika" });
  }
});

export default router;
