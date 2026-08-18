const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "اسم التقني مطلوب"],
      trim: true,
    },
    // نسبة/مبلغ افتراضي، قابل للتجاوز لكل فحص لاحقاً في الفاتورة
    defaultShareType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
    defaultShareValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
