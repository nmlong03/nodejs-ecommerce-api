import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    count: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
