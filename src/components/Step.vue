<template>
  <transition :name="transition">
    <div class='step' v-if="step.active">
      <part v-for="part in parts" :part="part"></part>
      <div v-if="cta"  v-on:click="emitCtaClicked" class="cta">
        <a v-if="cta_href" :href="cta_href" :class="cta_class">{{ cta }}</a>
        <v-btn v-if="!cta_href && cta_class == 'button'" large>{{ cta }}</v-btn>
        <div v-else :class="cta_class">{{ cta }}</div>
      </div>
    </div>
  </transition>
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
      this.$emit('cta_clicked', this);
    }
  },
  data() {
    return {
      token: this.step.token,
      parts: this.step.parts,
      cta: this.step.cta,
      cta_class: this.step.cta_class,
      cta_href: this.step.cta_href,
      transition: this.step.transition
    };
  }
};
</script>
