// يتأكد أن المستخدم مسجل دخول قبل الوصول لأي صفحة محمية
exports.isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  // نجعل بيانات المستخدم متاحة في كل الـ views تلقائياً (navbar, sidebar..)
  res.locals.currentUser = req.session.user;
  next();
};

// يحصر الوصول بالسكرتير فقط (مثال: سجل التدقيق، تعديل الفواتير المقفلة)
exports.isSecretary = (req, res, next) => {
  if (req.session.user.role !== "secretary") {
    return res.status(403).render("pages/error", {
      layout: false,
      message: "غير مصرح لك بالوصول لهذه الصفحة",
    });
  }
  next();
};