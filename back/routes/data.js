const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json()); 

app.post("/getWeather", async (req, res) => {
  try {
    const { cities } = req.body; 

    if (!Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ success: false, error: "Invalid input" });
    }


    const weatherDataPromises = cities.map(async (city) => {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=2be282b9d9924a8f93b165918230609&q=${city}`
      );
      return response.data;
    });

    const weatherData = await Promise.all(weatherDataPromises);

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = app;
