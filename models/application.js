import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    sector: {
      type: String,
      require: true,
    },
    agreeTerms: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("", ApplicationSchema);
