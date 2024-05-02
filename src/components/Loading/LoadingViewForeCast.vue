<template>

    <div class="loading-overlay" v-if="isLoading">
        <div class="flex flex-col items-center gap-6">
            <div class="loading-spinner"></div>

            <p class="text-xl text-gray-50">Loading forecast data</p>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        isLoading: Boolean,
    },
    setup(props) {
        return {
            props,
        };
    },
};
</script>

<style scoped>
.loading-overlay {
    position: absolute;
    top: 60%;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    /* Ensure the overlay is above other elements */
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 8px solid #fff;
    border-radius: 50%;
    border-top-color: rgb(3, 7, 247);
    /* Customize spinner color */
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
