import express from "express";
import Cjenik from "../models/cjenik.models.js";
import { generateWithOllama } from "../services/ollama.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  // Ako korisnik spomene "cjenik", direktno odgovoriš bez Ollame
  if (message.toLowerCase().includes("cjenik")) {
    return res.json({ reply: "Naravno! Pošaljite mi stavke i cijene, npr: voda 2€, kava 3€." });
  }

  // Pokušaj parsirati kao stavke
  const lines = message.split(",").map((l) => l.trim());
  const items = lines.map((line) => {
    const match = line.match(/^(.+?)\s+(\d+€?)$/);
    return match ? { naziv: match[1], cijena: match[2] } : null;
  }).filter(Boolean);

  // Ako je uspješno parsirano – spremi u bazu
  if (items.length > 0) {
    const cjenik = await Cjenik.create({ items });
    return res.json({ reply: `Cjenik je spremljen! Pogledaj ga ovdje: /cjenik/${cjenik._id}` });
  }

  // Ako ništa od gore nije upalilo, koristi Ollamu za "pametan" odgovor
  try {
    const botOdgovor = await generateWithOllama(message);
    return res.json({ reply: botOdgovor });
  } catch (err) {
    console.error("Greška s Ollamom:", err.message);
    return res.status(500).json({ reply: "Ups! Nešto nije u redu s AI-om." });
  }
});

export default router;