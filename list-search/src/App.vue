<template>
  <v-app>
    <v-layout>
      <v-main>
        <v-container><router-view /></v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
.white-icon .v-icon {
  color: white !important;
}
</style>
