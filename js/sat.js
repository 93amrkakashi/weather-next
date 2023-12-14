selectElement.addEventListener("change", function () {
  changeLanguage(this);
});


document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang") || "ar"
  theme = localStorage.getItem("theme") || "light"
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  loadTranslations()
  populateCities(lang)
});




let index = 0;
let slides = document.querySelectorAll(".slides");
let dot = document.querySelectorAll(".dot");
function changeSlide(){
  if(index<0){
    index = slides.length-1;
  }
  if(index>slides.length-1){
    index = 0;
  }
  for(let i=0;i<slides.length;i++){
    slides[i].style.display = "none";
    dot[i].classList.remove("active");
  }
  slides[index].style.display= "block";
  dot[index].classList.add("active");
  index++;
  setTimeout(changeSlide,700);
}
changeSlide();


