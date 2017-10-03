<template>
  <div class="part">
    <span v-if="part.type == 'text'" class="part-text">{{ part.content }}</span>
    <div v-if="part.type == 'answer'" class="input-field inline">
      <v-select v-model="part.answer.input" v-if="part.answer.input_type == 'select'" :items="part.answer.options">
      </v-select>
      <v-text-field type='text' v-model="part.answer.input" v-if="part.answer.input_type == 'short_text'"></v-text-field>
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

<style scoped>
  .part { display: inline-block; }
</style>

