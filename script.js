// Nyelvváltó – HU / EN
(function () {
  const STORAGE_KEY = "ersp-lang";
  const btnHu = document.getElementById("btn-hu");
  const btnEn = document.getElementById("btn-en");

  function setLang(lang) {
    // Minden elem, aminek van data-hu / data-en attribútuma
    document.querySelectorAll("[data-hu][data-en]").forEach((el) => {
      const value = el.getAttribute("data-" + lang);
      if (value !== null) {
        el.textContent = value;
      }
    });

    // HTML lang attribútum
    document.documentElement.lang = lang;

    // Gombok állapota
    btnHu.classList.toggle("active", lang === "hu");
    btnEn.classList.toggle("active", lang === "en");

    // Mentés
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) { /* privát mód */ }
  }

  btnHu.addEventListener("click", () => setLang("hu"));
  btnEn.addEventListener("click", () => setLang("en"));

  // Indításkor: mentett nyelv, különben böngésző nyelve, különben magyar
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  const browserLang = (navigator.language || "hu").slice(0, 2).toLowerCase();
  const initial = saved || (browserLang === "en" ? "en" : "hu");

  setLang(initial);
})();
