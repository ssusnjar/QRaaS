import express from "express";
import Cjenik from "../models/cjenik.models.js";
import { protect } from "../middleware/auth.middleware.js";
import Restaurant from "../models/restaurants.model.js";

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

router.post("/", protect, async (req, res) => {
  try {
    const { name, sections, restaurantId  } = req.body;
        // const { userId, name, sections, restaurantId  } = req.body;

    // if (!userId) {
    //   return res.status(400).json({ message: "Nedostaje userId" });
    // }

      const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      ownerID: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found or not owned by you" });
    }

    const newCjenik = await Cjenik.create({ userId: req.user._id, name, sections });
    res.status(201).json({ message: "Cjenik spremljen!", cjenik: newCjenik });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const menus = await Cjenik.find({ userId:  req.params.userId  });
    res.json(menus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Greška kod dohvaćanja menija" });
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


//TODO ovo vamo mozda stavit ove provjere, trenutno ne rade, al dodat ih u dio di se pise u wordu mozda o tome ima puno pisat
// router.put("/:id", async (req, res) => {
//   try {
//     const { name, sections } = req.body;

//     if (!name || name.trim() === "") {
//       return res.status(400).json({ message: "Naziv cjenika je obavezan." });
//     }

//     if (!Array.isArray(sections) || sections.length === 0) {
//       return res.status(400).json({ message: "Cjenik mora imati barem jednu sekciju." });
//     }

//     for (const section of sections) {
//       if (!section.title || section.title.trim() === "") {
//         return res.status(400).json({ message: "Svaka sekcija mora imati naslov." });
//       }

//       if (!Array.isArray(section.items)) {
//         return res.status(400).json({ message: "Sekcija mora sadržavati stavke." });
//       }

//       for (const item of section.items) {
//         if (!item.name || item.name.trim() === "") {
//           return res.status(400).json({ message: "Svaka stavka mora imati naziv." });
//         }

//         if (!item.price || item.price.trim() === "") {
//           return res.status(400).json({ message: "Svaka stavka mora imati cijenu." });
//         }

//       }
//     }

//     const updatedCjenik = await Cjenik.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });

//     res.status(200).json(updatedCjenik);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Greška kod ažuriranja cjenika." });
//   }
// });


export default router;
