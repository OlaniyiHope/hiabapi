import mongoose from "mongoose";
const HiabSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: Number,
    },

    companyAddress: {
      type: String,
    },
    companyName: {
      type: String,
    },

    messsage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Hiab", HiabSchema);
