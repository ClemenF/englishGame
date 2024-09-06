<template>
    <div>
        <v-row
        justify="center"
        class="ma-2 border-b-sm border-t-lg">
        <v-col cols="4" class="text-center">Mot d'origine</v-col>
        <v-col cols="4" class="text-center">Traduction</v-col>
        </v-row>
        <v-row
        class="ma-12 flex-column mt-0">
        <v-timeline align="start" side="end">
            <v-timeline-item
            v-for="answer in getAnswers"
            :key="answer.id"
            :dot-color="answer.color"
            size="small"
            >
            <template v-slot:opposite>
                {{ answer.translation }}
            </template>
            <div class="d-flex">
                <div>
                <strong>{{ answer.translationCible }}</strong>
                <div class="text-caption">
                    {{ answer.translationAnswered }}
                </div>
                </div>
            </div>
            </v-timeline-item>
        </v-timeline>
        </v-row>
    </div>
</template>

<script setup>
  import { mapGetters } from 'vuex'
</script>

<script>
export default {
    computed: {
        ...mapGetters([
            'getAnswers'
        ])
    },
}
</script>
