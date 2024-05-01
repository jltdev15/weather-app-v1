<template>

    <div class="p-3 text-center ">
        <p>{{ weather }}</p>
        <img :src="iconUrl + '@2x.png'" alt="">
        <div>
            <p>{{ shortDay }}</p>
            <p>{{ temp }}&deg;</p>
        </div>
    </div>


</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['date', 'weather', 'temp', 'iconUrl'])


const shortDay = computed(() => {
    if (props.date === 'Sunday') {
        return 'Sun'
    }
    if (props.date === 'Monday') {
        return 'Mon'
    }
    if (props.date === 'Tuesday') {
        return 'Tue'
    }
    if (props.date === 'Wednesday') {
        return 'Wed'
    }
    if (props.date === 'Thursday') {
        return 'Thu'
    }
    if (props.date === 'Friday') {
        return 'Fri'
    }
    if (props.date === 'Saturday') {
        return 'Sat'
    }
})

</script>