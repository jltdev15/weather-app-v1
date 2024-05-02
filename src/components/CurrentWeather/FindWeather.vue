<script setup>
import { ref, onMounted, computed } from "vue";
import LoadingView from "../Loading/LoadingView.vue";
defineProps(['city', 'country', 'description', 'icon', 'temp', 'feels', 'humidity', 'wind'])
import { useSearchWeatherStore } from "@/stores/SearchWeatherStore";
const searchWeatherStore = useSearchWeatherStore();
console.log(searchWeatherStore.toKph);
const toKph = computed(() => Math.floor(searchWeatherStore.weatherData.wind * 1.609));
</script>

<template>
    <LoadingView :isLoading="searchWeatherStore.isLoading" />
    <div class="py-16 text-center" v-if="!searchWeatherStore.isCityFound">
        <i class="fa-solid text-[10rem] text-blue-600 fa-circle-info py-6"></i>
        <p class="text-2xl font-bold">No weather information to show</p>
        <p>Try to search location to proceed</p>

    </div>
    <div class="py-3 " :class="{ 'animate__animated animate__zoomIn': searchWeatherStore.isCityFound }"
        v-if="searchWeatherStore.isCityFound">
        <div class="p-6 text-center ">
            <h1 class="flex items-center justify-center gap-3 text-lg ">
                <i class="px-1 text-xs fa-solid fa-location-dot"></i>
                {{ searchWeatherStore.weatherData.name }},
                {{ searchWeatherStore.weatherData.countryCode }}
            </h1>

            <div class="p-0">
                <p class="pt-6 text-3xl font-medium capitalize ">
                    {{ searchWeatherStore.weatherData.desc }}
                </p>
                <img :src="searchWeatherStore.iconUrl" alt="weather icon" class="mx-auto">

                <h2 class="inline-block font-semibold text-9xl">
                    {{ Math.round(searchWeatherStore.weatherData.temp) }}&deg;
                </h2>

                <div class="flex justify-between px-6 py-9">
                    <div class="flex flex-col items-center justify-center gap-1">
                        <i class="text-xl fa-solid fa-temperature-high"></i>
                        <p class="text-2xl">{{ Math.round(searchWeatherStore.weatherData.feels) }}&deg;</p>
                        <p class="text-xs text-center ">
                            Feels like
                        </p>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <i class="text-xl fa-solid fa-droplet"></i>
                        <p class="text-2xl">{{ searchWeatherStore.weatherData.humidity }}<span
                                class="text-[0.8rem]">%</span>
                        </p>
                        <p class="text-xs text-center ">
                            Humidity
                        </p>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <i class="text-xl fa-solid fa-wind"></i>
                        <p class="text-2xl">{{ toKph }} <span class="text-[0.8rem]">km/h</span></p>
                        <p class="text-xs text-center ">
                            Wind speed
                        </p>
                    </div>

                </div>
            </div>
            <div class="py-6">
                <button @click="searchWeatherStore.isCityFound = !searchWeatherStore.isCityFound"
                    class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button">
                    Clear results
                </button>
            </div>
        </div>
    </div>
</template>