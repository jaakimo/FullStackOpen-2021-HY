import React from "react";

const tuulensuunnat = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

const Country = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>

      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={"flag"} style={{ width: "200px" }}></img>
      {weather.main ? (
        <>
          <h3>Weather in {country.capital}</h3>
          <div>
            temperature: {(weather.main.temp - 272.15).toFixed(1)} celsius{" "}
          </div>

          <img
            alt={"weather-icon"}
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          ></img>
          <div>
            wind: {weather.wind.speed.toFixed(1)} m/s{" "}
            {tuulensuunnat[(weather.wind.deg / 45).toFixed(0)]}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Country;
