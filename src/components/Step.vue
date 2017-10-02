<template>
  <div class='ui basic content center aligned segment'>
    <div class='ui centered card'>
      <div class='content'>
        <div class='ui form'>
          <span v-for="part in parts">
            <span v-if="part.type == 'text'">{{ part.content }}</span>
            <span v-if="part.type == 'answer'">
              <select v-model="part.answer.input" v-if="part.answer.input_type == 'select'">
                <option v-for="(value, key) in part.answer.options" v-bind:value="key">{{value}}</option>
              </select>
              <input type='text' v-model="part.answer.input" v-if="part.answer.input_type == 'short_text'">
            </span>
          </span>
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
      parts: this.step.step.parts
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
