// يلتقط أي خطأ داخل الدالة async ويمرره لـ Express تلقائياً
module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};