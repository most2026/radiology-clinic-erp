const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "الاسم الكامل مطلوب"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "اسم المستخدم مطلوب"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "كلمة المرور مطلوبة"],
      minlength: 6,
      select: false, // لا تُرجع مع أي استعلام إلا إذا طُلبت صراحة
    },
    role: {
      type: String,
      enum: {
        values: ["secretary", "doctor"],
        message: "الدور يجب أن يكون secretary أو doctor",
      },
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // لتعطيل الحساب بدل حذفه نهائياً
    },
  },
  { timestamps: true }
);

// تشفير كلمة المرور تلقائياً قبل الحفظ
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// مقارنة كلمة المرور عند تسجيل الدخول
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);