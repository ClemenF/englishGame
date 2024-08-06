<template>
  <v-row
    class="ma-12 flex-column"
    v-show="loaded"
  >
    <v-alert :text="alertText" :type="alertType" class="mb-10" v-if="alertType"></v-alert>
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
      alertType: ''
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
        'french': element[0],
        'english': element[1]
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
      this.dictionnary.splice(randomIndex, 1);
      this.originLanguage = this.chooseOriginLanguage();
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
      const num = Math.floor(Math.random() * 2); // generates a random number
      const arr = ["french", "english"]; // create array of strings
      return arr[num];
    },
    validate () {
      if (this.originLanguage == 'french') {
        if (this.englishWordInput === this.currentTrans.english) {
          this.alertText = 'Correct';
          this.alertType = 'success';
        } else {
          this.alertText = 'Pas Correct - ' + this.currentTrans.english;
          this.alertType = 'error';
        }
      } else if (this.originLanguage == 'english') {
        if (this.frenchWordInput === this.currentTrans.french) {
          this.alertText = 'Correct';
          this.alertType = 'success';
        } else {
          this.alertText = 'Pas Correct - ' + this.currentTrans.french;
          this.alertType = 'error';
        }
      }
      this.chooseATranslation();
    },
    newWord() {
      this.chooseATranslation();
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
