<template>
  <div class='step-list col s12'>
    <step v-for="step in steps" :step.sync="step"></step>
    <div class='ui two button attached buttons'>
      <v-btn fab dark class="indigo" v-on:click="stepBack()">
        <v-icon dark>remove</v-icon>
      </v-btn>

      <v-btn fab dark class="indigo" v-on:click="stepForward()">
        <v-icon dark>add</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script type = "text/javascript" >
var axios = require('axios');
import Step from './Step';

export default {
  components: {
    Step,
  },
  data() {
    return {
      steps: [],
      facts: {}
    }
  },
  methods: {
    stepBack() {
      const stepsIndex = this.steps.length - 1;
      this.steps.splice(stepsIndex, 1);
    },
    stepForward() {
      if(this.steps.length > 0){
        var lastStep = this.steps[this.steps.length -1].step
        var parts = lastStep.parts;
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          if(part.type != 'text'){
            this.facts[part.name] = part.input;
          }
        }
      }
      var _this = this
      axios.post('https://edward-api.herokuapp.com/api/steps', {
        facts: this.facts,
      })
      .then(function (response) {
        _this.steps.push({ step: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  created() {
    this.stepForward();
  }
};
</script>

<style scoped>
</style>

