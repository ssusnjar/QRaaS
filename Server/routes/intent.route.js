import express from "express";
import axios from "axios";
import ChatMessage from "../models/chatMessages.model.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message, userId, restaurantId } = req.body;

  try {
    const response = await axios.post("http://localhost:8000/predict", {
      text: message,
      userId,
      restaurantId,
    });

    const predictedClass = response.data.class;

    let botReply = "";
    if (predictedClass === 0) {
      botReply = "Pozdrav! Kako mogu pomoći?";
    } else if (predictedClass === 1) {
      botReply = "Naravno! Šaljem ti cjenik!";
    } else if (predictedClass === 2) {
      botReply = "Reci mi što želiš dodati!";
    } else if (predictedClass === 3) {
      botReply = "Koju cijenu želiš promijeniti?";
    } else {
      botReply = "Nisam siguran što želiš.";
    }

    // Spremaš u bazu
    const chat = new ChatMessage({
      userId,
      restaurantId,
      message,
      response: botReply,
    });
    await chat.save();

    res.json({ reply: botReply });
  } catch (err) {
    console.error("Greška:", err);
    res.status(500).json({ reply: "Greška prilikom predikcije." });
  }
});

export default router;
