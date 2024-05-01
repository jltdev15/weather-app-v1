<template>

    <div class="loading-overlay" v-if="isLoading">
        <div class="loading-spinner"></div>
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
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    /* Ensure the overlay is above other elements */
}

.loading-spinner {
    width: 80px;
    height: 80px;
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
