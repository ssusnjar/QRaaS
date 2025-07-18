import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  price: String,
});

const sectionSchema = new mongoose.Schema({
  title: String,
  items: [itemSchema],
});

const cjenikSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sections: [sectionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Cjenik", cjenikSchema);
