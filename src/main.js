/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createStore } from 'vuex'
import router from "@/router";

// Plugins
import { registerPlugins } from '@/plugins'

const store = createStore({
  state () {
    return {
      currentDictionnary: null,
      currentMode: null,
      answers: null
    }
  },
  mutations: {
    setCurrentDictionnary (state, dictionnary) {
      state.currentDictionnary = dictionnary;
    },
    setCurrentMode (state, mode) {
      state.currentMode = mode;
    },
    setAnswers (state, answers) {
      state.answers = answers;
    }
  },
  getters: {
    getCurrentDictionnary (state) {
      return state.currentDictionnary;
    },
    getCurrentMode (state) {
      return state.currentMode;
    },
    getAnswers (state) {
      return state.answers;
    }
  }
})


const app = createApp(App)
  .use(router)
  .use(store)

registerPlugins(app)

app.mount('#app')
