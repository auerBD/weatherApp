import { useState, useEffect } from "react";
import WeatherCard from "../components/WeatherCard";
import { getCoordinates, getWeatherInfo } from "../services/api";
import "../Home.css"

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherCards, setWeatherCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteCity = (id) => {
    setWeatherCards((previous) =>
      previous.filter((city) => city.id !== id)
    );
  };

  useEffect(() => {
    const cities = ["Graz", "Vienna", "Salzburg"];

    const loadDefaultWeather = async () => {
      try {
        const weatherData = await Promise.all(
          cities.map(async (city) => {
            const location = await getCoordinates(city);
            return await getWeatherInfo(location.lat, location.lon);
          })
        );
        setWeatherCards(weatherData);
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

      setWeatherCards((previous) => {
        const exists = previous.some(
          (city) => city.id === weatherData.id
        );

        if (exists) return previous;

        return [weatherData, ...previous];
      });

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
        weatherCards && <div className="weather-grid">
          {weatherCards.map((city) => (
            <WeatherCard
              key={city.id}
              data={city}
              onDelete={deleteCity}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;