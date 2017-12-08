<template>
  <div class="part part--newline" v-if="part.type == 'newline'"></div>
  <div class="part" v-else>
    <div v-if="part.type == 'text'" class="part-text" v-bind="part">{{ part.content }}</div>
    <div v-if="part.type == 'choice'" class="part__choice" v-bind="part" v-on:click.stop="makeChoice">{{ part.content }}</div>
    <v-select v-model="part.input" v-if="part.type == 'select'" :items="part.options" placeholder="...."></v-select>
    <v-text-field v-model="part.input" v-if="part.type == 'short_text'" placeholder="......" :type="part.text_field_type" :style="{ width: part.characters + 'ch'}" :mask="mask" :class="{ 'part--simple': simple }" dark required></v-text-field>
    <input type='hidden' v-if="part.type == 'hidden'" :value="part.value"/>
    <a v-if="part.type == 'link'" v-bind="part" v-on:click.stop="emitEvent">{{ part.content }}</a>
  </div>
</template>

<script>
export default {
  name: 'part',
  props: {
    part: {
      type: Object,
      default: function() { {} }
    },
    simple: {
      type: Boolean,
      default: function() {
        if (platform.name == "Opera" && parseFloat(platform.version) < 36) {
          return true;
        }

        if (platform.name == 'Safari' && parseFloat(platform.version) < 10) {
          return true;
        }
        return false;
      }
    },
    mask: {
      type: String,
      default: function() {
        if (this.part.type != "short_text" || !this.part.mask) {
          return null;
        }

        if (md.is('iOS') && md.version < 10) {
          return null;
        }

        if (platform.name == "Opera" && parseFloat(platform.version) < 36) {
          return null;
        }

        if (platform.name == "IE" && parseFloat(platform.version) < 12) {
          return null;
        }

        if (platform.name == 'Safari' && parseFloat(platform.version) < 10) {
          return null;
        }
        return this.part.mask
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    emitEvent() {
      this.$emit(this.part.click);
    },
    makeChoice() {
      this.$emit('choice', this);
    }
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
    padding: 0;
    white-space: pre-wrap;
    margin-right: 0.3em;
  }

  .input-group--text-field {
    padding: 0;
  }

  .part .input-group__details {
    min-height: 0px;
  }

  .part .part--simple .input-group__details {
    display: none;
  }

  .input-group--text-field input {
    font-size: 20px;
    width: 6em;
    padding: 0;
  }

  .input-group--select .input-group__selections__comma {
    font-size: 20px;
  }
</style>

