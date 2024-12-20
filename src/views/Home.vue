<template>
  <v-row no-gutters justify="center" class="pt-15">
    <h1>English Game</h1>
  </v-row>
  <v-row
    justify="center"
  >
    <v-col sm="4" xs="12">
      <HomeCard
        title="Mode aléatoire"
        subTitle="Le mot sera demandé aléatoirement en anglais ou en français."
        @click="setupGame('random')"
      />
      <HomeCard
        title="Mode français"
        subTitle="Le mot est donné en français."
        @click="setupGame('french')"
      />
      <HomeCard
        title="Mode Anglais"
        subTitle="Le mot est donné en anglais."
        @click="setupGame('english')"
      />
    </v-col>
  </v-row>
  <v-row
    justify="center"
  >
    <v-col sm="8" xs="12">
      <v-divider class="py-5"/>
      <v-expansion-panels class="pa-5" variant="popout">
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-icon class="mx-3">mdi-cog</v-icon>
            Configuration de la partie
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <Configuration
              :categories="categories"
              :maxWords="dictionnary.length"
              :countWords="dictionnaryCount"
              @countWordsUpdate="countWordsUpdated"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-icon class="mx-3">mdi-calendar-refresh</v-icon>
            Historique
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <HistoricResult />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script setup>
  import axios from "axios";
  import HomeCard from "@/components/Button/HomeCard.vue";
  import Configuration from "@/components/Configuration.vue";
  import { mapMutations } from 'vuex';
  import HistoricResult from "@/components/HistoricResult.vue";
</script>

<script>
export default {
  data () {
    return {
      sheetName: 'Translation',
      loaded: false,
      spreadsheetId: '1yel8v6senTa0V_1gdLKhe3DrrEXJNClzBJnui2_VdM4',
      token: 'AIzaSyC9y2WeQpUkzWazP_99VHFIlNA6GbwZa_c',
      dictionnary: [],
      categories: [],
      dictionnaryCount: 50
    }
  },
  mounted() {
    console.log('hello');
    this.loadDictionnary();
  },
  methods: {
    ...mapMutations([
      'setCurrentMode',
      'setCurrentDictionnary',
      'setAnswers'
    ]),
    async loadDictionnary () {
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

        if (!this.includesCategory(element[2])) {
          this.categories.push({
            'selected' : true,
            'name': element[2]
          });
        }
        this.dictionnary.push(t);
      });

      this.loaded = true;
    },
    setupGame (path) {
      this.setCurrentMode(path);
      this.setAnswers(null);
      this.setRandomDictionnary();
      this.play();
    },
    play () {
        this.$router.push({ path: '/play'});
    },
    includesCategory (category) {
      return this.categories.some((cat) => cat.name === category);
    },
    countWordsUpdated (value) {
      this.dictionnaryCount = value;
    },
    setRandomDictionnary () {
      let dict = [];
      let copyDict = this.dictionnary;
      let selectedCategories = this.categories.filter((cat) => cat.selected);
      let dictionnaryFill = false;

      while (!dictionnaryFill) {
        const randomIndex = Math.floor(Math.random() * copyDict.length);

        // Si le mot random est dans une des catégories sélectionnées.
        // Alors l'ajouter au dictionnaire de la game.
        if (selectedCategories.some((selectedCat) => selectedCat.name == copyDict[randomIndex].category)) {
          dict.push(copyDict[randomIndex]);
        }
        copyDict.splice(randomIndex, 1);

        // Si la taille du dictionnaire de la game est = à celle de la configuration
        if (dict.length >= this.dictionnaryCount) {
          dictionnaryFill = true;
        }

        // S'il n'y a plus de mots à ajouter.
        if (copyDict.length === 0) {
          dictionnaryFill = true;
        }
      }
      this.setCurrentDictionnary(dict);
    }
  }
}
</script>
