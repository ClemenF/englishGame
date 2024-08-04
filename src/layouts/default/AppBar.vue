<template>
  <v-app-bar
        height="150"
    >
    <div
      class="flex-1-1-100 justify-center align-center d-flex"
    >
      <router-link to="/"><v-btn
        text="Play"
        class="mr-16"
        variant="text"
      ></v-btn> </router-link>
      <div>
        <v-img
        height="150"
        width="200"
        class="flex"
        src="../../assets/logo.webp"
      ></v-img>
      </div>
      <router-link to="/contact"><v-btn
        text="Add Words"
        class="ml-16"
        variant="text"
      > </v-btn> </router-link>
    </div>
    </v-app-bar>
</template>

<script setup>
</script>
