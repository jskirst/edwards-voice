<template>
  <div class='step-list col s12'>
    <step v-for="step in steps" :step.sync="step" v-on:step_back="stepBack()" v-on:step_forward="stepForward" v-on:cta_clicked="emitCtaClicked(step)"></step>
    <v-dialog v-model="error">
      <v-card>
        <v-card-title class="headline">Oops!</v-card-title>
        <v-card-text>{{ errorMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click.native="error = false">Got it</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    _facts: {
      type: Object,
      default: function() { return {} }
    },
    validClient: {
      type: Boolean,
      default: function() {
        var MobileDetect = require('mobile-detect');
        var md = new MobileDetect(window.navigator.userAgent);
        if (md.is('iOS') && md.version('iOS') < 10){
          return false;
        }
        return true;
      }
    }
  },
  data() {
    return {
      steps: [],
      previousFacts: [],
      error: false,
      errorMessage: "",
      facts: this._facts
    }
  },
  methods: {
    emitCtaClicked(step) {
      this.$emit('cta_clicked', step);
    },
    passesValidation(part){
      if(part.min){
        if(parseFloat(part.input) < part.min){
          this.error = true;
          this.errorMessage = "You must enter at least " + part.min + " to proceed.";
          return false;
        }
      }
      if(part.max){
        if(parseFloat(part.input) > part.max){
          this.error = true;
          this.errorMessage = "You must enter no more than " + part.max + " to proceed.";
          return false;
        }
      }
      return true;
    },
    stepBack() {
      this.previousFacts.pop();
      this.steps.pop();
      this.steps.pop();
      this.facts = Object.assign({}, this.previousFacts[this.previousFacts.length-1]);
      this.stepForward();
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
          } else if(part.type != 'text' && part.type != 'link'){
            if(this.passesValidation(part)){
              this.facts[part.name] = part.input;
            } else {
              return false
            }
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
          _this.previousFacts.push(Object.assign({}, _this.facts));
        },1000);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
  created() {
    if(this.validClient){
      this.stepForward();
    } else {
      console.log("Stopping Edward - invalid client");
      this.$emit('invalid_client');
    }
  }
};
</script>

