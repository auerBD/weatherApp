const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

export const getCoordinates = async (query) => {
  const response = await fetch(
    `${GEO_URL}?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coordinates.");
  }

  const data = await response.json();

  if (data.length === 0) {
    throw new Error("City not found.");
  }

  return data[0];
};

export const getWeatherInfo = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather.");
  }

  return await response.json();
};