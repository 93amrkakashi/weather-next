(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const r of t.addedNodes)
          r.tagName === "LINK" && r.rel === "modulepreload" && n(r);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = a(e);
    fetch(e.href, t);
  }
})();
var f = {
  ALLUSERSPROFILE: "C:\\ProgramData",
  APPDATA: "C:\\Users\\Administrator\\AppData\\Roaming",
  CHROME_CRASHPAD_PIPE_NAME: "\\\\.\\pipe\\crashpad_224_XMCMYQFMUIXKPVES",
  COLOR: "1",
  COLORTERM: "truecolor",
  CommonProgramFiles: "C:\\Program Files\\Common Files",
  "CommonProgramFiles(x86)": "C:\\Program Files (x86)\\Common Files",
  CommonProgramW6432: "C:\\Program Files\\Common Files",
  COMPUTERNAME: "WIN-IMQ6SRA8HRM",
  ComSpec: "C:\\Windows\\system32\\cmd.exe",
  DriverData: "C:\\Windows\\System32\\Drivers\\DriverData",
  EDITOR: "C:\\Windows\\notepad.exe",
  FPS_BROWSER_APP_PROFILE_STRING: "Internet Explorer",
  FPS_BROWSER_USER_PROFILE_STRING: "Default",
  GIT_ASKPASS:
    "c:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass.sh",
  GOOGLE_KEY: "AIzaSyDjjZzMmPfqAB8xbfhXhr2yiEaJ8n5EiDg",
  HOME: "C:\\Users\\Administrator",
  HOMEDRIVE: "C:",
  HOMEPATH: "\\Users\\Administrator",
  INIT_CWD: "C:\\Users\\Administrator\\Desktop\\kk\\weather-vite",
  LANG: "en_US.UTF-8",
  LOCALAPPDATA: "C:\\Users\\Administrator\\AppData\\Local",
  LOGONSERVER: "\\\\WIN-IMQ6SRA8HRM",
  NODE: "C:\\Program Files\\nodejs\\node.exe",
  NODE_ENV: "production",
  NODE_EXE: "C:\\Program Files\\nodejs\\\\node.exe",
  NPM_CLI_JS: "C:\\Program Files\\nodejs\\\\node_modules\\npm\\bin\\npm-cli.js",
  npm_command: "run-script",
  npm_config_cache: "C:\\Users\\Administrator\\AppData\\Local\\npm-cache",
  npm_config_globalconfig:
    "C:\\Users\\Administrator\\AppData\\Roaming\\npm\\etc\\npmrc",
  npm_config_global_prefix: "C:\\Users\\Administrator\\AppData\\Roaming\\npm",
  npm_config_init_module: "C:\\Users\\Administrator\\.npm-init.js",
  npm_config_local_prefix:
    "C:\\Users\\Administrator\\Desktop\\kk\\weather-vite",
  npm_config_node_gyp:
    "C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js",
  npm_config_noproxy: "",
  npm_config_npm_version: "10.1.0",
  npm_config_prefix: "C:\\Users\\Administrator\\AppData\\Roaming\\npm",
  npm_config_userconfig: "C:\\Users\\Administrator\\.npmrc",
  npm_config_user_agent: "npm/10.1.0 node/v20.9.0 win32 x64 workspaces/false",
  npm_execpath: "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js",
  npm_lifecycle_event: "build",
  npm_lifecycle_script: "vite build",
  npm_node_execpath: "C:\\Program Files\\nodejs\\node.exe",
  npm_package_json:
    "C:\\Users\\Administrator\\Desktop\\kk\\weather-vite\\package.json",
  npm_package_name: "kk",
  npm_package_version: "0.0.0",
  NPM_PREFIX_NPM_CLI_JS:
    "C:\\Users\\Administrator\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js",
  NUMBER_OF_PROCESSORS: "2",
  ORIGINAL_XDG_CURRENT_DESKTOP: "undefined",
  OS: "Windows_NT",
  Path: "C:\\Users\\Administrator\\Desktop\\kk\\weather-vite\\node_modules\\.bin;C:\\Users\\Administrator\\Desktop\\kk\\node_modules\\.bin;C:\\Users\\Administrator\\Desktop\\node_modules\\.bin;C:\\Users\\Administrator\\node_modules\\.bin;C:\\Users\\node_modules\\.bin;C:\\node_modules\\.bin;C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\@npmcli\\run-script\\lib\\node-gyp-bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\;C:\\Windows\\System32\\OpenSSH\\;C:\\Program Files\\Git\\cmd;C:\\Users\\Administrator\\AppData\\Local\\Android\\Sdk;C:\\Program Files\\nodejs\\;C:\\Users\\Administrator\\AppData\\Local\\Programs\\Python\\Python311\\Scripts\\;C:\\Users\\Administrator\\AppData\\Local\\Programs\\Python\\Python311\\;C:\\Users\\Administrator\\AppData\\Local\\Microsoft\\WindowsApps;C:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Users\\Administrator\\AppData\\Local\\Android\\Sdk;C:\\Users\\Administrator\\AppData\\Roaming\\npm",
  PATHEXT: ".COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC",
  PROCESSOR_ARCHITECTURE: "AMD64",
  PROCESSOR_IDENTIFIER: "Intel64 Family 15 Model 6 Stepping 5, GenuineIntel",
  PROCESSOR_LEVEL: "15",
  PROCESSOR_REVISION: "0605",
  ProgramData: "C:\\ProgramData",
  ProgramFiles: "C:\\Program Files",
  "ProgramFiles(x86)": "C:\\Program Files (x86)",
  ProgramW6432: "C:\\Program Files",
  PROMPT: "$P$G",
  PSModulePath:
    "C:\\Program Files\\WindowsPowerShell\\Modules;C:\\Windows\\system32\\WindowsPowerShell\\v1.0\\Modules",
  PUBLIC: "C:\\Users\\Public",
  SESSIONNAME: "Console",
  SystemDrive: "C:",
  SystemRoot: "C:\\Windows",
  TEMP: "C:\\Users\\ADMINI~1\\AppData\\Local\\Temp",
  TERM_PROGRAM: "vscode",
  TERM_PROGRAM_VERSION: "1.84.2",
  TMP: "C:\\Users\\ADMINI~1\\AppData\\Local\\Temp",
  USERDOMAIN: "WIN-IMQ6SRA8HRM",
  USERDOMAIN_ROAMINGPROFILE: "WIN-IMQ6SRA8HRM",
  USERNAME: "Administrator",
  USERPROFILE: "C:\\Users\\Administrator",
  VSCODE_GIT_ASKPASS_EXTRA_ARGS: "--ms-enable-electron-run-as-node",
  VSCODE_GIT_ASKPASS_MAIN:
    "c:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\resources\\app\\extensions\\git\\dist\\askpass-main.js",
  VSCODE_GIT_ASKPASS_NODE:
    "C:\\Users\\Administrator\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe",
  VSCODE_GIT_IPC_HANDLE: "\\\\.\\pipe\\vscode-git-733ec00dfa-sock",
  WEATHER_KEY: "bd5e378503939ddaee76f12ad7a97608",
  windir: "C:\\Windows",
};
const P = f.WEATHER_KEY,
  h = f.GOOGLE_KEY;
function R() {
  const o = document.createElement("script");
  (o.src = `https://maps.googleapis.com/maps/api/js?key=${h}&callback=initMap`),
    (o.defer = !0),
    document.head.appendChild(o);
}
window.initMap = function () {
  const o = document.getElementById("googleMap"),
    s = new google.maps.Map(o, {
      center: { lat: 33.8869, lng: 9.5375 },
      zoom: 8,
    });
  google.maps.event.addListener(s, "click", async function (a) {
    const n = a.latLng.lat(),
      e = a.latLng.lng(),
      t = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${n}&lon=${e}`;
    try {
      const r = await fetch(t);
      if (!r.ok) throw new Error(`Failed to fetch location data: ${r.status}`);
      const l = (await r.json()).address.county;
      let d = localStorage.getItem("lang");
      await S(n, e, d), (city_name.innerText = l);
      const g = new google.maps.Marker({
        position: { lat: n, lng: e },
        map: s,
        title: `الطقس في ${n}, ${e}`,
      });
    } catch (r) {
      console.error("error", r);
    }
  });
};
R();
selectElement.addEventListener("change", function () {
  changeLanguage(this), A();
});
async function A() {
  "geolocation" in navigator
    ? navigator.geolocation.getCurrentPosition(
        async function (o) {
          const s = o.coords.latitude,
            a = o.coords.longitude;
          let n = localStorage.getItem("lang");
          await S(s, a, n);
          const e = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${s}&lon=${a}`;
          try {
            const t = await fetch(e);
            if (!t.ok)
              throw new Error(`Failed to fetch location data: ${t.status}`);
            const r = await t.json(),
              c = r.address.county;
            city_name.innerText = c ?? r.address.town;
          } catch (t) {
            console.error("error", t);
          }
        },
        function (o) {
          console.error("err", o.message);
        }
      )
    : console.error("Geolocation is not supported");
}
async function S(o, s, a) {
  try {
    const n = a == "ar" ? daysOfWeekArabic : daysOfWeekFrench,
      e = [];
    for (let i = 0; i < n.length; i++) {
      const _ = (today + i) % n.length;
      e.push(n[_]);
    }
    const t = P,
      r = "metric",
      c =
        a == "ar"
          ? `https://api.openweathermap.org/data/2.5/onecall?lat=${o}&lon=${s}&appid=${t}&units=${r}&lang=ar`
          : `https://api.openweathermap.org/data/2.5/onecall?lat=${o}&lon=${s}&appid=${t}&units=${r}&lang=fr`,
      l = await fetch(c);
    if (!l.ok) {
      const i = document.querySelector(".tol");
      throw (
        ((i.innerHTML = "errrrrrrrrrrr"),
        new Error(`Failed to fetch weather data: ${l.status}`))
      );
    }
    const d = await l.json(),
      g = document.querySelector(".tol");
    (g.innerHTML = ""),
      e.forEach((i, _) => {
        const p = d.daily[_],
          u = document.createElement("div");
        u.classList.add(
          "flex",
          `${a == "ar" ? "flex-row" : "flex-row-reverse"}`,
          "justify-around",
          "items-center",
          "w-[300px]",
          "gap-2",
          "h-[55px]"
        ),
          (u.innerHTML = `
        <p class="text-2xl font-bold">${i}</p>
        <img src="http://openweathermap.org/img/wn/${p.weather[0].icon}@4x.png"
          class="w-[70px] h-[70ox] mx-4 " alt="${p.weather[0].description}"
        />
        <p dir="rtl" class=" text-bold text-2xl font-bold">${Math.round(p.temp.max)}&deg;</p>
        <p dir="rtl" class=" text-bold text-xl font-md">${Math.round(p.temp.min)}&deg;</p>
      `),
          g.appendChild(u);
      });
    const C = document.querySelector(".ariana_con");
    C.innerHTML = "";
    const m = d.daily[0],
      E = `
      <h3 class="font-bold text-2xl md:text-4xl font-md">${
        m.weather[0].description
      }</h3>
      <p dir="rtl" class="font-bold text-2xl md:text-4xl font-md">${
        Math.round(m.temp.max)
      }&deg;C</p>
      <p class="text-xl font-bold">${new Date(m.dt * 1e3).toLocaleDateString(
        "fr-FR"
      )}</p>
    `;
    (C.innerHTML += E),
      (document.querySelector(
        ".img"
      ).src = `http://openweathermap.org/img/wn/${m.weather[0].icon}@4x.png`);
  } catch (n) {
    console.error("err", n);
    const e = document.querySelector(".ariana_con"),
      t = document.querySelector(".tol");
    let r =
      a == "ar"
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
    (t.innerHTML = r), (e.innerHTML = r);
  }
}
document.addEventListener("DOMContentLoaded", async function () {
  let o = localStorage.getItem("lang") || "ar",
    s = localStorage.getItem("theme") || "light";
  mainContainer.classList.add(s),
    populateCities(o),
    o && (selectElement.value = o),
    await loadTranslations(),
    await A();
});
