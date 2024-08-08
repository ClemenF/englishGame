<template>
  <v-row
    justify="center"
    align="center"
    class="fill-height flex-column"
  >
    <v-card
      class="ma-5"
      @click.native="goTo('random')"
      link
    >
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
    <v-card
      class="ma-5"
      @click.native="goTo('french')"
      link
    >
      <v-card-item>
        <v-card-title
          class="text-center">
          Mode français
        </v-card-title>

        <v-card-text>
          Le mot est donné en français.
        </v-card-text>
      </v-card-item>
    </v-card>
    <v-card
      class="ma-5"
      @click.native="goTo('english')"
      link
    >
      <v-card-item>
        <v-card-title
          class="text-center">
          Mode Anglais
        </v-card-title>

        <v-card-text>
          Le mot est donné en anglais.
        </v-card-text>
      </v-card-item>
    </v-card>
  </v-row>
</template>

<script setup>
</script>

<script>
export default {
  data () {
    return {
      test: 'test'
    }
  },
  methods: {
    goTo (path) {
      switch (path) {
        case 'random':
          this.$router.push({ path: '/play', query: { mode: 'random'}});
          break;
        case 'french':
          this.$router.push({ path: '/play', query: { mode: 'french' }});
          break;
        case 'english':
          this.$router.push({ path: '/play', query: { mode: 'english' }});
          break;
      }
    }
  }
}
</script>
