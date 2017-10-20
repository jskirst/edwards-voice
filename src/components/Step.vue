<template>
  <div class='step'>
    <part v-for="part in parts" :part="part"></part>
    <div v-if="cta"  v-on:click="emitCtaClicked()" class="cta">{{ cta }}</div>
  </div>
</template>

<script>
import Part from './Part';

export default {
  name: 'step',
  props: ['step'],
  components: {
    Part
  },
  methods: {
    emitCtaClicked() {
      this.$emit('cta_clicked');
    }
  },
  data() {
    return {
      token: this.step.step.token,
      parts: this.step.step.parts,
      cta: this.step.step.cta
    };
  }
};
</script>
