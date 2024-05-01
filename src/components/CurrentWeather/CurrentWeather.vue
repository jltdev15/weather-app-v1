<script setup>
import { ref, onMounted, computed } from "vue";
import { useWeatherStore } from "@/stores/WeatherStore";
import LoadingView from '@/components/Loading/LoadingView.vue'

const weatherStore = useWeatherStore();

const toKph = computed(() => Math.floor(weatherStore.weatherData.wind * 1.609)
)
onMounted(async () => {
    await weatherStore.getGeoLocation()

})


</script>

<template>
    <div>
        <LoadingView :isLoading="weatherStore.isLoading" />
        <div clas :class="weatherStore.checkTime" v-if="!weatherStore.isLoading"
            class="py-6 text-center shadow rounded-b-xl animate__animated animate__zoomIn">
            <h1 class="flex items-center justify-center gap-3 text-lg">
                <i class="px-1 text-xs fa-solid fa-location-dot"></i>
                {{ weatherStore.weatherData.name }},{{ weatherStore.weatherData.town }} ,
                <span>{{ weatherStore.weatherData.countryCode }}</span>
            </h1>

            <p class="text-sm">
                <span>{{ weatherStore.currDay }},</span> {{ weatherStore.currDate }}
            </p>
            <div class="p-0">
                <p class="pt-6 text-3xl font-medium capitalize ">
                    {{ weatherStore.weatherData.desc }}
                </p>
                <img :src="weatherStore.iconUrl" alt="weather icon" class="mx-auto">

                <h2 class="inline-block font-semibold text-9xl">
                    {{ Math.round(weatherStore.weatherData.temp) }}&deg;
                </h2>

                <div class="flex justify-between px-6 py-9">
                    <div class="flex flex-col items-center justify-center gap-1">
                        <i class="text-xl fa-solid fa-temperature-high"></i>
                        <p class="text-2xl">{{ Math.round(weatherStore.weatherData.feels) }}&deg;</p>
                        <p class="text-xs text-center ">
                            Feels like
                        </p>
                    </div>
                    <div class="flex flex-col items-center gap-1">
                        <i class="text-xl fa-solid fa-droplet"></i>
                        <p class="text-2xl">{{ weatherStore.weatherData.humidity }}<span class="text-[0.8rem]">%</span>
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
        </div>
    </div>
</template>