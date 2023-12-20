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

let fileInput = document.getElementById("file-input");
let filePreview = document.getElementById("file-preview");
let dropzone = document.getElementById("file-upload");

let mainImageInput = document.getElementById("mainimagee");
let mainImagePreview = document.getElementById("main_image_p");
let main_image_z = document.getElementById("main_image_z");

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
  displayDroppedImages(files,filePreview, fileInput)
});

main_image_z.addEventListener("dragover", function (e) {
  e.preventDefault();
  main_image_z.classList.add("drag-over");
});
main_image_z.addEventListener("dragleave", function () {
  main_image_z.classList.remove("drag-over");
});
main_image_z.addEventListener("drop", function (e) {
  e.preventDefault();
  main_image_z.classList.remove("drag-over");
  var files = e.dataTransfer.files;
  mainImageInput.files = files;
  var event = new Event("change");
  mainImageInput.dispatchEvent(event);
  displayDroppedImages(files,mainImagePreview, mainImageInput)
});

function displayDroppedImages(files, filePreviewer, fileInput, local=true) {
  filePreviewer.innerHTML = "";
  Array.from(files).forEach((file, index) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      var imageElement = document.createElement("img");
      imageElement.src = e.target.result;
      imageElement.alt = `Image ${index + 1}`;
      imageElement.classList.add("preview-image");
      imageContainer.appendChild(imageElement);
      var deleteButton = document.createElement("button");
      deleteButton.innerText = "X";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", function () {
        filePreviewer.removeChild(imageContainer);
        var currentFiles = Array.from(fileInput.files);
        currentFiles.splice(index, 1);
        var dataTransfer = new DataTransfer();
        currentFiles.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
        console.log(fileInput.files)
        console.log(currentFiles)
      });
      imageContainer.appendChild(deleteButton);
      filePreviewer.appendChild(imageContainer);
    };
    if (local) {
      reader.readAsDataURL(file);
    } else {
      console.log(file)
      var imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      var imageElement = document.createElement("img");
      imageElement.src = file;
      imageElement.alt = `Image from the web`;
      imageElement.classList.add("preview-image");
      imageContainer.appendChild(imageElement);
      var deleteButton = document.createElement("button");
      deleteButton.innerText = "X";
      deleteButton.id = `article_images/${file.split('article_images/')[1].split('.')[0]}`;
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", function () {
        filePreviewer.removeChild(imageContainer);
        deleteImage(`article_images/${file.split('article_images/')[1].split('.')[0]}`)
      });
      imageContainer.appendChild(deleteButton);
      filePreviewer.appendChild(imageContainer);
    }
  });
}


function deleteImage(id) {
  fetch(`${url}articles/deleteimage`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageId: id }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('فشل في حذف الصورة');
      }
      return response.json();
    })
    .then(data => {
      console.log('تم حذف الصورة بنجاح:', data.message);
      setEditMode()
    })
    .catch(error => {
      console.error('حدث خطأ أثناء حذف الصورة:', error.message);
    });
}


const send_btn = document.getElementById("send_btn");
let the_form = document.getElementById("articleForm");

send_btn.addEventListener("click", async function (event) {
  event.preventDefault();
  try {
    let imagesResponse = await sendImagesToServer();
    const mainImage = await uploadFile();
    const title_ar = document.getElementById("title_ar").value;
    const title_fr = document.getElementById("title_fr").value;
    const body_ar = JSON.stringify(ar_body.getContents());
    const body_fr = JSON.stringify(fr_body.getContents());
    const all_images = imagesResponse;
    console.log(title_ar, title_fr, body_ar, body_fr, mainImage, all_images);
    const response = await fetch(`${url}articles`, {
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
    window.location.assign("./dash.html")
  } catch (error) {
    console.error("حدث خطأ:", error);
  }
});

async function sendImagesToServer() {
  try {
    var fileInput = document.getElementById("file-input");
    var files = fileInput.files;
    var formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append(`images`, file);
    });
    const response = await fetch(`${url}articles/uploadimages`, {
      method: "POST",
      body: formData,
    });
    const imagesResponse = await response.json();
    return imagesResponse.uploadedUrls;
  } catch (error) {
    console.error("حدث خطأ أثناء إرسال الصور:", error);
    throw error;
  }
}

async function uploadFile() {
  try {
    var fileInput = document.getElementById("mainimagee");
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("mainimagee", file);
    const response = await fetch(`${url}articles/upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("حدث خطأ في رفع الملف.");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("خطأ في رفع الملف:", error);
    throw error;
  }
}

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id);

async function loadArticle() {
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
}

async function setEditMode() {
  let data = await loadArticle();
  let title_ar = document.getElementById("title_ar");
  let title_fr = document.getElementById("title_fr");
  let body_ar = ar_body.getText();
  let body_fr = fr_body.getText();
  title_ar.value = data.title_ar;
  title_fr.value = data.title_fr;
  ar_body.setContents(JSON.parse(data.body_ar));
  fr_body.setContents(JSON.parse(data.body_fr));
  displayDroppedImages(data.all_images, filePreview, fileInput,false)
  // displayDroppedImages(data.mainImage, mainImagePreview, mainImageInput,false)
}

document.addEventListener("DOMContentLoaded", async function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  loadTranslations();
  if (id) {
    await setEditMode();
  }
});
