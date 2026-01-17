// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=38f6b59b09717509d37b79ea07a70f07


import axios from "axios";
import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import bgImg from "./assets/bg3.jpg"

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = "38f6b59b09717509d37b79ea07a70f07";

  const fetchWeather = async (city) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = res.data;
      const today = data.list[0];
      console.log(data);

      setWeather({
        city: data.city.name,
        temp: today.main.temp,
        desc: today.weather[0].description,
        humidity: today.main.humidity,
        wind: today.wind.speed,
        pressure: today.main.pressure,
      });


      // Filter forecast for next 5 days (one per day)
      const daily = data.list.filter((item) => item.dt_txt.includes("12:00:00")).map((day) => ({
        date: new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(day.main.temp),
        desc: day.weather[0].description,
        icon: day.weather[0].icon,
      }));

      setForecast(daily);
    } catch (error) {
      alert("City not found!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="min-h-screen  flex flex-col items-center ">
        <div className="flex w-full items-center justify-between bg-blue-200 px-10 py-5 fixed z-90 ">
          <h1 className="text-blue-500 text-2xl font-bold ">🌤️ ClimateTrack</h1>
          <SearchBox onSearch={fetchWeather} />
        </div>
        {loading ? (
          <p className="text-black mt-6">Loading...</p>
        ) : (
          <>
            <WeatherCard weather={weather} />
            <ForecastList forecast={forecast} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;