function WeatherCard({ weather }) {
  const { name, main, weather: weatherDetails, wind, sys } = weather;

  const icon = weatherDetails?.[0]?.icon;
  const description = weatherDetails?.[0]?.description;

  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-3xl bg-white/80 p-6  shadow-xl backdrop-blur-md">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="mt-1 text-lg capitalize ">{description}</p>

          <div className="mt-4 flex items-center gap-4">
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={description}
              className="h-20 w-20"
            />
            <div>
              <p className="text-5xl font-bold">{Math.round(main.temp)}°C</p>
              <p className="text-sm ">
                Feels like {Math.round(main.feels_like)}°C
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:min-w-[320px]">
          <div className="rounded-2xl bg-white/90 p-4">
            <p className="text-sm ">Humidity</p>
            <p className="mt-1 text-xl font-semibold">{main.humidity}%</p>
          </div>

          <div className="rounded-2xl bg-white/90 p-4">
            <p className="text-sm ">Wind Speed</p>
            <p className="mt-1 text-xl font-semibold">{wind.speed} m/s</p>
          </div>

          <div className="rounded-2xl bg-white/90 p-4">
            <p className="text-sm ">Sunrise</p>
            <p className="mt-1 text-xl font-semibold">{sunrise}</p>
          </div>

          <div className="rounded-2xl bg-white/90 p-4">
            <p className="text-sm ">Sunset</p>
            <p className="mt-1 text-xl font-semibold">{sunset}</p>
          </div>

          <div className="rounded-2xl bg-white/90 p-4">
            <p className="text-sm ">Min Temp</p>
            <p className="mt-1 text-xl font-semibold">
              {Math.round(main.temp_min)}°C
            </p>
          </div>

          <div className="rounded-2xl bg-white/90 p-4">
            <p className="text-sm ">Max Temp</p>
            <p className="mt-1 text-xl font-semibold">
              {Math.round(main.temp_max)}°C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
