<template>
  <div id="app" class="row">
    <v-app dark>
      <v-container fluid>
        <step-list ref="steplist"></step-list>
        <v-btn v-on:click="emitNext">Next</v-btn>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    emitNext() {
      this.$refs.steplist.stepForward();
    }
  }
}
</script>
