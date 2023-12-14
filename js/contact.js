
document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang") || "ar"
  theme = localStorage.getItem("theme") || "light"
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  loadTranslations()
  change_dir(lang)
  
});

selectElement.addEventListener("change", function () {
  changeLanguage(this);
  change_dir(localStorage.getItem("lang"))

});

let fields = document.querySelectorAll(".field");

function change_dir(lang) {
  console.log(lang)
  fields.forEach(field => {
    if (lang === "ar") {
      field.classList.add("items-start");
      field.classList.remove("items-end");
    } else {
      field.classList.remove("items-start");
      field.classList.add("items-end");
    }
  });
}
