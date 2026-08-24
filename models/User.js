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
      select: false,
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
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// تشفير كلمة المرور تلقائياً قبل الحفظ
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// مقارنة كلمة المرور عند تسجيل الدخول
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
