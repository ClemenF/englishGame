<template>
  <v-row
    class="flex-column align-center justify-center mt-10"
  >
    <p> Bravo !!! </p>
    <p> Résultat : {{ result }}</p>
    <v-sheet 
      class="mt-5 text-center d-flex align-center justify-center" 
      border="success sm" 
      rounded="xl" 
      height="60" 
      width="200"
      @click="goToHome"
    >
      <p>Page d'accueil</p>
    </v-sheet>
    <div class="d-flex width-100">
    <Historic/>
    </div>
  </v-row>
</template>

<script setup>
import Historic from '@/components/Historic.vue';

</script>

<script>
export default {
  data() {
    return {
      result: null
    }
  },
  mounted() {
    this.result = this.$route.query.result;
  },
  methods: {
    goToHome () {
      this.$router.push({ path: '/'})
    }
  }
}
</script>