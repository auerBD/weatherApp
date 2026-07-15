import "../WeatherCard.css"


function WeatherCard({ data }) {
  return (
    <div className="weather-card">
      <h1>Current Weather in {data.name}</h1>

      <div className="weather-icon">
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
      </div>

      <div className="weather-info">
        <h2>{data.weather[0].main}</h2>
        <p>{data.weather[0].description}</p>

        <h3>{Math.round(data.main.temp)}°C</h3>

        <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;