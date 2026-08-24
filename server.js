const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;

const connectDB = require("./config/db");
const { isAuthenticated } = require("./middlewares/auth");

dotenv.config();
connectDB();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ==== إعداد الجلسات (Sessions) مع تخزينها في MongoDB ====
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 8, // 8 ساعات
    },
  })
);

// ==== المسارات ====
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

// مسار لوحة التحكم أصبح محمياً الآن
app.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("pages/dashboard");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
});
