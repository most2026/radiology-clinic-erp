const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "اسم الجهاز مطلوب"],
      trim: true,
      unique: true, // مثال: "جهاز الرنين", "سونار 1"
    },
    type: {
      type: String,
      enum: ["xray", "ultrasound", "mri"],
      required: [true, "نوع الجهاز مطلوب"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Device", deviceSchema);
