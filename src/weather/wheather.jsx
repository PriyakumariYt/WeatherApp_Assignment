
import React, { useState,useEffect } from "react";
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherPartlySunny } from "react-icons/ti";
import { FaDroplet } from "react-icons/fa6";

import { FaSearch } from 'react-icons/fa';
import { WiStrongWind } from "react-icons/wi";

function Wheather() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = "2bb3861ba5284dfe9c0f1c50243f3173";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
 
    
    const fetchWeatherData = () => {
        fetch(`${apiUrl}${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error("Error fetching weather data:", error));
    };
    const getWeatherIcon = (weatherCondition) => {
      if (weatherCondition.includes("cloud")) {
          return <TiWeatherCloudy style={{ fontSize: "4rem", color: "gray" }} />;
      } else if (weatherCondition.includes("rain")) {
          return <TiWeatherDownpour style={{ fontSize: "4rem", color: "blue" }} />;
      } else {
          return <TiWeatherPartlySunny style={{ fontSize: "4rem", color: "orange" }} />;
      }
  };
  useEffect(() => {
    if (weatherData) {
        setCity("");
    }
}, [weatherData]);

    return (
       <>
<div className="mainContainer">
<h1 className="heading">Weather App</h1>
            
            <div className="card">
            <div className="search">
              <input 
                        type="text" 
                        value={city} 
                        onChange={e => setCity(e.target.value)} 
                        placeholder="Enter city name" 
                    />
                    <button onClick={fetchWeatherData}><FaSearch /></button>
             </div>
                    {weatherData && (
                    <div className="container">
                       
                        {getWeatherIcon(weatherData.weather[0].description)}
                     <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
                            <h2 className="city">{weatherData.name}</h2>
                            <div className="deatils">
                    <div className="col">
                      <FaDroplet className="weather-col"/>
                      <div>
                        <p className="humidity">{weatherData.main.humidity}%</p>
                        <p>Humidity</p>
                      </div>
                    </div>
                    <div className="col">
                    <WiStrongWind className="weather-col"/>
                      <div>
                        <p className="wind">{weatherData.wind.speed}km/h</p>
                        <p>Wind Speed</p>
                      </div>
                    </div>
                  </div>
                 </div>
                    )}
           </div>
</div>
    

   </>
    );
}

export default Wheather;

