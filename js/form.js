document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  loadTranslations();
});
selectElement.addEventListener("change", function () {
  changeLanguage(this);
});

const toolbar = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
  ["link"],
];
var ar_body = new Quill("#ar_body", {
  theme: "snow",
  modules: {
    toolbar: toolbar,
  },
});

var fr_body = new Quill("#fr_body", {
  theme: "snow",
  modules: {
    toolbar: toolbar,
  },
});

var fileInput = document.getElementById("file-input");
var filePreview = document.getElementById("file-preview");

var dropzone = document.getElementById("file-upload");
dropzone.addEventListener("dragover", function (e) {
  e.preventDefault();
  dropzone.classList.add("drag-over");
});
dropzone.addEventListener("dragleave", function () {
  dropzone.classList.remove("drag-over");
});
dropzone.addEventListener("drop", function (e) {
  e.preventDefault();
  dropzone.classList.remove("drag-over");
  var files = e.dataTransfer.files;
  fileInput.files = files;
  var event = new Event("change");
  fileInput.dispatchEvent(event);
});

const send_btn = document.getElementById("send_btn");
let displayedImages = [];
let choosedImage;
let isUploading = false; 

document
  .getElementById("articleForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      let imagesData = new FormData(this);
      let imagesResponse = await sendImagesToServer(imagesData);
      const mainImage = await chooseMainImage(imagesResponse);
      const title_ar = document.getElementById("title_ar").value;
      const title_fr = document.getElementById("title_fr").value;
      const body_ar = ar_body.getText();
      const body_fr = fr_body.getText();
      const all_images = imagesResponse;
      console.log(title_ar, title_fr, body_ar, body_fr, mainImage, all_images);
      const response = await fetch("http://localhost:5000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title_ar,
          title_fr,
          body_ar,
          body_fr,
          mainImage,
          all_images,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("حدث خطأ:", error);
    }
  });

async function sendImagesToServer(images) {
  try {
    filePreview.innerHTML = "جارى رفع الملفات....";
    isUploading = true; 
    updateButtonState(); 
    const response = await fetch("http://localhost:5000/api/articles/upload", {
      method: "POST",
      body: images,
    });
    const imagesResponse = await response.json();
    console.log(imagesResponse);

    isUploading = false; 
    updateButtonState(); 
    return imagesResponse.uploadedUrls;
  } catch (error) {
    console.error("حدث خطأ أثناء إرسال الصور:", error);
    throw error;
  }
}

async function chooseMainImage(imagesResponse) {
  return new Promise(async (resolve) => {
    var files = imagesResponse;
    filePreview.innerHTML = "";
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var previewItem = document.createElement("div");
      previewItem.classList.add("p-3");
      var image = document.createElement("img");
      image.classList.add("file-preview-image");
      previewItem.appendChild(image);
      image.src = file;
      image.classList.add("uploaded_file");
      image.addEventListener("click", async function () {
        resolve(await chooseIt(image));
      });
      filePreview.appendChild(previewItem);
    }
  });
}
// فى غلطة بنت وسخه
async function chooseIt(image) {
  return new Promise((resolve) => {
    const allImages = document.querySelectorAll(".file-preview-image");
    allImages.forEach((otherImage) => {
      otherImage.style.border = "none";
    });
    image.style.border = "5px solid green";
    resolve(image.src);
  });
}

function updateButtonState() {
  send_btn.classList.add("cursor-not-allowed")
  if (isUploading) {
    send_btn.textContent = "جارى رفع الصور";
    send_btn.disabled = true;
  } else {
    send_btn.textContent = "اختر صورة رئيسية";
    send_btn.disabled = true;
  }
}
