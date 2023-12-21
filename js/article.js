const article_con = document.getElementById("articles");


async function loadArticle() {
  document.body.insertAdjacentHTML('beforeend', loaderHtml);
  const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
  try {
    const response = await fetch(`${url}articles/${id}`);
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
  finally {
    const loaderElement = document.querySelector('.loader_con');
    loaderElement && loaderElement.remove();
  }
}


async function add_eles(lang) {
  article_con.innerHTML = "";
  try {
    let article = await loadArticle();
    const mainImage = article.mainImage;
    const all_images = article.all_images;
    const title = lang === "ar" ? article.title_ar : article.title_fr;
    const otherImages = all_images.filter(image => image !== mainImage);
    const imagesHTML = otherImages.map(image => 
    `<img class="article_image w-full md:w-[47%] rounded-xl " src="${image}" alt="${image}">`).join('')
    const ops = lang == "ar" ? JSON.parse(article.body_ar).ops : JSON.parse(article.body_fr).ops ;
    const bodyHTML = ops.map(op => {
      if (op.insert) {
        return op.attributes
          ? `<span style="${Object.entries(op.attributes).map(([key, value]) => `${key}: ${value}`).join('; ')}">${op.insert}</span>`
          : op.insert;
      }
      return '';
    }).join('');

    article_con.innerHTML = `
      <div class="glass article w-full min-h-[600px]  flex flex-col justify-start items-center gap-3">
        <div class="title font-bold text-4xl text-center">${title}</div>
        <div class="">
          <img src="${mainImage}" alt="">
        </div>
        <div class="desc font-bold text-xl text-center">${bodyHTML}</div>
        <div class="images w-full flex flex-col md:flex-row justify-around items-center flex-wrap gap-6">${imagesHTML}</div>
      </div>`;
  } catch (error) {
    console.error(error);
  }
  
}
 




selectElement.addEventListener("change", async function () {
  changeLanguage(this);
  await loadArticle();
  add_eles(localStorage.getItem("lang"));
});

document.addEventListener("DOMContentLoaded",async function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  loadTranslations();
  await loadArticle();
  add_eles(lang);

});