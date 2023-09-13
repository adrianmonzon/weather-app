const getWeather = require("./../app");

describe("getWeather", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          main: {
            temp: 22.5,
            humidity: 50,
          },
          weather: [
            {
              main: "Clear",
            },
          ],
          name: "Madrid",
          wind: {
            speed: 5.0,
          },
        }),
    })
  );

  it("should fetch weather forecast data and update the interface", async () => {
    document.body.innerHTML = `
      <div class="weather__box1-temp"></div>
      <div class="weather__box1-desc"></div>
      <div class="weather__box1-city"></div>
      <div class="weather__box1-icon"></div>
      <div class="weather__box2-wind"></div>
      <div class="weather__box2-humidity"></div>
      <div class="weather__title"></div>
      <input class="input" value="Madrid" />
      <form class="form"></form>
      <div class="error-msg"></div>
    `;

    await getWeather(
      "https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=5d137132ffa91941fc403e066a4884d7"
    );

    expect(document.querySelector(".weather__box1-temp").textContent).toBe(
      "23 °C"
    );
    expect(document.querySelector(".weather__box1-desc").textContent).toBe(
      "Clear"
    );
    expect(document.querySelector(".weather__box1-city").textContent).toBe(
      "Madrid"
    );
    expect(document.querySelector(".weather__box2-wind").textContent).toBe(
      "5 m/s"
    );
    expect(document.querySelector(".weather__box2-humidity").textContent).toBe(
      "50 %"
    );
    expect(document.querySelector(".error-msg").style.display).toBe("none");
  });
});
