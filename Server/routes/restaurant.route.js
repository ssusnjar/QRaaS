import express from "express";
import Restaurant from "../models/restaurants.model.js";
import Cjenik from "../models/cjenik.models.js"
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Naziv je obavezan." });
    }

    const newRestaurant = await Restaurant.create({
      name,
      ownerID: req.user._id,
    });

    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error("Greška kod kreiranja restorana:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

router.post("/with-menu", protect, async (req, res) => {
  try {
    const { name, sections } = req.body;
    const userId = req.user._id;
 
    const newRestaurant = await Restaurant.create({
      name,
      ownerID: userId,
    });

    const newCjenik = await Cjenik.create({
      name,
      sections,
      userId,
      restaurantId: newRestaurant._id,
    });

    res.status(201).json({
      message: "Restoran i cjenik uspješno kreirani!",
      restaurant: newRestaurant,
      cjenik: newCjenik,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Greška kod kreiranja restorana i cjenika." });
  }
});

export default router;
