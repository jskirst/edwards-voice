<template>
  <div>
    <step v-on:step-back="stepBack" v-on:step-forward="stepForward" v-for="step in steps" :step.sync="step"></step>
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
        console.log(lastStep);
        var answers = lastStep.answers;
        for (var fact_name in answers) {
          this.facts[fact_name] = answers[fact_name].input;
        }
      }
      var _this = this
      axios.post('http://edward-api.herokuapp.com/api/steps', {
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
p.steps {
  text-align: center;
}
</style>

