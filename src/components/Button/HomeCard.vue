<template>
    <v-card
      class="ma-5"
      link
    >
      <v-card-item>
        <v-card-title
          class="text-center">
          {{ title }}
        </v-card-title>

        <v-card-text>
            {{ subTitle }}
        </v-card-text>
      </v-card-item>
    </v-card>
</template>

<script setup>
  //
</script>

<script>

export default {
    props: {
        title: String,
        subTitle: String
    },
    methods: {
        goTo() {
            this.$emit('click');
        }
    }
}
</script>
