<script setup>
import { ref } from 'vue'
import FindWeather from '@/components/CurrentWeather/FindWeather.vue'
import { useSearchWeatherStore } from '@/stores/SearchWeatherStore';


const searchWeatherStore = useSearchWeatherStore();

const locationValue = ref('')
const isError = ref(false)



const searhcWeatherHandler = async () => {
  isError.value = false
  if (locationValue.value === '') {
    return isError.value = true
  }
  searchWeatherStore.getWeatherInformation(locationValue.value)
  locationValue.value = '';
}
</script>
<template>
  <div>
    <div class="flex items-center gap-3 px-6 pt-6">
      <div class="relative w-full  min-w-[200px] h-14">
        <input @blur="isError = false" v-model.trim="locationValue" :class="{ 'border-red-600 border-1': isError }"
          class="peer w-full h-full bg-transparent text-xl text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"
          placeholder=" " /><label
          class="flex w-full h-full select-none pointer-events-none absolute text-lg left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-base text-[14px] peer-focus:text-[16px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 text-lg after:border-blue-gray-200 peer-focus:after:!border-blue-500">Search
          Location
        </label>

      </div>
      <div class="flex">
        <button @click="searhcWeatherHandler"
          class="align-middle  text-center select-none  font-sans font-bold transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-base py-3 px-6 rounded-lg bg-blue-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
          type="button">
          <svg class="feather feather-search" fill="none" height="28" stroke="currentColor" stroke-linecap="round"
            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
          </svg>
        </button>
      </div>


    </div>
    <div class="px-6 " v-if="isError">
      <p class="font-bold text-red-600">Please enter location</p>
    </div>
    <FindWeather />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
