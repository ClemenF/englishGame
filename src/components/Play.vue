<template>
  <v-row
    class="ma-12 flex-column"
    v-show="loaded"
  >
    <v-btn
       icon="mdi-arrow-left"
      @click="goToHome"
    >
    </v-btn>
<!--    <v-alert :text="alertText" :type="alertType" class="mb-10" v-if="alertType"></v-alert>-->
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
          class="mt-4"
          color="success"
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
  <v-row
    justify="center"
    class="ma-2">
    <v-col cols="4" class="text-center font-weight-bold">Résultat : {{ correctAnswer }} / {{ totalAnswer }}</v-col>
    <v-col cols="4" class="text-center font-weight-bold">Mots restant : {{ this.dictionnary.length }}</v-col>
  </v-row>
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
        v-for="answer in answers"
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
</template>

<script setup>
  import axios from "axios";
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
      spreadsheetId: '1yel8v6senTa0V_1gdLKhe3DrrEXJNClzBJnui2_VdM4',
      token: 'AIzaSyC9y2WeQpUkzWazP_99VHFIlNA6GbwZa_c',
      sheetName: 'Translation',
      loaded: false,
      alertText: '',
      alertType: '',
      correctAnswer: 0,
      totalAnswer: 0,
      answers: [],
      mode: 'random'
    }
  },
  watch: {
    loaded: function (val) {
      if (val) {
        this.createEnterListner();
      }
    }
  },
  async mounted() {
    console.log('before import');
    console.log(this.$route.query);
    this.mode = this.$route.query.mode;
    var url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.sheetName}?key=${this.token}`;
    let data = await axios.get(url)
      .then(function (response) {
        let values = response.data.values;
        values.shift();
        return values;
      })
      .catch(function (error) {
        console.log(error);
      });
    data.forEach(element => {
      const t = {
        'french': element[0].toLowerCase(),
        'english': element[1].toLowerCase(),
        'category': element[2]
      };
      this.dictionnary.push(t);
    });
    this.loaded = true;
    console.log(this.dictionnary);
    console.log('after import');
    this.chooseATranslation();
  },
  methods: {
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
        }
      }
      this.totalAnswer++;
      this.chooseATranslation();
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
