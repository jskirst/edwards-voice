<template>
  <div class='ui basic content center aligned segment'>
    <div class='ui centered card'>
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <input v-model="text" type='text'>
          </div>
          <div v-for="(answer, name) in answers">
            <div class='select' v-if="answer.input_type == 'select'">
              <select v-model="answer.input">
                <option v-bind:name="name" v-for="(value, key) in answer.options" v-bind:value="key">{{value}}</option>
              </select>
            </div>
            <div class='short-text' v-if="answer.input_type == 'short_text'">
              <input type='text' v-bind:placeholder="name" v-model="answer.input">
            </div>
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="stepForward()">
              Next
            </button>
            <button class='ui basic red button' v-on:click="stepBack()">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['step'],
  data() {
    return {
      text: this.step.step.text,
      answers: this.step.step.answers
    };
  },
  methods: {
    stepBack() {
      this.$emit('step-back')
    },
    stepForward() {
      this.$emit('step-forward')
    }
  },
};
</script>
