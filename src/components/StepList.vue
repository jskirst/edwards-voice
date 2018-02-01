<template>
  <div class='step-list col s12'>
    <step v-for="step in steps" :step.sync="step" v-on:step_back="stepBack()" v-on:step_forward="stepForward" v-on:cta_clicked="emitCtaClicked(step)" v-on:choice="makeChoice"></step>
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
var ply = require('babel-polyfill');
var axios = require('axios');

import Step from './Step';

window.load = function () {
  var ls = window.localStorage
  var facts = ls.getItem("facts");
  if(!facts){
    return {}
  } else {
    return JSON.parse(decodeURIComponent(ls.getItem("facts")));
  }
}

window.save = function (data, expires, path) {
  var exdate=new Date();
  var ls = window.localStorage
  ls.setItem("facts", encodeURIComponent(JSON.stringify(data)));
}

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
    geolocation: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    _facts: {
      type: Object,
      default: function() {
        console.log('Loading facts...');
        return window.load();
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

    makeChoice(part) {
      var new_facts = decodeURIComponent(part.part.facts);
      new_facts = new_facts.split('&');
      for (var i = 0; i < new_facts.length; i++) {
        var fact = new_facts[i];
        var fact_parts = fact.split('=')
        this.facts[fact_parts[0]] = fact_parts[1];
      }
      this.stepForward();
    },

    currentStep: function() {
      return this.steps[this.steps.length -1]
    },

    compileFacts() {
      var parts = this.currentStep().parts;
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
    },

    setLastInteraction(){
      var lastTime = this.previousFacts[this.previousFacts.length-1].last_interaction || 0;
      var currentTime = new Date().getTime() / 1000;
      this.facts.last_interaction = currentTime;
      if(lastTime > 0) {
        this.facts.last_interaction_seconds = currentTime - lastTime;
      } else {
        this.facts.last_interaction_seconds = 0;
      }
    },

    stepBack() {
      this.facts.last_interaction = null;
      this.facts.last_interaction_seconds = null;
      this.previousFacts.pop();
      this.steps.pop();
      this.steps.pop();
      this.previousFacts[this.previousFacts.length-1].last_interaction = null;
      this.previousFacts[this.previousFacts.length-1].last_interaction_seconds = null;
      while(JSON.stringify(this.previousFacts[this.previousFacts.length-1]) == JSON.stringify(this.facts)){
        this.previousFacts.pop();
        this.previousFacts[this.previousFacts.length-1].last_interaction = null;
        this.previousFacts[this.previousFacts.length-1].last_interaction_seconds = null;
        this.steps.pop();
      }
      this.facts = Object.assign({}, this.previousFacts[this.previousFacts.length-1]);
      this.stepForward();
    },

    stepForward() {
      window.save(this.facts);
      var step_count = this.steps.length;
      if(step_count > 0){
        this.setLastInteraction();
        this.compileFacts();
        if (this.transition) {
          this.currentStep().active = false;
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
            if (_this.currentStep().token == next_step.token) {
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
    if(this.geolocation) {
      var _this = this;
      navigator.geolocation.getCurrentPosition(
        function(position) {
          _this.facts.position = position.coords.latitude + "," + position.coords.longitude;
          _this.stepForward();
        },
      )
    } else {
      this.stepForward();
    }
  }
};
</script>

