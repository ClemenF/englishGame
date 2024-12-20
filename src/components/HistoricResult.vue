<template>
  <div
    v-for="item in historicResults"
  >
    <div class="d-flex px-5 py-3">
      {{ formatDate(item.date) }}
      <v-spacer />
      <p class="text-green">{{ item.result }}</p>
    </div>
    <v-divider />
  </div>
</template>

<script>
export default {
  name: "HistoricResult",
  data() {
    return {
      historicResults: []
    }
  },
  mounted() {
    if (localStorage.getItem('historic')) {
      this.historicResults = JSON.parse(localStorage.getItem('historic'));
    }
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      return d.toLocaleString('fr-FR', { weekday:"short", year:"numeric", month:"long", day:"numeric"});
    }
  }
}
</script>

<style scoped>

</style>
