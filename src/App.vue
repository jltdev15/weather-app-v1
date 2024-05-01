<script setup>
import TheHeader from "./components/Navigation/TheHeader.vue";
import BaseApp from "@/UI/BaseApp.vue";
</script>

<template>
  <base-container>
    <TheHeader />
    <BaseApp>
      <RouterView />
    </BaseApp>
  </base-container>
</template>
