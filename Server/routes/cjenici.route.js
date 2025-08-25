import express from "express";
import Cjenik from "../models/cjenik.models.js";
import { protect } from "../middleware/auth.middleware.js";
import Restaurant from "../models/restaurants.model.js";

const router = express.Router();


router.get("/me", protect, async (req, res) => {
  try {
    const q = { userId: req.user._id };
    if (req.query.restaurantId) q.restaurantId = req.query.restaurantId;
    const menus = await Cjenik.find(q).sort({ _id: -1 });
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška kod dohvaćanja menija" });
  }
});
router.get("/all", async (req, res) => {
  try {
    const allMenus = await Cjenik.find();
    res.json(allMenus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška kod dohvaćanja svih menija" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const q = { userId: req.params.userId };
    if (req.query.restaurantId) q.restaurantId = req.query.restaurantId;
    const menus = await Cjenik.find(q).sort({ _id: -1 });
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška kod dohvaćanja menija" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const cjenik = await Cjenik.findById(req.params.id);
    if (!cjenik) return res.status(404).json({ error: "Cjenik nije pronađen" });
    res.json(cjenik);
  } catch (err) {
    res.status(500).json({ error: "Greška prilikom dohvaćanja cjenika" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { name, sections, restaurantId  } = req.body;

      const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      ownerID: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found or not owned by you" });
    }

    const newCjenik = await Cjenik.create({ userId: req.user._id,restaurantId,  name, sections });
    res.status(201).json({ message: "Cjenik spremljen!", cjenik: newCjenik });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Cjenik.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Cjenik nije pronađen" });
    }
    res.json({ message: "Cjenik obrisan!" });
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom brisanja cjenika" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updated = await Cjenik.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Greška kod ažuriranja" });
  }
});

router.get("/_debug/info", async (req, res) => {
  try {
    const db = req.app.get("mongoose")?.connection || (await import("mongoose")).then(m => m.connection);
    const cols = await db.db.listCollections().toArray();
    res.json({
      db: db.name,
      host: db.host,
      collections: cols.map(c => c.name), 
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


router.get("/_debug/latest", async (req, res) => {
  try {
    const docs = await Cjenik.find().sort({ _id: -1 }).limit(10).lean();
    res.json({ count: docs.length, docs });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/_debug/byid/:id", async (req, res) => {
  try {
    const doc = await Cjenik.findById(req.params.id).lean();
    res.json({ found: !!doc, doc });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


export default router;
