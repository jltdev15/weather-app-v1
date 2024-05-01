<template>
  <header class="p-3 bg-blue-600 text-gray-50">
    <nav class="flex items-center justify-between p-3">
      <router-link to="/search"> <i class="text-xl fa-solid fa-magnifying-glass"></i></router-link>

      <div class="text-xl font-bold">
        <router-link to="/"> Weather App v 1.0</router-link>

      </div>
      <ul>
        <RouterLink class="flex items-center" to="/about"><i class="text-xl fa-regular fa-circle-question"></i>
        </RouterLink>
      </ul>
    </nav>
  </header>
</template>
