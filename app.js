const key = "5d137132ffa91941fc403e066a4884d7";

window.addEventListener("load", () => {
  const tempValue = document.querySelector(".weather__box1-temp");
  const tempDesc = document.querySelector(".weather__box1-desc");
  const city = document.querySelector(".weather__box1-city");
  const icon = document.querySelector(".weather__box1-icon");
  const windSpeed = document.querySelector(".weather__box2-wind");
  const humidity = document.querySelector(".weather__box2-humidity");
  const title = document.querySelector(".weather__title");
  const input = document.querySelector(".input");
  const form = document.querySelector(".form");
  const errorMsg = document.querySelector(".error-msg");

  const getWeather = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const temp = Math.round(data.main.temp);
      const desc = data.weather[0].main;
      tempValue.textContent = `${temp} °C`;
      tempDesc.textContent = desc;
      city.textContent = data.name;
      title.textContent = `Weather in: ${city.textContent}`;
      windSpeed.textContent = `${data.wind.speed} m/s`;
      humidity.textContent = `${data.main.humidity} %`;
      errorMsg.style.display = "none";

      switch (data.weather[0].main) {
        case "Thunderstorm":
          icon.src = "icons/thunder.svg";
          break;
        case "Drizzle":
          icon.src = "icons/rainy-2.svg";
          break;
        case "Rain":
          icon.src = "icons/rainy-7.svg";
          break;
        case "Snow":
          icon.src = "icons/snowy-6.svg";
          break;
        case "Clear":
          icon.src = "icons/day.svg";
          break;
        case "Atmosphere":
          icon.src = "icons/weather.svg";
          break;
        case "Clouds":
          icon.src = "icons/cloudy-day-1.svg";
          break;
        default:
          icon.src = "icons/cloudy-day-1.svg";
      }
    } catch (error) {
      console.error("There was an error", error);
      errorMsg.style.display = "block";
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      const geolocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=es&units=metric`;
      getWeather(geolocationUrl);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = input.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&lang=es&units=metric&appid=${key}`;
    getWeather(url);
    input.value = "";
  });
});
