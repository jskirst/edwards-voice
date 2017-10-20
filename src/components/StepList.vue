<template>
  <div class='step-list col s12'>
    <step v-for="step in steps" :step.sync="step" v-on:cta_clicked="emitCtaClicked(step)"></step>
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
    emitCtaClicked(step) {
      this.$emit('cta_clicked', step);
    },
    stepBack() {
      const stepsIndex = this.steps.length - 1;
      this.steps.splice(stepsIndex, 1);
    },
    stepForward() {
      if(this.steps.length > 0){
        var lastStep = this.steps[this.steps.length -1]
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
        if (response.data.token) {
          var index = _this.steps.length-1;
          if ((_this.steps.length > 0) && (_this.steps[_this.steps.length-1].token == response.data.token)) {
            _this.steps.pop();
          }
        }
        _this.steps.push(response.data);
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

