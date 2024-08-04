<template>
  <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        variant="text"
        class="mx-2"
        rounded="xl"
      >
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Le Dessert Avant L'entrée</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
  //
</script>

<script>
  export default {
    data: () => ({
      links: [
        'Add Words',
        'Play'
      ],
    }),
  }
</script>
