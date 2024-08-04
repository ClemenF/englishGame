<template>
  <v-row
    class="ma-md-16 flex-column"
    v-if="this.currentTrans"
  >
    <v-form ref="form" id="form-translation">
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
          class="border-sm pa-6 text-center bg-white"
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
          class="border-sm pa-6 text-center bg-white"
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

        <v-btn
          class="mt-4"
          color="warning"
          block
          @click="newWord"
        >
          Nouveau mot
        </v-btn>
      </div>
    </v-form>
  </v-row>
  <v-row
    v-else
  >
    <v-btn
      class="mt-4"
      color="warning"
      block
      @click="newWord"
    >
      Demarrer
    </v-btn>
  </v-row>
</template>

<script setup>
  import Papa from "papaparse";
</script>

<script>
export default {
  data () {
    return {
      dialog: [],
      show: [],
      dictionnary: null,
      currentTrans: null,
      frenchWordInput: '',
      englishWordInput: '',
      originLanguage: null
    }
  },
  async mounted() {
    console.log('before import');
    await this.importData();
    console.log('after import');
    this.chooseATranslation();
    this.createEnterListner();
  },
  methods: {
    async importData() {
      await new Promise((resolve) => {
        Papa.parse("../src/data.csv", {
          download: true,
          header: true,
          encoding: "UTF-8",
          complete: function (results) {
            this.dictionnary = results.data;
            console.log('dictionnary init');
            resolve("done");
          }.bind(this)
        });
      });    
    },
    chooseATranslation() {
      const randomIndex = Math.floor(Math.random() * this.dictionnary.length);
      this.currentTrans = this.dictionnary[randomIndex];
      this.dictionnary.splice(randomIndex, 1);
      this.originLanguage = this.chooseOriginLanguage();
      console.log(this.originLanguage);
      console.log(this.currentTrans.english);
      let elementFrenchInput = document.getElementById('frenchWordInput');
      let elementEnglishInput = document.getElementById('englishWordInput');

      if (this.originLanguage == 'french') {
        this.frenchWordInput = this.currentTrans.french;
        this.englishWordInput = '';
        elementFrenchInput.value = this.currentTrans.french;
        elementFrenchInput.disabled = true;
        elementEnglishInput.disabled = false;
        elementEnglishInput.value = '';
        elementEnglishInput.focus();
      } else if (this.originLanguage == 'english') {
        this.englishWordInput = this.currentTrans.english;
        this.frenchWordInput = '';
        elementFrenchInput.value = '';
        elementEnglishInput.value = this.currentTrans.english;
        elementEnglishInput.disabled = true;
        elementFrenchInput.disabled = false;
        elementFrenchInput.focus();
      }
    },
    chooseOriginLanguage() {
      const num = Math.floor(Math.random() * 2); // generates a random number
      const arr = ["french", "english"]; // create array of strings
      return arr[num];
    },
    validate () {
      console.log('english : ', this.englishWordInput);
      console.log('french : ', this.frenchWordInput);
      if (this.originLanguage == 'french') {
        if (this.englishWordInput === this.currentTrans.english) {
          alert('correct');
        }
      } else if (this.originLanguage == 'english') {
        if (this.frenchWordInput === this.currentTrans.french) {
          alert('correct');
        }
      }
      this.chooseATranslation();
    },
    newWord() {
      this.chooseATranslation();
      this.createEnterListner();
    },
    createEnterListner() {
      console.log('create');
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
