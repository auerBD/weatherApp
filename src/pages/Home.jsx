import { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import { getCoordinates, getWeatherInfo } from "../services/api";
import "../Home.css"

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const loadDefaultWeather = async () => {
    try {
      const location = await getCoordinates("Graz");
      const weatherData = await getWeatherInfo(location.lat, location.lon);
      setWeather(weatherData);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  loadDefaultWeather();
}, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Get city coordinates
      const location = await getCoordinates(searchQuery);

      // Fetch weather using coordinates
      const weatherData = await getWeatherInfo(location.lat, location.lon);

      setWeather(weatherData);
      setSearchQuery("");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter a city..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        weather && <WeatherCard data={weather} />
      )}
    </div>
  );
}

export default Home;