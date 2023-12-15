let user;
const article_con = document.getElementById("articles");
const addButton = document.querySelector('.add_btn');
const login_form = document.querySelector('.login');



addButton.addEventListener('mouseenter', function () {
    this.textContent = "إضافة مقال";
});
addButton.addEventListener('mouseleave', function () {
    this.textContent = "+";
});

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
            <a href="/form?id=5" >
            <button data-translation="edit_btn" class="bg-[#0167b4] text-3xl font-bold text-white px-5 py-2 my-4 rounded-2xl"></button>
            </a>
        </div>
    `;

    article_con.appendChild(articleElement);
}
}

selectElement.addEventListener("change", function () {
  changeLanguage(this);
});

document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }

  loadTranslations();
  change_glass(localStorage.getItem("theme"))
  if (user) {
    add_eles()
  } else {
    login_form.classList.add("show-el")
    article_con.classList.add("hide-el")
    addButton.classList.add("hide-el")
  }

  // change_dir(lang);

});