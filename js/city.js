const options = {
  timeZone: "Africa/Cairo",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};
const presentDay = new Date().toLocaleDateString("en-US", options);
const [month, day, year] = presentDay.split("/");
const queryParams = new URLSearchParams(window.location.search);
const stateName = queryParams.get("name");
const statelat = citiesData[stateName].lat;
const statelng = citiesData[stateName].lng;
const stateElement = document.getElementById("state_name");
stateElement.textContent = stateName;
function viewStateCities() {
  let lang = localStorage.getItem("lang");
  const citiesArray = citiesData[stateName].cities;
  const citiesContainer = document.querySelector(".cities-of-state");
  citiesContainer.innerHTML = "";
  citiesArray.forEach((city) => {
    const cityElement = document.createElement("span");
    cityElement.className =
      "text-black bg-gray-50 m-auto flex justify-center items-center font-bold h-[50px] border-2 rounded-lg text-center text-sm md:text-xl w-[100px] md:w-[180px] py-1 px-2";
    cityElement.textContent = lang == "ar" ? city.ar : city.en;
    cityElement.dataset.lat = city.lat;
    cityElement.dataset.lng = city.lng;
    cityElement.dataset.name = lang == "ar" ? city.ar : city.en;
    citiesContainer.appendChild(cityElement);
    cityElement.addEventListener("click", handleCityClick);
  });
}

// const today = new Date().toLocaleDateString('en-US', { weekday: 'numeric' });
const prayer_con = document.getElementById("prayer");
async function callAdanTime(lat, lng, lang) {
  prayer_con.innerHTML = "";
  prayer_con.classList.add(`${lang == "ar" ? "." : "flex-row-reverse"}`);
  const adan = await fetch(
    `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${lng}&method=2`
  );
  const adanData = await adan.json();
  const prayerTimings = adanData.data[day - 1].timings;
  const selectedPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  for (const prayerName of selectedPrayers) {
    const names =
      lang === "ar"
        ? ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"]
        : ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const prayerTime = prayerTimings[prayerName];
    const cleanedTime = prayerTime.replace(/\s*\(CET\)/, "");
    const time12h = new Date(`2023-12-04 ${cleanedTime}`).toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "numeric", hour12: true }
    );
    const prayerElement = `
      <div class="font-bold text-xl text-black p-3 w-[100px] h-[150px] flex flex-col justify-center items-center gap-3 rounded-3xl bg-white ">
        <p class="text-2xl" >${names[selectedPrayers.indexOf(prayerName)]}</p>
        <p dir="ltr" >${time12h}</p>
      </div>
    `;
    prayer_con.insertAdjacentHTML("beforeend", prayerElement);
  }
}

async function handleCityClick(event) {
  event.preventDefault();
  const lat = event.currentTarget.getAttribute("data-lat");
  const lng = event.currentTarget.getAttribute("data-lng");
  const city = event.currentTarget.getAttribute("data-name");
  lang = localStorage.getItem("lang");
  await callWeatherAPI(lat, lng, lang);
  await callAdanTime(lat, lng, lang);
  city_name.innerText = city;
}

// the main function that takes lat, lng and call api to get weather data
async function callWeatherAPI(lat, lng, lang) {
  try {
    const daysOfWeek = lang == "ar" ? daysOfWeekArabic : daysOfWeekFrench;
    const daysList = [];
    for (let i = 0; i < daysOfWeek.length; i++) {
      const dayIndex = (today + i) % daysOfWeek.length;
      daysList.push(daysOfWeek[dayIndex]);
    }
    // const days_cohosed = lang == "ar" ? daysOfWeekArabic : daysOfWeekFrench;
    const key = "bd5e378503939ddaee76f12ad7a97608";
    const units = "metric";
    const url =
      lang == "ar"
        ? `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=ar`
        : `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${key}&units=${units}&lang=fr`;
    const response = await fetch(url);
    if (!response.ok) {
      const weatherContainer = document.querySelector(".tol");
      weatherContainer.innerHTML = "errrrrrrrrrrr";
      throw new Error(`Failed to fetch weather data: ${response.status}`);
    }
    const data = await response.json();

    const weatherContainer = document.querySelector(".tol");
    weatherContainer.innerHTML = "";
    daysList.forEach((dayName, index) => {
      const day = data.daily[index];
      const dayElement = document.createElement("div");
      dayElement.classList.add(
        "flex",
        `${lang == "ar" ? "flex-row" : "flex-row-reverse"}`,
        "justify-around",
        "items-center",
        "w-[300px]",
        "gap-2",
        "h-[55px]"
      );
      // inner html for days list on homepage that shows days with weather data for each day
      dayElement.innerHTML = `
        <p class="text-2xl font-bold">${dayName}</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          class="w-[70px] h-[70ox] mx-4 " alt="${day.weather[0].description}"
        />
        <p dir="rtl" class=" text-bold text-2xl font-bold">${Math.round(day.temp.max)}&deg;</p>
        <p dir="rtl" class=" text-bold text-xl font-md">${Math.round(day.temp.min)}&deg;</p>
      `;
      weatherContainer.appendChild(dayElement);
    });
    const ariana_con = document.querySelector(".ariana_con");
    ariana_con.innerHTML = "";
    const firstDay = data.daily[0];
    // display weather data for main secion in home
    // display photo , change city name
    const ariana_w = `
      <h3 class="font-bold text-2xl md:text-4xl font-md">${
        firstDay.weather[0].description
      }</h3>
      <p dir="rtl" class="font-bold text-2xl md:text-4xl font-md">${
        Math.round(firstDay.temp.max)
      }&deg;C</p>
      <p class="text-xl font-bold">${new Date(
        firstDay.dt * 1000
      ).toLocaleDateString("fr-FR")}</p>
    `;
    ariana_con.innerHTML += ariana_w;
    document.querySelector(
      ".img"
    ).src = `http://openweathermap.org/img/wn/${firstDay.weather[0].icon}@4x.png`;
  } catch (error) {
    console.error("err", error);
    const ariana_con = document.querySelector(".ariana_con");
    const weatherContainer = document.querySelector(".tol");
    let err_msg =
      lang == "ar"
        ? `
    <div class="w-full font-bold text-2xl text-center flex flex-col justify-center items-center ">
      <p >حدث خطأ ولم نتمكن من جلب البيانات</p>
      <p>رجاء اعد تحميل الصفحة</p>
      <p>اذا استمرت المشكلة فتواصل معنا</p>
  </div>`
        : `
    <div class="w-full font-bold text-2xl text-center flex flex-col justify-center items-center ">
      <p > Une erreur s'est produite et nous n'avons pas pu récupérer les données</p>
      <p>Veuillez recharger la page & Si le problème persiste, contactez-nous</p>
  </div>`;
    weatherContainer.innerHTML = err_msg;
    ariana_con.innerHTML = err_msg;
  }
}



selectElement.addEventListener("change", function () {
  changeLanguage(this);
  change_dir(localStorage.getItem("lang"));
  viewStateCities();
  callWeatherAPI(statelat, statelng, localStorage.getItem("lang"));
  callAdanTime(statelat, statelng, localStorage.getItem("lang"));
  city_name.innerText = stateName;
});

document.addEventListener("DOMContentLoaded", function () {
  lang = localStorage.getItem("lang") || "ar";
  theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  if (lang) {
    selectElement.value = lang;
  }
  loadTranslations();
  change_dir(lang);
  viewStateCities();

  callWeatherAPI(statelat, statelng, lang);
  callAdanTime(statelat, statelng, lang);
  city_name.innerText = stateName;
});

let fields = document.querySelectorAll(".field");

function change_dir(lang) {
  fields.forEach((field) => {
    if (lang === "ar") {
      field.classList.add("items-start");
      field.classList.remove("items-end");
    } else {
      field.classList.remove("items-start");
      field.classList.add("items-end");
    }
  });
}
