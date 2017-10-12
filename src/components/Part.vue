<template>
  <div class="part">
    <div v-if="part.type == 'text'" class="part-text">{{ part.content }}</div>
    <v-select v-model="part.input" v-if="part.type == 'select'" :items="part.options" placeholder="...."></v-select>
    <v-text-field v-model="part.input" v-if="part.type == 'short_text'" placeholder="......" :type="part.text_field_type" :style="{ width: part.characters + 'ch'}" dark required></v-text-field>
  </div>
</template>

<script>
export default {
  name: 'part',
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
    white-space: pre-wrap;
  }

 .input-group--text-field {
    padding: 13px 0 0 0;
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

