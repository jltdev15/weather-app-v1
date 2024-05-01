import { ref, computed, reactive } from "vue";
import {
  getCurrentDay,
  getCurrentDate,
  checkNightTime,
} from "../../helpers/helpers";
import { defineStore } from "pinia";
import axiosClient from "../axiosClient";
export const useWeatherStore = defineStore("weatherstore", () => {
  // Initial State

  const currDay = ref(getCurrentDay());
  const currDate = ref(getCurrentDate());
  const isNightTime = ref(checkNightTime());
  const isLoading = ref(false);
  const weatherData = reactive({
    countryCode: "",
    name: "",
    town: "",
    temp: "",
    feels: "",
    desc: "",
    icon: "",
    humidity: "",
    wind: "",
    lat: "",
    lon: "",
  });
  const foreCastData = ref([]);

  // Getters
  const iconUrl = computed(
    () => import.meta.env.VITE_ICON_URL + weatherData.icon + "@2x.png"
  );
  const url = computed(() => import.meta.env.VITE_ICON_URL);
  const checkTime = computed(() =>
    checkNightTime()
      ? "bg-gray-800 text-gray-50"
      : "bg-transparent text-gray-800"
  );
  const forecast = computed(async () => {
    return (foreCastData.value = await getFiveDayForeCast());
  });

  // Methods

  const getGeoLocation = async () => {
    isLoading.value = true;
    navigator.geolocation.getCurrentPosition(async function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // Use these coordinates to construct the API request
      console.log("Log get geo");

      await getWeatherInformation(latitude, longitude);
      await getFiveDayForeCast(latitude, longitude);
    });
  };

  const getFiveDayForeCast = async (la, long) => {
    try {
      const foreCastResults = await axiosClient.get(
        `data/2.5/forecast?lat=${la}&lon=${long}&cnt=40&appid=${
          import.meta.env.VITE_API
        }&units=metric`
      );
      console.log(foreCastResults.data.list);
      if (foreCastResults) {
        isLoading.value = false;
        foreCastData.value = await getForecast(foreCastResults.data.list);
        console.log(foreCastData.value);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getForecast = async (payload) => {
    const forecastData = {};
    let currentDay = "";
    let dayCount = 0; // Track the number of days processed

    for (const item of payload) {
      const date = new Date(item.dt * 1000);
      const dayName = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
      }).format(date);
      // Check for new day and create entry if needed (limit to 5 days)
      if (dayName !== currentDay && dayCount < 6) {
        currentDay = dayName;
        forecastData[dayName] = {
          weather: [],
          temp: [],
          day: currentDay,
          icon: [],
        };
        dayCount++;
      }

      const weather = item.weather[0].main;
      const temp = Math.round(item.main.temp);
      const icon = item.weather[0].icon;
      // Collect data for the current day only
      if (dayName === currentDay) {
        forecastData[currentDay].weather.push(weather);
        forecastData[currentDay].temp.push(temp);
        forecastData[currentDay].icon.push(icon);
      }
    }

    return Object.values(forecastData).slice(1, 6);
  };

  const getWeatherInformation = async (la, long) => {
    try {
      const resultsLoc = await axiosClient.get(
        `/geo/1.0/reverse?lat=${la}&lon=${long}&appid=${
          import.meta.env.VITE_API
        }`
      );
      const resultsTemp = await axiosClient.get(
        `data/2.5/weather?lat=${la}&lon=${long}&appid=${
          import.meta.env.VITE_API
        }&units=metric`
      );
      // Geo Location
      weatherData.countryCode = await resultsLoc.data[0].country;
      weatherData.town = await resultsLoc.data[0].state;

      // Weather Condition
      weatherData.name = await resultsTemp.data.name;
      weatherData.temp = await resultsTemp.data.main.temp;
      weatherData.feels = await resultsTemp.data.main.feels_like;
      weatherData.humidity = await resultsTemp.data.main.humidity;
      weatherData.wind = await resultsTemp.data.wind.speed;
      weatherData.desc = await resultsTemp.data.weather[0].description;
      weatherData.icon = await resultsTemp.data.weather[0].icon;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getWeatherInformation,
    weatherData,
    isLoading,
    currDate,
    currDay,
    iconUrl,
    isNightTime,
    checkTime,
    getFiveDayForeCast,
    foreCastData,
    forecast,
    getGeoLocation,
    url,
  };
});
