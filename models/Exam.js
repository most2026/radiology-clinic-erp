const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "اسم الفحص مطلوب"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["xray", "ultrasound", "mri"],
      required: [true, "تصنيف الفحص مطلوب"],
    },
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: [true, "يجب ربط الفحص بالجهاز الذي يُجرى عليه"],
    },
    defaultPrice: {
      type: Number,
      required: [true, "السعر الافتراضي مطلوب"],
      min: 0,
    },
    // القيم الافتراضية لحصص هذا الفحص (تُستخدم كقيم مبدئية عند إصدار الفاتورة)
    technicianShareType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
    technicianShareValue: { type: Number, default: 0, min: 0 },
    doctorShareType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "fixed",
    },
    doctorShareValue: { type: Number, default: 0, min: 0 },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
