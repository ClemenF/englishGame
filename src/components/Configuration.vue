<template>
    <v-card
    class="ma-5">
        <v-card-title class="text-center">
          Configurations de la partie
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
            <div>
                <div>
                    <strong>Nombre de mots</strong>
                    <p class="text-center">{{ count }}</p>
                </div>
                <div class="d-flex">
                    <v-slider
                        v-model="count"
                        :max="maxWords"
                        :step="5"
                        color="success"
                        density="compact"
                        thumb-size="10"
                        hide-details
                    ></v-slider>
                </div>
            </div>
            <v-divider class="mx-4"></v-divider>
            <div>
                <div class="pt-5">
                    <strong>Sélection des catégories</strong>
                </div>
                <div>
                <v-chip
                    v-for="(category,i) in categories"
                    class="ma-1"
                    :key="i"
                    :variant="category.selected ? 'flat' : 'outlined'"
                    :color="category.selected ? 'success' : 'error'"
                    @click="toggleCategory(category)"
                >
                    <strong>{{ category.name }}</strong>
                </v-chip>
                </div>
            </div>
        </v-card-text>
      </v-card>
</template>

<script setup>

  //
</script>

<script>
export default {
    data() {
        return {
            count: 50,
            maxWords: null
        }
    },
    props: {
        categories: Array,
        maxWords: Number
    },
    mounted() {
        console.log(this.categories);
        this.maxWords = this.dictionnaryCount;
    },
    watch: {
        count(value) {
            this.$emit('countWordsUpdate', value);
        }
    },
    methods: {
        toggleCategory(category) {
            if (this.categories.every((cat) => cat.selected)) {
                this.categories.map((cat) => cat.selected = !cat.selected);
            }

            category.selected = !category.selected;

            if (this.categories.every((cat) => !cat.selected)) {
                this.categories.map((cat) => cat.selected = !cat.selected);
            }   
        }
    }

}
</script>
