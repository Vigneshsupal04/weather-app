import { useEffect, useMemo, useState } from "react";
import SearchBox from "./components/SearchBox";
import Loader from "./components/Loader";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import {
  getCurrentWeatherByCity,
  getForecastByCity,
  getCurrentWeatherByCoords,
  getForecastByCoords,
} from "./services/weatherApi";
import { groupForecastByDay } from "./utils/formatters";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchedCity, setSearchedCity] = useState("Mumbai");

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError("");

      const currentData = await getCurrentWeatherByCity(city);
      const forecastData = await getForecastByCity(city);

      setWeather(currentData);
      setForecast(groupForecastByDay(forecastData.list));
      setSearchedCity(city);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid API Key. Please check your environment variables.");
      } else if (err.response?.status === 404) {
        setError("City not found. Please enter a valid city name.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in your browser.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const currentData = await getCurrentWeatherByCoords(
            latitude,
            longitude,
          );
          const forecastData = await getForecastByCoords(latitude, longitude);

          setWeather(currentData);
          setForecast(groupForecastByDay(forecastData.list));
          setSearchedCity(currentData.name);
        } catch (err) {
          if (err.response?.status === 401) {
            setError(
              "Invalid API Key. Please check your environment variables.",
            );
          } else {
            setError("Unable to fetch weather for your location.");
          }
          setWeather(null);
          setForecast([]);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("Location access denied. Please allow location permission.");
      },
    );
  };

  useEffect(() => {
    fetchWeatherByCity("Mumbai");
  }, []);

  const appBackground = useMemo(() => {
    if (!weather) {
      return "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600";
    }

    const condition = weather.weather?.[0]?.main?.toLowerCase() || "";
    const icon = weather.weather?.[0]?.icon || "";
    const isNight = icon.includes("n");

    if (condition.includes("clear")) {
      return isNight
        ? "bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-950"
        : "bg-gradient-to-br from-sky-300 via-cyan-400 to-blue-500";
    }

    if (condition.includes("cloud")) {
      return isNight
        ? "bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900"
        : "bg-gradient-to-br from-slate-300 via-gray-400 to-slate-500";
    }

    if (
      condition.includes("rain") ||
      condition.includes("drizzle") ||
      condition.includes("thunderstorm")
    ) {
      return isNight
        ? "bg-gradient-to-br from-slate-900 via-gray-900 to-blue-950"
        : "bg-gradient-to-br from-gray-500 via-slate-600 to-gray-800";
    }

    if (condition.includes("snow")) {
      return isNight
        ? "bg-gradient-to-br from-slate-700 via-slate-800 to-blue-900"
        : "bg-gradient-to-br from-blue-100 via-slate-200 to-gray-300";
    }

    if (
      condition.includes("mist") ||
      condition.includes("fog") ||
      condition.includes("haze")
    ) {
      return isNight
        ? "bg-gradient-to-br from-gray-700 via-slate-800 to-gray-900"
        : "bg-gradient-to-br from-gray-300 via-slate-300 to-gray-400";
    }

    return "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600";
  }, [weather]);

  return (
    <div
      className={`min-h-screen px-4 py-8 transition-all duration-700 ${appBackground}`}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">Weather App</h1>
        </div>

        <div className="rounded-3xl bg-white/20 p-4 shadow-2xl backdrop-blur-md sm:p-6">
          <SearchBox
            onSearch={fetchWeatherByCity}
            onLocationClick={fetchWeatherByLocation}
          />

          {error && (
            <div className="mt-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <Loader />
          ) : (
            <>
              {weather && (
                <div className="mt-6">
                  <WeatherCard weather={weather} />
                </div>
              )}

              {forecast.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-2xl font-bold text-white">
                    5-Day Forecast for {searchedCity}
                  </h2>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {forecast.map((day, index) => (
                      <ForecastCard key={index} day={day} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
