<template>
  <v-col
  class="mx-auto">
    <v-card>
      <v-card-item>
        <v-card-title
          class="text-center">
          Mode aléatoire
        </v-card-title>

        <v-card-text>
          Le mot sera demandé aléatoirement en anglais ou en français.
        </v-card-text>
      </v-card-item>
    </v-card>
    <v-card>
      <v-card-item>
        <v-card-title
          class="text-center">
          Mode français
        </v-card-title>

        <v-card-text>
          Le mot sera demandé en français.
        </v-card-text>
      </v-card-item>
    </v-card>
    <v-card>
      <v-card-item>
        <v-card-title
          class="text-center">
          Mode Anglais
        </v-card-title>

        <v-card-text>
          Le mot sera demandé en anglais.
        </v-card-text>
      </v-card-item>
    </v-card>
  </v-col>
</template>

<script setup>
</script>

<script>
export default {
  data () {
    return {
      test: 'test'
    }
  }
}
</script>