import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from "./Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [search, setSearch] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);
    const newCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setCountriesToShow(newCountries);
    if (newCountries.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${newCountries[0].capital}&appid=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          setWeather(res.data);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <div>
        Find countries: <input value={search} onChange={searchHandler} />
      </div>
      <div>
        {countriesToShow.length > 10 ? (
          "Too many matches, specify another search"
        ) : countriesToShow.length > 1 ? (
          countriesToShow.map((country) => (
            <div key={country.name}>
              {country.name}{" "}
              <button value={country.name} onClick={searchHandler}>
                Show
              </button>
            </div>
          ))
        ) : countriesToShow.length > 0 ? (
          <Country country={countriesToShow[0]} weather={weather} />
        ) : (
          "none found"
        )}
      </div>
    </div>
  );
};

export default App;
