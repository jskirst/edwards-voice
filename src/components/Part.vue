<template>
  <div class="part">
    <div v-if="part.type == 'text'" class="part-text">{{ part.content }}</div>
    <div v-if="part.type == 'answer'">
      <v-select v-model="part.answer.input" v-if="part.answer.input_type == 'select'" :items="part.answer.options"></v-select>
      <v-text-field v-model="part.answer.input" v-if="part.answer.input_type == 'short_text'" dark single-line></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  props: ['part'],
  data() {
    return {
      part: this.part
    };
  }
};
</script>

<style>
 .part {
    display: inline-block;
    font-size: 20px;
  }
  
  .part-text {
    padding: 10px 0 0 0;
  }

 .input-group--text-field {
    padding: 13px 0 0 10px;
  }

  .input-group--text-field input {
    font-size: 20px;
    width: 6em;
  }
</style>

