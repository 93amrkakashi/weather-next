const article_con = document.getElementById("articles");
// let theme = localStorage.getItem("theme")


function add_eles() {
  article_con.innerHTML = ""
for (let i = 0; i < 10; i++) {
    let articleElement = document.createElement("div");
    articleElement.innerHTML = `
        <div class="glass article w-[400px] h-[600px] rounded-2xl flex flex-col justify-start items-center gap-3">
            <div class="image">
                <img src="../images/sat1.gif" alt="">
            </div>
            <div class="title font-bold text-3xl text-center ">Lorem ipsum dostrum, omnis.</div>
            <div class="desc font-bold text-xl text-center ">Lorem ipsum dut repudiandae consequatur tempora omnis aspernatur porro id deserunt autem quod blanditiis dolorem culpa, voluptate, beatae facilis amet?</div>
            <a href="/article?id=5" >
            <button data-translation="read_btn" class="bg-[#0167b4] text-3xl font-bold text-white px-5 py-2 my-4 rounded-2xl"></button>
            </a>
        </div>
    `;

    article_con.appendChild(articleElement);
}
}
add_eles()
change_glass(localStorage.getItem("theme"))



selectElement.addEventListener("change", function () {
  changeLanguage(this);
  // change_glass(localStorage.getItem("theme"))
  // change_dir(localStorage.getItem("lang"));
  // viewStateCities();
  // callWeatherAPI(statelat, statelng, localStorage.getItem("lang"));
  // callAdanTime(statelat, statelng, localStorage.getItem("lang"));
  // city_name.innerText = stateName;
});

document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  loadTranslations();

  // change_dir(lang);
  // viewStateCities();

  // callWeatherAPI(statelat, statelng, lang);
  // callAdanTime(statelat, statelng, lang);
  // city_name.innerText = stateName;
});