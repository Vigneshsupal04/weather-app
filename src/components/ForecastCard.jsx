import { getWeatherIconUrl } from "../utils/formatters";

function ForecastCard({ day }) {
  return (
    <div className="rounded-2xl bg-white/90 p-4 text-center shadow-md backdrop-blur">
      <p className="font-semibold">{day.day}</p>
      <img
        src={getWeatherIconUrl(day.icon)}
        alt={day.description}
        className="mx-auto h-16 w-16"
      />
      <p className="text-xl font-bold">{Math.round(day.temp)}°C</p>
      <p className="text-sm capitalize text-gray-600">{day.description}</p>
    </div>
  );
}

export default ForecastCard;
