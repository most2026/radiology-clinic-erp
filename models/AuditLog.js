const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["create", "update", "delete"],
      required: true,
    },
    targetModel: { type: String, required: true }, // مثال: "Invoice", "Exam"
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    before: { type: mongoose.Schema.Types.Mixed }, // البيانات قبل التعديل
    after: { type: mongoose.Schema.Types.Mixed },  // البيانات بعد التعديل
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
