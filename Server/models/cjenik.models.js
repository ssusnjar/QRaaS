import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  naziv: String,
  cijena: String,
});

const CjenikSchema = new mongoose.Schema({
  items: [ItemSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Cjenik", CjenikSchema);
