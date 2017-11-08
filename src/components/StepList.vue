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
  props: {
    api_url: {
      type: String
    },
    transition: {
      type: String
    },
    facts: {
      type: Object,
      default: function() { return {} }
    }
  },
  data() {
    return {
      steps: []
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
      var step_count = this.steps.length;
      var current_step = this.steps[this.steps.length -1]
      if(step_count > 0){
        var parts = current_step.parts;
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          if(part.type == 'hidden'){
            this.facts[part.name] = part.value;
          } else if(part.type != 'text'){
            this.facts[part.name] = part.input;
          }
        }

        if (this.transition) {
          current_step.active = false;
        }
      }
      var _this = this
      axios.post(this.api_url, {
        facts: this.facts,
      })
      .then(function (response) {
        var next_step = response.data
        if (step_count > 0) {
          if (next_step.token) {
            if (current_step.token == next_step.token) {
              _this.steps.pop();
            }
          }
        }
        if(_this.transition) {
          next_step.transition = _this.transition
        }
        next_step.active = true
        setTimeout(function(){
          _this.steps.push(next_step);
        },1000);
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

