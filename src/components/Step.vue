<template>
  <div class='ui basic content center aligned segment'>
    <div class='ui centered card'>
      <div class='content'>
        <div class='ui form'>
          <div class='field'>
            <input v-model="text" type='text'>
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
      text: 'Text',
    };
  },
  methods: {
    stepBack() {
      this.$emit('step-back', this)
    },
    stepForward() {
      this.$emit('step-forward', this)
    },
  },
};
</script>
