/* ==========================================================
   إعدادات الذكاء الاصطناعي — المساعد الأردني الذكي
   ==========================================================
   المفتاح الحقيقي لا يُكتب هنا أبداً!
   المفتاح موجود في ملف محلي اسمه config.local.js
   وهذا الملف (config.local.js) ممنوع من الرفع في .gitignore.

   عند فتح الموقع بدون ملف محلي، سيطلب المفتاح مرة واحدة
   ويحفظه في متصفح المستخدم (localStorage).
*/

window.AI_CONFIG = {
  GROQ_MODEL: "qwen/qwen3.8-27b",
};

// 1) محاولة تحميل المفتاح من الملف المحلي غير المرفوع (للمطور فقط)
try {
  if (window.CONFIG_LOCAL && window.CONFIG_LOCAL.GROQ_API_KEY) {
    window.AI_CONFIG.GROQ_API_KEY = window.CONFIG_LOCAL.GROQ_API_KEY;
  }
} catch (e) { /* لا يوجد ملف محلي — طبيعي لدى الزوار */ }

// 2) محاولة تحميل المفتاح من تخزين المتصفح (localStorage)
if (!window.AI_CONFIG.GROQ_API_KEY) {
  try {
    var saved = localStorage.getItem("GROQ_API_KEY");
    if (saved) window.AI_CONFIG.GROQ_API_KEY = saved;
  } catch (e) { /* المتصفح منع التخزين */ }
}

// 3) فحص هل يوجد مفتاح — وإلا واجهة إدخال مرة واحدة
if (!window.AI_CONFIG.GROQ_API_KEY) {
  document.addEventListener("DOMContentLoaded", function () {
    var key = prompt(
      "المساعد الذكي يحتاج مفتاح API مجاني من groq.com/keys\nالصق المفتاح هنا (يبدأ بـ gsk_):"
    );
    if (key && key.trim().indexOf("gsk_") === 0) {
      window.AI_CONFIG.GROQ_API_KEY = key.trim();
      try { localStorage.setItem("GROQ_API_KEY", key.trim()); } catch (e) {}
    }
  });
}
