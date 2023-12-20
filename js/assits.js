loadLayout()
// http://localhost:5000/api/
const url = `https://weather-server-gules.vercel.app/api/`
// const url = `http://localhost:5000/api/`
const stateNames = Object.keys(citiesData);
const citiesArray = stateNames;
const selectElement = document.getElementById("languageSelect");
// constant vars
let translations = {};
const themeToggleBtn = document.querySelector(".theme_toggler");
let glass_element = document.querySelectorAll(".glass");
const city_name = document.querySelector(".city_name");
const footerTextElement = document.getElementById("footerText");
const currentYear = new Date().getFullYear();
footerTextElement.textContent = `meteo-Tunisie.net © ! أفضل معلومات الطقس. ${currentYear}!`;
const searchResultsElement = document.getElementById("searchResults");
const mainContainer = document.querySelector("body");
const toggleBtn = document.querySelector("#navbar-toggle");
const collapse = document.querySelector("#navbar-collapse");
const searchInput = document.getElementById('searchInput');

const weatherContainer = document.querySelector(".tol");
const daysOfWeekArabic = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const daysOfWeekFrench = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];
const daysOfWeek = daysOfWeekFrench;
const currentURL = new URL(window.location.href);
const parameters = extractParametersFromURL(currentURL);
const today = new Date().getDay();
const daysList = [];


for (let i = 0; i < daysOfWeek.length; i++) {
  const dayIndex = (today + i) % daysOfWeek.length;
  daysList.push(daysOfWeek[dayIndex]);
}



// collapse navbar
toggleBtn.onclick = () => {
  collapse.classList.toggle("hidden");
  collapse.classList.toggle("flex");
};


function loadLayout() {
  loadNavbar()
  loadFooter()
}

function loadNavbar() {
  let navbar = document.getElementById("navbar")
  navbar.innerHTML  = ""
  let content = `
  <div class="w-full md:flex md:justify-between">
  <div class="flex justify-between items-center">
    <a class="logo navbar-btn" href="./index.html" title=" ">
      <img src="images/logoo.svg" alt="logo">
    </a>
    <button class="text-3xl md:hidden" id="navbar-toggle">
      <i class="fas fa-bars"></i>
    </button>
  </div>
  <div class="hidden md:flex flex-col md:flex-row items-center gap-6 mt-3 md:mt-0 md:justify-between md:w-[85%] "
    id="navbar-collapse">
    <ul class="flex justify-center items-center flex-col md:flex-row gap-5 ">
    <a href="./index.html" data-translation="nav2" class="nav text-2xl font-bold p-2 "></a>
      <a href="./sat.html" data-translation="nav1" class="nav  text-2xl font-bold p-2 "></a>
      <a href="./articles.html" data-translation="nav3" class="nav text-2xl font-bold p-2 "></a>
    </ul>
    <!-- search -->
    <div class="searchbar relative ">
      <div class="searchbar-wrapper">
        <div class="searchbar-left">
          <div class="search-icon-wrapper">
            <span class="search-icon searchbar-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                </path>
              </svg>
            </span>
          </div>
        </div>
        <div class="searchbar-center">
          <div class="searchbar-input-spacer"></div>
          <input type="text" class="searchbar-input" maxlength="2048" name="q" autocapitalize="off"
            autocomplete="off" title="Search" role="combobox" placeholder="ابحث عن مدينة ......"
            id="searchInput" />
        </div>
      </div>
      <ul id="searchResults" class="search-results" style="display: none;">
        <li></li>
      </ul>
    </div>
    <label class="theme-switch">
      <input type="checkbox" class="theme-switch__checkbox theme_toggler">
      <div class="theme-switch__container">
        <div class="theme-switch__clouds"></div>
        <div class="theme-switch__stars-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z"
              fill="currentColor"></path>
          </svg>
        </div>
        <div class="theme-switch__circle-container">
          <div class="theme-switch__sun-moon-container">
            <div class="theme-switch__moon">
              <div class="theme-switch__spot"></div>
              <div class="theme-switch__spot"></div>
              <div class="theme-switch__spot"></div>
            </div>
          </div>
        </div>
      </div>
    </label>
    <select id="languageSelect" class="bg-[#0167b4] max-w-[130px] h-[40px] rounded-3xl text-white px-3"
      >
      <option value="ar" class="px-12 text-lg font-bold p-2 lg:px-4 md:mx-2 text-white">العربية</option>
      <option value="fr" class="px-12 text-lg font-bold p-2 lg:px-4 md:mx-2 text-white">Français</option>
    </select>
  </div>
</div>
  `
  navbar.innerHTML  = content
}

function loadFooter() {
  let foooter = document.getElementById("foooter")
  foooter.innerHTML  = ""
  let content =  `  
  <div class="w-[90%] md:w-[40%] flex flex-col justify-around items-center gap-4">
  <div class="navs text-lg flex justify-around items-center gap-5">
    <a data-translation="con1" href="./contact.html"> </a>
    <a data-translation="con2" href="./Politique.html"> </a>
    <a data-translation="con3" href="./condetions.html"> </a>
  </div>
  <div class="social flex justify-around items-center gap-4 w-[40%] text-3xl">
    <i class="fa-brands fa-instagram"></i>
    <i class="fa-brands fa-facebook-f"></i>
    <i class="fa-brands fa-twitter"></i>
  </div>
  <div class="copy">
    <p class="text-lg" id="footerText"></p>
  </div>
</div>
`
foooter.innerHTML  = content
}


// to perform a search and choose a city
searchInput.addEventListener('input', function() {
    const text = this.value;
    if (!text.length <= 0) {
        const results = filterCities(text);
        displayResults(results);
    } else {
        searchResultsElement.style.display = "none";
    }
});
function filterCities(text) {
  text = text.toLowerCase();
  return citiesArray.filter((city_name) =>
    city_name.toLowerCase().includes(text)
  )
}
function displayResults(results) {
  searchResultsElement.innerHTML = "";
  results.forEach((result) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <a href="/city?name=${result}"
    class="inline-block w-full  result_item" >
    ${result}
    </a>`;
    searchResultsElement.appendChild(listItem);
  });
  searchResultsElement.style.display = results.length > 0 ? "flex" : "none";
}


// get url params so that can get weather for selected cities in other pages
function extractParametersFromURL(url) {
  const urlSearchParams = new URLSearchParams(url.search);
  const lat = urlSearchParams.get("lat");
  const lng = urlSearchParams.get("lng");
  const city = urlSearchParams.get("city");
  return { lat, lng, city };
}


// to change language ==> getting translations and change page content
function changeLanguage(selectElement) {
  const selectedValue =
    selectElement.value || localStorage.getItem("lang") || "ar";
  document.documentElement.lang = selectedValue;
  localStorage.setItem("lang", selectedValue);
// تغيير الترجمات الموجودة
  const elements = document.querySelectorAll("[data-translation]");
  elements.forEach((element) => {
    const translationKey = element.dataset.translation;
    element.textContent = translations_js[selectedValue][translationKey] || "";
  });
}


// to load translations file
// اجيب الترجمات واغير لغة الموقع
async function loadTranslations() {
  let lang = localStorage.getItem("lang") || "ar"
  changeLanguage(lang);
  // try {
  //   const response = await fetch("./translations.json");
  //   if (!response.ok) {
  //     throw new Error(`Failed to load translations: ${response.status}`);
  //   }
  //   translations = await response.json();
  
  //   console.log(translations);
  // } catch (error) {
  //   console.error("Error loading translations:", error);
  // }
}



// to change page theme
themeToggleBtn.addEventListener("click", changeTheme);

function change_glass(theme) {
  if (theme == "dark") {
    glass_element.forEach(function (element) {
      element.classList.add("glass_dark");
      element.classList.remove("glass_light");
    });
  } else {
    glass_element.forEach(function (element) {
      element.classList.add("glass_light");
      element.classList.remove("glass_dark");
    });
  }
}

change_glass(localStorage.getItem("theme"));

function changeTheme() {
  if (mainContainer.classList.contains("light")) {
    mainContainer.classList.add("dark");
    mainContainer.classList.remove("light");
    localStorage.setItem("theme", "dark");
    change_glass("dark");
  } else {
    mainContainer.classList.add("light");
    mainContainer.classList.remove("dark");
    localStorage.setItem("theme", "light");
    change_glass("light");
  }
}


function populateCities() {
  const citiesList = document.getElementById("citiesList");
  citiesList.innerHTML = "";
  citiesArray.forEach((city) => {
    const cityElement = document.createElement("a");
    cityElement.href = `/city?name=${city}`;
    cityElement.id = "city";
    cityElement.className = "bg-gray-50 m-auto flex justify-center items-center font-bold h-[50px] border-2 rounded-lg text-center text-sm md:text-xl w-[100px] md:w-[200px] py-1 px-2";
    const spanElement = document.createElement("span");
    spanElement.className = "w-full text-black";
    spanElement.textContent = city;
    cityElement.appendChild(spanElement);
    citiesList.appendChild(cityElement);
  });
}


const loaderHtml = `
    <div class="loader_con w-[100vw] h-[100vh] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center glass ">
      <div class="loader"></div>
    </div>
`

// getting a random city from cities list to show weather data
// function getRandomCity(lang) {
//   if (lang === "ar") {
//     const randomIndex = Math.floor(Math.random() * arTun.length);
//     callWeatherAPI(arTun[randomIndex].lat, arTun[randomIndex].lng, lang);
//     city_name.innerText = arTun[randomIndex].city;
//     return arTun[randomIndex];
//   } else {
//     const randomIndex = Math.floor(Math.random() * frTun.length);
//     callWeatherAPI(frTun[randomIndex].lat, frTun[randomIndex].lng, lang);
//     city_name.innerText = frTun[randomIndex].city;
//     return arTun[randomIndex];
//   }
// }