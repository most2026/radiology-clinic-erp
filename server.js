const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const methodOverride = require("method-override");

const connectDB = require("./config/db");

// تحميل متغيرات البيئة من .env
dotenv.config();

// الاتصال بقاعدة البيانات
connectDB();

const app = express();

// ==== إعداد محرك القوالب EJS ====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main"); // التخطيط الافتراضي لكل الصفحات

// ==== الملفات الثابتة (CSS, JS, Images) ====
app.use(express.static(path.join(__dirname, "public")));

// ==== Middlewares أساسية ====
app.use(express.json());                       // قراءة JSON من الطلبات
app.use(express.urlencoded({ extended: true })); // قراءة بيانات الفورمات
app.use(methodOverride("_method"));             // لدعم PUT/DELETE من فورمات HTML

// تسجيل الطلبات في وضع التطوير فقط
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ==== مسار تجريبي للتأكد من عمل السيرفر ====
app.get("/", (req, res) => {
  res.render("pages/dashboard");
});

// ==== تشغيل السيرفر ====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
});