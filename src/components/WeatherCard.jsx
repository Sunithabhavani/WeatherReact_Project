import { useState, useEffect } from "react";
import SunWithClouds from "../assets/sun-with-cloud.png";
import Winter from "../assets/winter.png";
import Rain from "../assets/rain.png";
import Summer from "../assets/summer.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import pressure from "../assets/pressure.png"


const WeatherCard = ({ weather }) => {
    const [date] = useState(new Date());
    const [weatherImage, setWeatherImage] = useState(SunWithClouds);

    useEffect(() => {
        if (!weather) return;

        const desc = weather.desc.toLowerCase();

        if (desc.includes("rain")) {
            setWeatherImage(Rain);
        } else if (desc.includes("snow")) {
            setWeatherImage(Winter);
        } else if (desc.includes("clear")) {
            setWeatherImage(Summer) ;
        } else if (desc.includes("cloud")) {
            setWeatherImage(SunWithClouds);
        } else {
            setWeatherImage(SunWithClouds);
        }
    }, [weather]);

    if (!weather) {
        return (
            <div className="mt-28 text-center text-white text-2xl">
                Search for a city to see weather 🌤️
            </div>
        );
    }

    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    // Dynamic background classes
    const bgClasses = weatherImage === Rain
        ? "bg-gradient-to-br from-gray-600 to-blue-800"
        : weatherImage === Winter
        ? "bg-gradient-to-br from-blue-100 to-white"
        : weatherImage === Summer
        ? "bg-gradient-to-br from-yellow-300 to-orange-400"
        : "bg-gradient-to-br from-blue-400 to-indigo-500";

    return (
        <div className={`${bgClasses} w-full max-w-6xl rounded-xl shadow-xl p-7 text-white transition-colors duration-500 mt-28`}>
            {/* City & Date */}
            <div className="text-center mb-4">
                <h2 className="text-3xl font-bold capitalize">{weather.city}</h2>
                <p className="text-sm uppercase tracking-wide">
                    {formattedTime} · {date.toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric"})}
                </p>
            </div>

            {/* Weather Icon & Temp */}
            <div className="flex justify-center items-center">
                <img src={weatherImage} alt={weather.desc} className="w-48 h-44 animate-pulse" />
            </div>
            <div className="text-center pb-4">
            <p className="text-5xl font-bold mt-2 ">{weather.temp}°C</p>
            <p className="capitalize text-lg italic">{weather.desc}</p>
            </div>

            {/* Extra Info */}
            <div className="flex mt-5 w-full gap-4 justify-center ">
                <div className= "flex bg-white bg-opacity-25 rounded-lg py-3 px-4 text-center justify-center w-60 cursor-pointer hover:animate-bounce  ">
                        <img src={humidity} className="w-9" alt="Humidity" />
                    <div className="ps-4 justify-center gap-2">
                        <p className="text-sm font-medium text-blue-500">Humidity</p>
                        <p className="text-xl font-bold text-blue-500">{weather.humidity}%</p>
                    </div>
                </div>

                <div className="flex bg-white bg-opacity-25 rounded-lg py-3 px-4 text-center justify-center w-60 cursor-pointer hover:animate-bounce">
                     <img src={wind} className="w-7" alt="Wind" />
                    <div className="ps-3 items-center justify-center gap-2">
                         <p className="text-sm font-medium text-blue-500">Wind</p>
                        <p className="text-xl font-bold text-blue-500">{weather.wind} m/s</p>
                    </div>
                </div>

                 <div className="flex bg-white bg-opacity-25 rounded-lg py-3 px-4 text-center justify-center w-60 cursor-pointer hover:animate-bounce">
                     <img src={pressure} className="w-8" alt="Wind" />
                    <div className="ps-3 items-center justify-center gap-2">
                         <p className="text-sm font-medium text-blue-500">pressure</p>
                        <p className="text-xl font-bold text-blue-500">{weather.pressure} hPa</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WeatherCard;
