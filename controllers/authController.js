const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

// عرض صفحة تسجيل الدخول
exports.getLogin = (req, res) => {
  // إذا كان مسجل دخول أصلاً، لا داعي لإعادة عرض صفحة اللوجن
  if (req.session.user) return res.redirect("/dashboard");
  res.render("pages/login", { layout: false, error: null });
};

// معالجة تسجيل الدخول
exports.postLogin = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  // نطلب الباسورد صراحة لأنه select: false في الموديل
  const user = await User.findOne({ username, isActive: true }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.render("pages/login", {
      layout: false,
      error: "اسم المستخدم أو كلمة المرور غير صحيحة",
    });
  }

  // نخزن فقط البيانات الضرورية في الجلسة، وليس المستند كاملاً
  req.session.user = {
    id: user._id,
    fullName: user.fullName,
    role: user.role,
  };

  res.redirect("/dashboard");
});

// تسجيل الخروج
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};