<template>
  <div class='step'>
    <part v-for="part in parts" :part="part"></part>
  </div>
</template>

<script>
import Part from './Part';

export default {
  props: ['step'],
  components: {
    Part
  },
  data() {
    return {
      parts: this.step.step.parts
    };
  }
};
</script>
