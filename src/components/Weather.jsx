import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const API_KEY = "API KEY"; 

const weatherIconMap = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-cloudy",
  "02n": "wi-night-alt-cloudy",
  "03d": "wi-cloud",
  "03n": "wi-cloud",
  "04d": "wi-cloudy",
  "04n": "wi-cloudy",
  "09d": "wi-showers",
  "09n": "wi-showers",
  "10d": "wi-day-rain",
  "10n": "wi-night-alt-rain",
  "11d": "wi-thunderstorm",
  "11n": "wi-thunderstorm",
  "13d": "wi-snow",
  "13n": "wi-snow",
  "50d": "wi-fog",
  "50n": "wi-fog",
};

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching the location", error);
      }
    );
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error("Error fetching the weather data", error);
        });
    }
  }, [location]);

  return (
    <Grid container className="flex justify-end items-start mb-2 mt-3 ">
      <Grid item className="" style={{ width: "350px" }}>
        <Card className="shadow-lg">
          <CardContent className="bg-blue-100/40 ">
            {weather ? (
              <>
                <div className="flex justify-between items-center ml-2">
                  <Typography variant="h6" component="div">
                    {weather.name}
                  </Typography>
                  <div className="flex items-center mr-3">
                    <i
                      className={`wi ${
                        weatherIconMap[weather.weather[0].icon]
                      } text-4xl mr-2`}
                    ></i>
                    <Typography variant="h6" component="div" className="ml-2">
                      {weather.main.temp}°C
                    </Typography>
                  </div>
                </div>
              </>
            ) : (
              <Typography variant="h6" component="div" className="text-center">
                Loading...
              </Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
