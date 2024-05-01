import { ref, computed, reactive } from "vue";

import { defineStore } from "pinia";
import axiosClient from "../axiosClient";
export const useSearchWeatherStore = defineStore("searchweatherstore", () => {
  // Initial State

  const isLoading = ref(false);
  const isCityFound = ref(false);
  const weatherData = reactive({
    countryCode: "",
    name: "",
    province: "",
    temp: "",
    feels: "",
    desc: "",
    icon: "",
    humidity: "",
    wind: "",
  });

  // Getters
  const iconUrl = computed(
    () => import.meta.env.VITE_ICON_URL + weatherData.icon + "@2x.png"
  );
  const url = computed(() => import.meta.env.VITE_ICON_URL);

  // Methods

  const getWeatherInformation = async (payload) => {
    try {
      const resultsTemp = await axiosClient.get(
        `data/2.5/weather?q=${payload}&appid=${
          import.meta.env.VITE_API
        }&units=metric`
      );
      if (resultsTemp) {
        isCityFound.value = true;
        console.log(resultsTemp);
        // Weather Condition
        weatherData.name = await resultsTemp.data.name;
        weatherData.countryCode = await resultsTemp.data.sys.country;
        weatherData.temp = await resultsTemp.data.main.temp;
        weatherData.feels = await resultsTemp.data.main.feels_like;
        weatherData.humidity = await resultsTemp.data.main.humidity;
        weatherData.wind = await resultsTemp.data.wind.speed;
        weatherData.desc = await resultsTemp.data.weather[0].description;
        weatherData.icon = await resultsTemp.data.weather[0].icon;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getWeatherInformation,
    weatherData,
    isLoading,
    iconUrl,
    url,
    isCityFound,
    resetSearch,
  };
});
