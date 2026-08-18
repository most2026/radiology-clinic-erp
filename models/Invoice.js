const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, "اسم المريض مطلوب"],
      trim: true,
    },
    patientPhone: { type: String, trim: true },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    // السعر الفعلي وقت إصدار الفاتورة (نسخة مستقلة عن Exam.defaultPrice
    // حتى لو تغيّر سعر الفحص لاحقاً، الفاتورة القديمة تبقى صحيحة تاريخياً)
    price: { type: Number, required: true, min: 0 },

    technician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: [true, "يجب تحديد التقني المنفذ"],
    },
    technicianShareType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    technicianShareValue: { type: Number, required: true, min: 0 },
    technicianAmount: { type: Number, required: true, min: 0 }, // المبلغ المحسوب فعلياً

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "يجب تحديد الطبيب كاتب التقرير"],
    },
    doctorShareType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    doctorShareValue: { type: Number, required: true, min: 0 },
    doctorAmount: { type: Number, required: true, min: 0 },

    // صافي ربح العيادة = السعر - حصة التقني - حصة الطبيب
    clinicNetAmount: { type: Number, required: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // القفل يمنع التعديل المباشر؛ التعديل الفعلي يمر عبر مسار خاص بصلاحية السكرتير + تسجيل في AuditLog
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
