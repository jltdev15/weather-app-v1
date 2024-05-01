<template>
    <div class="py-6 bg-gray-500 text-gray-50 animate__animated animate__zoomIn" v-if="!weatherStore.isLoading">
        <p class="text-xl font-bold text-center capitalize ">5-day forecast</p>
        <div class="grid grid-cols-5 gap-1">
            <ForcastItem v-for="data in props.forcast" :weather="data.weather[1]" :iconUrl='url + data.icon[0]'
                :temp="data.temp[4]" :key="data.day" :date="data.day" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useWeatherStore } from '@/stores/WeatherStore';
import ForcastItem from './ForcastItem.vue';
const weatherStore = useWeatherStore()

const url = computed(() => {
    return import.meta.env.VITE_ICON_URL
})

const props = defineProps({
    forcast: {
        type: Array
    }
})

</script>