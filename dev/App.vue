<template>
  <div id="app" class="row">
    <v-app dark>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
