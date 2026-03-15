import axios from "axios";

const API_KEY = "518701d5f4ba90e630ba757a34242a3b";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeatherByCity = async (city) => {
  const response = await axios.get(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`,
  );
  return response.data;
};

export const getForecastByCity = async (city) => {
  const response = await axios.get(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`,
  );
  return response.data;
};

export const getCurrentWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
  return response.data;
};

export const getForecastByCoords = async (lat, lon) => {
  const response = await axios.get(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
  );
  return response.data;
};
