<template>
  <div class='step'>
    <part v-for="part in parts" :part="part"></part>
    <div v-if="step.cta !== undefined" v-bind:click="emitCtaClicked" class="cta">{{ step.cta }}</div>
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
      parts: this.step.step.parts,
      cta: this.step.step.cta
    };
  }
};
</script>
