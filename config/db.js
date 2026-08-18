const mongoose = require("mongoose");

// دالة الاتصال بقاعدة البيانات
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB متصل بنجاح: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ فشل الاتصال بقاعدة البيانات: ${error.message}`);
    // إيقاف التطبيق فوراً إذا فشل الاتصال، فلا معنى لتشغيل سيرفر بدون DB
    process.exit(1);
  }
};

module.exports = connectDB;