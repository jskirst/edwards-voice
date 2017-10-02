<template>
  <div>
    <step v-on:step-back="stepBack" v-on:step-forward="stepForward" v-for="step in steps" :step.sync="step"></step>
  </div>
</template>

<script type = "text/javascript" >

import Step from './Step';

export default {
  components: {
    Step,
  },
  data() {
    return {
      steps: [
        {
          text: "starting text"
        }
      ]
    }
  },
  methods: {
    stepBack(step) {
      const stepsIndex = this.steps.indexOf(step);
      this.steps.splice(stepsIndex, 1);
    },
    stepForward(step) {
      axios.post('http://', {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.steps.push({ text: 'text' });
    }
  },
};
</script>

<style scoped>
p.steps {
  text-align: center;
}
</style>

