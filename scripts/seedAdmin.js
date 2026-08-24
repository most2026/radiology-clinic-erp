// تشغيل لمرة واحدة فقط: node scripts/seedAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const exists = await User.findOne({ username: "admin" });
  if (exists) {
    console.log("⚠️ المستخدم موجود مسبقاً");
    process.exit();
  }

  await User.create({
    fullName: "السكرتير الرئيسي",
    username: "admin",
    password: "123456", // غيّرها فوراً بعد أول تسجيل دخول
    role: "secretary",
  });

  console.log("✅ تم إنشاء حساب السكرتير بنجاح");
  process.exit();
})();
