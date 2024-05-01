<script setup>
import { ref, onMounted, computed } from "vue";
import { useWeatherStore } from "@/stores/WeatherStore";
import Forecast from '@/components/Forecast/Forecast.vue'
import CurrentWeather from '@/components/CurrentWeather/CurrentWeather.vue'

const weatherStore = useWeatherStore();

onMounted(async () => {
  await weatherStore.getGeoLocation()

})

</script>
<template>
  <div>
    <CurrentWeather />


    <div class="py-3">
      <Forecast :forcast="weatherStore.foreCastData" />
    </div>
  </div>
</template>
