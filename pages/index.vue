<template>
  <v-flex>
    <v-toolbar flat>
      <v-toolbar-title>{{ $nuxt.$route.name }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <v-layout align-start justify-space-around row></v-layout>
  </v-flex>
</template>

<script>
export default {
  head: {
    title: "Home"
  }
};
</script>
