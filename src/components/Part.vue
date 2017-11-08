<template>
  <div class="part part--newline" v-if="part.type == 'newline'"></div>
  <div class="part" v-else>
    <div v-if="part.type == 'text'" class="part-text" v-bind="part">{{ part.content }}</div>
    <v-select v-model="part.input" v-if="part.type == 'select'" :items="part.options" placeholder="...."></v-select>
    <v-text-field v-model="part.input" v-if="part.type == 'short_text'" placeholder="......" :type="part.text_field_type" :style="{ width: part.characters + 'ch'}" :mask="part.mask" dark required></v-text-field>
    <input type='hidden' v-if="part.type == 'hidden'" :value="part.value"/>
  </div>
</template>

<script>
export default {
  name: 'part',
  props: ['part'],
  data() {
    return {};
  }
};
</script>

<style>
  .part {
    display: inline-block;
    font-size: 20px;
  }

  .part.part--newline {
    display: block;
    height: 0;
  }

  .part-text {
    padding: 10px 0 0 0;
    white-space: pre-wrap;
    margin-right: 0.3em;
  }

  .input-group--text-field {
    padding: 0;
  }

  .part .input-group__details {
    min-height: 0px;
  }

  .input-group--text-field input {
    font-size: 20px;
    width: 6em;
  }

  .input-group--select .input-group__selections__comma {
    font-size: 20px;
  }
</style>

