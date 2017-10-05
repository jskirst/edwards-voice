import Part from './components/Part.vue';
import Step from './components/Step.vue';
import StepList from './components/StepList.vue';
import Vue from 'vue'
import Vuetify from 'vuetify'

const EdwardsVoice = {
  install(Vue, options) {
    Vue.component(Part.name, Part)
    Vue.component(Step.name, Step)
    Vue.component(StepList.name, StepList)
    Vue.use(Vuetify)
  }
};

export default EdwardsVoice;
