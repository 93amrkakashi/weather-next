const article_con = document.getElementById("articles");
// let theme = localStorage.getItem("theme")

async function loadArticles() {
  try {
    const response = await fetch("http://localhost:5000/api/articles");
    if (!response.ok) {
      throw new Error("network error");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function add_eles(lang) {
  article_con.innerHTML = "";
  try {
    let articles = await loadArticles();
    if (articles <= 0) {
      article_con.innerHTML = `<div class="title font-bold text-4xl text-center ">لا يوجد مقالات </div>`;
    } else {
      for (let i = 0; i < articles.length; i++) {
        let articleElement = document.createElement("div");
        const mainImage = articles[i].mainImage;
        const title =
          lang === "ar" ? articles[i].title_ar : articles[i].title_fr;
        const body = lang === "ar" ? articles[i].body_ar : articles[i].body_fr;
        const quillDelta = JSON.parse(body);
        const plainText = quillDelta.ops.reduce(
          (text, op) => text + (op.insert || ""),
          ""
        );
        const btn = lang === "ar" ? "أكمل القراءة" : "Continuer la lecture";
        articleElement.innerHTML = `
          <div class="glass article max-w-[400px] h-[600px] rounded-2xl flex flex-col justify-start items-center gap-3">
              <div class="image">
                  <img src="${mainImage}" alt="">
              </div>
              <div class="title font-bold text-3xl text-center ">${title}</div>
              <div class="desc w-full font-bold text-xl text-center ">${plainText.slice(
                0,
                100
              )}....</div>
              <a href="../article.html?id=${articles[i]._id}" >
                <button data-translation="edit_btn" class="bg-[#0167b4] text-3xl font-bold text-white px-5 py-2 my-4 rounded-2xl">${btn}</button>
              </a>
          </div>
      `;
        article_con.appendChild(articleElement);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

selectElement.addEventListener("change", async function () {
  changeLanguage(this);
  await loadArticles();
  add_eles(localStorage.getItem("lang"));
});

document.addEventListener("DOMContentLoaded", async function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  loadTranslations();
  await loadArticles();
  add_eles(lang);
  // change_dir(lang);
  // viewStateCities();

  // callWeatherAPI(statelat, statelng, lang);
  // callAdanTime(statelat, statelng, lang);
  // city_name.innerText = stateName;
});
