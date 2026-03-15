export const getWeatherIconUrl = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};

export const groupForecastByDay = (forecastList) => {
  const dailyMap = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt_txt);
    const dayKey = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    if (!dailyMap[dayKey]) {
      dailyMap[dayKey] = item;
    }
  });

  return Object.entries(dailyMap)
    .slice(0, 5)
    .map(([day, data]) => ({
      day,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    }));
};
