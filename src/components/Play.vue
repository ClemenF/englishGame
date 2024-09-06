<template>
  <v-row
    class="ma-5 flex-column">
    <v-btn
      icon="mdi-arrow-left"
      @click="goToHome"
    >
    </v-btn>
  </v-row>
  <v-row
    justify="center"
    class="ma-2">
    <v-col cols="4" class="text-center font-weight-bold">Résultat : {{ correctAnswer }} / {{ totalAnswer }}</v-col>
    <v-col cols="4" class="text-center font-weight-bold">Mots restant : {{ dictionnary.length + 1 }}</v-col>
  </v-row>
  <v-row
    class="ma-12 flex-column mt-2"
    v-show="loaded"
  >
    <v-form ref="form" id="form-translation">
      <v-row
        v-if="currentTrans"
        class="ma-5 flex-column text-center font-weight-bold text-uppercase">
        <p>{{ currentTrans.category }}</p>
      </v-row>
      <div class="d-flex flex-column">
        <label
          for="frenchWordInput"
        >
          Francais
        </label>
        <input
          v-model="frenchWordInput"
          id="frenchWordInput"
          name="frenchWordInput"
          class="border-sm pa-6 text-center bg-white text-lowercase"
          type="text"
        />
        <br />
        <label
          for="englishWordInput"
        >
          Anglais
        </label>
        <input
          v-model="englishWordInput"
          id="englishWordInput"
          name="englishWordInput"
          class="border-sm pa-6 text-center bg-white text-lowercase"
          type="text"
        />
        <v-btn
          id="btn-validate"
          class="mt-4"
          :color="btncolor"
          block
          @click="validate"
        >
          Valider
        </v-btn>
      </div>
    </v-form>
  </v-row>
  <v-row
    justify="center"
    align="center"
    class="ma-12 flex-column text-center fill-height"
    v-if="!loaded"
  >
    <v-progress-circular indeterminate></v-progress-circular>
  </v-row>
  <Historic/>
</template>

<script setup>
  import { mapGetters, mapMutations } from 'vuex'
  import Historic from './Historic.vue';
</script>

<script>
export default {
  data () {
    return {
      dialog: [],
      show: [],
      dictionnary: [],
      currentTrans: null,
      frenchWordInput: '',
      englishWordInput: '',
      originLanguage: null,
      loaded: false,
      alertText: '',
      alertType: '',
      correctAnswer: 0,
      totalAnswer: 0,
      answers: [],
      mode: 'random',
      btncolor: 'blue'
    }
  },
  watch: {
    loaded: function (val) {
      if (val) {
        this.createEnterListner();
      }
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentDictionnary',
      'getCurrentMode'
    ])
  },
  mounted() {
    this.mode = this.getCurrentMode;
    this.dictionnary = this.getCurrentDictionnary;
    this.chooseATranslation();
    this.loaded = true;
  },
  methods: {
    ...mapMutations([
      'setAnswers'
    ]),
    chooseATranslation() {
      console.log('choose', this.dictionnary.length);

      const randomIndex = Math.floor(Math.random() * this.dictionnary.length);
      this.currentTrans = this.dictionnary[randomIndex];
      console.log(this.currentTrans);
      this.dictionnary.splice(randomIndex, 1);
      this.chooseOriginLanguage();
      let elementFrenchInput = document.getElementById('frenchWordInput');
      let elementEnglishInput = document.getElementById('englishWordInput');

      if (this.originLanguage == 'french') {
        this.frenchWordInput = this.currentTrans.french;
        this.englishWordInput = '';
        elementFrenchInput.value = this.currentTrans.french;
        elementFrenchInput.disabled = true;
        elementFrenchInput.classList.add('bg-grey');
        elementEnglishInput.classList.remove('bg-grey');
        elementEnglishInput.disabled = false;
        elementEnglishInput.value = '';
        elementEnglishInput.focus();
      } else if (this.originLanguage == 'english') {
        this.englishWordInput = this.currentTrans.english;
        this.frenchWordInput = '';
        elementFrenchInput.value = '';
        elementFrenchInput.classList.remove('bg-grey');
        elementEnglishInput.classList.add('bg-grey');
        elementEnglishInput.value = this.currentTrans.english;
        elementEnglishInput.disabled = true;
        elementFrenchInput.disabled = false;
        elementFrenchInput.focus();
      }
    },
    chooseOriginLanguage() {
      switch (this.mode) {
        case 'random':
          const num = Math.floor(Math.random() * 2); // generates a random number
          const arr = ["french", "english"]; // create array of strings
          this.originLanguage = arr[num];
          break;
        case 'french':
          this.originLanguage = 'french';
          break;
        case 'english':
          this.originLanguage = 'english';
          break;
      }
    },
    validate () {
      if (this.originLanguage == 'french') {
        if (this.englishWordInput.toLowerCase() === this.currentTrans.english) {
          this.answers.unshift({
            color: "rgba(0,128,0,0.5)",
            id: this.answers.length + 1,
            translation: this.currentTrans.french,
            translationCible: this.currentTrans.english,
            translationAnswered: this.englishWordInput.toLowerCase()
          });
          this.alertText = 'Correct';
          this.alertType = 'success';
          this.correctAnswer++;
          this.btncolor = 'success';
        } else {
          this.answers.unshift({
            id: this.answers.length + 1,
            color: "#ff0000",
            translation: this.currentTrans.french,
            translationCible: this.currentTrans.english,
            translationAnswered: this.englishWordInput.toLowerCase()
          });
          this.alertText = 'Pas Correct - ' + this.currentTrans.english;
          this.alertType = 'error';
          this.btncolor = 'error';
        }
      } else if (this.originLanguage == 'english') {
        if (this.frenchWordInput.toLowerCase() === this.currentTrans.french) {
          this.answers.unshift({
            color: "rgba(0,128,0,0.5)",
            id: this.answers.length + 1,
            translation: this.currentTrans.english,
            translationCible: this.currentTrans.french,
            translationAnswered: this.frenchWordInput.toLowerCase()
          });
          this.alertText = 'Correct';
          this.alertType = 'success';
          this.correctAnswer++;
          this.btncolor = 'success';
        } else {
          this.answers.unshift({
            id: this.answers.length + 1,
            color: "#ff0000",
            translation: this.currentTrans.english,
            translationCible: this.currentTrans.french,
            translationAnswered: this.frenchWordInput.toLowerCase()
          });
          this.alertText = 'Pas Correct - ' + this.currentTrans.english;
          this.alertType = 'error';
          this.btncolor = 'error';
        }
      }
      this.setAnswers(this.answers);
      this.totalAnswer++;
      if (this.dictionnary.length > 0) {
        this.chooseATranslation();
      } else {
        this.$router.push({ path: '/result', query: { result: `${this.correctAnswer} / ${this.totalAnswer}`}})
      }
    },
    goToHome() {
      this.$router.push('/');
    },
    createEnterListner() {
      self = this;
      document.getElementById('frenchWordInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          self.validate();
        }
      });
      document.getElementById('englishWordInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          self.validate();
        }
      });
    }
  }
}
</script>
