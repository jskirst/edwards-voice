<template>
  <div class='step-list col s12'>
    <step v-for="step in steps" :step.sync="step"></step>
  </div>
</template>

<script type = "text/javascript" >
var axios = require('axios');

import Step from './Step';

export default {
  name: 'step-list',
  components: {
    Step,
  },
  data() {
    return {
      steps: [],
      facts: {},
      api_url: window.edward_api_url
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
      axios.post(this.api_url, {
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

