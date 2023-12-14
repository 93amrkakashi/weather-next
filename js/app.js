const weatherKey = process.env.WEATHER_KEY;
const googleMapsApiKey = process.env.GOOGLE_KEY;


function loadGoogleMapsScript() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
  script.defer = true;
  document.head.appendChild(script);
}

window.initMap = function () {
  const mapElement = document.getElementById("googleMap");
  const map = new google.maps.Map(mapElement, {
    center: { lat: 33.8869, lng: 9.5375 },
    zoom: 8,
  });

  google.maps.event.addListener(map, "click", async function (event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try {
      const response = await fetch(geocodingUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch location data: ${response.status}`);
      }

      const data = await response.json();
      const city = data.address.county;

      let lang = localStorage.getItem("lang");
      await callWeatherAPI(lat, lng, lang);
      city_name.innerText = city;

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: `الطقس في ${lat}, ${lng}`,
      });
    } catch (error) {
      console.error("error", error);
    }
  });
};

loadGoogleMapsScript();


selectElement.addEventListener("change", function () {
  changeLanguage(this);
  getInitialLocation()
});

// to get initial location of user ==> to get weather in this location
async function getInitialLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        let lang = localStorage.getItem("lang");
        await callWeatherAPI(lat, lng, lang);
        const geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
        try {
          const response = await fetch(geocodingUrl);
          if (!response.ok) {
            throw new Error(`Failed to fetch location data: ${response.status}`);
          }
          const data = await response.json();
          const city = data.address.county;
          city_name.innerText = city == undefined ? data.address.town: city;
        } catch (error) {
          console.error("error", error);
        }
      },
      function (error) {
        console.error("err", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported");
  }
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
    const key = weatherKey;
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
        <p class="text-xl font-bold">${dayName}</p>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"
          class="w-[70px] h-[70ox] mx-4 " alt="${day.weather[0].description}"
        />
        <p dir="rtl" class=" text-bold text-lg font-bold">${day.temp.max}&deg;</p>
        <p dir="rtl" class=" text-bold text-md font-md">${day.temp.min}&deg;</p>
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
        firstDay.temp.max
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

async function handleCityClick(event) {
  event.preventDefault();
  const lat = event.currentTarget.getAttribute("data-lat");
  const lng = event.currentTarget.getAttribute("data-lng");
  const city = event.currentTarget.getAttribute("data-name");

  await callWeatherAPI(lat, lng);
  city_name.innerText = city;
}



// main function that invokes ther functions
document.addEventListener("DOMContentLoaded", async function () {
  let lang = localStorage.getItem("lang") || "ar";
  let theme = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(theme);
  populateCities(lang);
  if (lang) {
    selectElement.value = lang;
  }
  await loadTranslations();
  await getInitialLocation();
});



