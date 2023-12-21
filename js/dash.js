let admin = localStorage.getItem("admin");
const article_con = document.getElementById("articles");
const addButton = document.querySelector('.add_btn');
const login_form = document.querySelector('.login');



addButton.addEventListener('mouseenter', function () {
    this.textContent = "إضافة مقال";
});
addButton.addEventListener('mouseleave', function () {
    this.textContent = "+";
});



selectElement.addEventListener("change", async function () {
  changeLanguage(this);
  await loadArticles();
  add_eles(localStorage.getItem("lang"));
});

var form = document.getElementById("login_form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    var requestData = {
        email: email,
        password: password
    };
    fetch(`${url}user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
    .then(data => {
      console.log("logged in ");
      console.log(data);
      const userData = JSON.parse(data);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('firstName', userData.firstName);
      localStorage.setItem('lastName', userData.lastName);
      localStorage.setItem('admin', userData.admin);
      location.reload()
    })
    .catch(error => {
        console.error(error);
    });
});


async function loadArticles() {
  document.body.insertAdjacentHTML('beforeend', loaderHtml);
  try {
    const response = await fetch(`${url}articles`);
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
    let articles = await loadArticles();
    if (articles <= 0) {
      article_con.innerHTML = `<div class="title font-bold text-4xl text-center ">لا يوجد مقالات </div>`;
    } else {
      for (let i = 0; i < articles.length; i++) {
        let articleElement = document.createElement("div");
        const mainImage = articles[i].mainImage;
        const title = lang === "ar" ? articles[i].title_ar : articles[i].title_fr;
        const body = lang === "ar" ? articles[i].body_ar : articles[i].body_fr;
        const quillDelta = JSON.parse(body);
        const plainText = quillDelta.ops.reduce((text, op) => text + (op.insert || ''), '');
        const btn = lang === "ar" ? "تعديل" : "amendement";
        const del_btn = lang === "ar" ? "حذف" : "supprimer";
        articleElement.innerHTML = `
          <div class="glass article max-w-[400px] h-[600px] rounded-2xl flex flex-col justify-start items-center gap-3">
              <div class="image w-full">
                  <img src="${mainImage}" alt="">
              </div>
              <div class="title font-bold text-3xl text-center ">${title}</div>
              <div class="desc font-bold text-xl text-center ">${plainText.slice(0,100)}</div>
              <div class="flex justify-around items-center gap-3">
                <a href="../form.html?id=${articles[i]._id }" >
                  <button class="edit-btn bg-[#0167b4] text-3xl font-bold text-white px-5 py-2 my-4 rounded-2xl">${btn}</button>
                </a> 
                <button class="del-btn bg-[#0167b4] text-3xl font-bold text-white px-5 py-2 my-4 rounded-2xl" data-id="${articles[i]._id }">${del_btn}</button>
              </div>
          </div>
      `;
        article_con.appendChild(articleElement);
  
        document.querySelectorAll('.del-btn').forEach(delBtn => {
          delBtn.addEventListener('click', function () {
            const articleId = this.getAttribute('data-id');
            const confirmDelete = confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟');
          
          if (confirmDelete) {
            deleteArticle(articleId);
            location.reload()
          }
          });
        });
      }
    }
  
  } catch (error) {
    console.error(error);
  }
  
}

// deleteArticle
function deleteArticle(articleId) {
  fetch(`${url}articles/${articleId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('حدث خطأ أثناء عملية الحذف');
      }
      return response.json();
    })
    .then(data => {
      console.log('تم حذف العنصر بنجاح:', data);
    })
    .catch(error => {
      console.error('خطأ في عملية الحذف:', error);
    });
}





document.addEventListener("DOMContentLoaded",async  function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  change_glass(localStorage.getItem("theme"))
  if (admin == "true") {
    await loadArticles();
    add_eles(lang);
    
  } else {
    login_form.classList.add("show-el")
    article_con.classList.add("hide-el")
    addButton.classList.add("hide-el")
  }
  loadTranslations();

  // change_dir(lang);

});