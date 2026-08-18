const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "وصف المصروف مطلوب"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["films", "gel", "maintenance", "other"],
      default: "other",
    },
    amount: {
      type: Number,
      required: [true, "قيمة المصروف مطلوبة"],
      min: 0,
    },
    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: [true, "يجب ربط المصروف بالجهاز المخصص له"],
    },
    date: { type: Date, default: Date.now },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
