import mongoose from "mongoose";
import Cjenik from "../models/cjenik.models.js";
import Restaurant from "../models/restaurants.model.js";

const norm = (s) => (s ?? "").trim();

const toPriceNumber = (p) => {
  if (p === null || p === undefined || p === "") return undefined;
  const cleaned = String(p).replace(/[^\d.,-]/g, "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
};

function normalizeRestaurantName(raw) {
  const s = norm(raw);
  if (!s) return null;

  
  if (/^\d+$/.test(s)) return `Restoran ${s}`;

  
  const m = s.match(/^restoran\s*(.+)$/i);
  if (m) return `Restoran ${m[1].trim()}`;

  return s;
}

function uniqueDefaultRestaurantName() {
  const d = new Date();
  const pad = (n) => n.toString().padStart(2, "0");
  const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  return `Restoran – ${stamp}`;
}

function cleanItemName(name) {
  return norm(name).replace(/^artikli\s+su\s+/i, "");
}

function buildSectionsFromItems(items = []) {
  const normalized = [];
  for (const it of items || []) {
    const name = cleanItemName(it?.name);
    if (!name) continue;
    const price = toPriceNumber(it?.price);
    normalized.push({ name, price });
  }
  return [{ title: "Glavno", items: normalized }];
}

function findItemInSections(cjenik, name) {
  const needle = norm(name).toLowerCase();
  for (const sec of cjenik.sections) {
    const idx = (sec.items || []).findIndex((i) => norm(i.name).toLowerCase() === needle);
    if (idx !== -1) return { section: sec, idx };
  }
  return null;
}

function getOrCreateSection(cjenik, title = "Glavno") {
  const t = norm(title) || "Glavno";
  let sec = cjenik.sections.find((s) => norm(s.title).toLowerCase() === t.toLowerCase());
  if (!sec) {
    sec = { title: t, items: [] };
    cjenik.sections.push(sec);
  }
  return sec;
}

async function ensureRestaurant({ userId, restaurantId, nameHint }) {
  if (!userId) throw new Error("Missing userId");

  const byName = normalizeRestaurantName(nameHint);
  if (byName) {
    let rest = await Restaurant.findOne({ ownerID: userId, name: byName });
    if (!rest) {
      rest = await Restaurant.create({ ownerID: userId, name: byName });
    }
    return rest;
  }

  if (restaurantId) {
    const rest = await Restaurant.findOne({
      _id: new mongoose.Types.ObjectId(restaurantId),
      ownerID: userId,
    });
    if (!rest) throw new Error("Restaurant not found or not owned by you.");
    return rest;
  }

  const fallbackName = uniqueDefaultRestaurantName();
  const rest = await Restaurant.create({ ownerID: userId, name: fallbackName });
  return rest;
}

async function ensureCjenik({ userId, restaurantId, name }) {
  const doc = await Cjenik.findOneAndUpdate(
    { userId, restaurantId },
    {
      $setOnInsert: { userId, restaurantId, sections: [] },
      $set: { name: norm(name) || "Cjenik" }, 
    },
    { upsert: true, new: true }
  );
  return doc;
}

export async function applyNluToCjenik({ nlu, userId, restaurantId }) {
  if (!userId) throw new Error("Missing userId");
  if (!nlu?.intent) return { changed: false, summary: "Nema prepoznatog intenta." };

  const rest = await ensureRestaurant({ userId, restaurantId, nameHint: nlu.restaurant_name });

  let cjenik = await ensureCjenik({ userId, restaurantId: rest._id, name: rest.name });

  if (nlu.intent === "SET_MENU") {
    const sections = buildSectionsFromItems(nlu.items);
    const itemsCount = sections?.[0]?.items?.length ?? 0;

    cjenik = await Cjenik.findOneAndUpdate(
      { userId, restaurantId: rest._id },
      { $set: { name: rest.name, sections } },
      { new: true, upsert: true }
    );

    return {
      changed: true,
      summary: `Postavljen cjenik (${itemsCount} stavki).`,
      restaurantId: String(rest._id),
      cjenikId: String(cjenik._id),
    };
  }

  switch (nlu.intent) {
    case "ADD_ITEM": {
      const sec = getOrCreateSection(cjenik, "Glavno");
      let added = 0, updated = 0;

      for (const it of nlu.items || []) {
        const name = cleanItemName(it?.name);
        if (!name) continue;
        const price = toPriceNumber(it?.price);
        const existing = (sec.items || []).find(
          (i) => norm(i.name).toLowerCase() === name.toLowerCase()
        );
        if (existing) {
          if (price !== undefined) existing.price = price;
          updated++;
        } else {
          sec.items.push({ name, price });
          added++;
        }
      }

      const saved = await Cjenik.findOneAndUpdate(
        { userId, restaurantId: rest._id },
        { $set: { sections: cjenik.sections } },
        { new: true }
      );

      return {
        changed: true,
        summary: `Dodano ${added}, ažurirano ${updated}.`,
        restaurantId: String(rest._id),
        cjenikId: String(saved._id),
      };
    }

    case "UPDATE_PRICE": {
      let touched = 0;
      for (const it of nlu.items || []) {
        const name = cleanItemName(it?.name);
        if (!name) continue;
        const price = toPriceNumber(it?.price);
        if (price === undefined) continue;
        const found = findItemInSections(cjenik, name);
        if (found) {
          found.section.items[found.idx].price = price;
          touched++;
        }
      }

      const saved = touched
        ? await Cjenik.findOneAndUpdate(
            { userId, restaurantId: rest._id },
            { $set: { sections: cjenik.sections } },
            { new: true }
          )
        : cjenik;

      return {
        changed: touched > 0,
        summary: touched ? `Ažurirano ${touched} cijena.` : "Nije pronađen traženi artikl.",
        restaurantId: String(rest._id),
        cjenikId: String(saved._id),
      };
    }

    case "DELETE_ITEM": {
      let removed = 0;
      for (const it of nlu.items || []) {
        const name = cleanItemName(it?.name);
        if (!name) continue;
        for (const sec of cjenik.sections) {
          const before = (sec.items || []).length;
          sec.items = (sec.items || []).filter(
            (i) => norm(i.name).toLowerCase() !== name.toLowerCase()
          );
          removed += before - sec.items.length;
        }
      }

      const saved = removed
        ? await Cjenik.findOneAndUpdate(
            { userId, restaurantId: rest._id },
            { $set: { sections: cjenik.sections } },
            { new: true }
          )
        : cjenik;

      return {
        changed: removed > 0,
        summary: removed ? `Obrisano ${removed} artikala.` : "Ništa za obrisati.",
        restaurantId: String(rest._id),
        cjenikId: String(saved._id),
      };
    }

    case "SET_RESTAURANT": {
      let newName = rest.name;
      if (nlu.restaurant_name && norm(nlu.restaurant_name) !== rest.name) {
        newName = normalizeRestaurantName(nlu.restaurant_name) || rest.name;
        await Restaurant.updateOne({ _id: rest._id }, { $set: { name: newName } });
      }
      const saved = await Cjenik.findOneAndUpdate(
        { userId, restaurantId: rest._id },
        { $set: { name: newName } },
        { new: true }
      );

      return {
        changed: true,
        summary: `Restoran postavljen na "${newName}".`,
        restaurantId: String(rest._id),
        cjenikId: String(saved._id),
      };
    }

    default:
      return {
        changed: false,
        summary: "Intent ne mijenja cjenik.",
        restaurantId: String(rest._id),
        cjenikId: String(cjenik._id),
      };
  }
}
