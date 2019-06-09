<template>
  <v-app>
    <v-toolbar fixed app>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-toolbar-items class="hidden-sm-and-down" v-for="(page, i) in pages" :key="i" router exact>
        <v-btn :to="page.to" flat>{{page.title}}</v-btn>
      </v-toolbar-items>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; Leonardo Moraes Fleury - 2019 Instituto de Informática, UFG</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      pages: [
        {
          icon: "apps",
          title: "Home",
          to: "/"
        },
        {
          icon: "domain",
          title: "Prédios",
          to: "/builds"
        },
        {
          icon: "account",
          title: "Usuários",
          to: "/users"
        },
        {
          icon: "account-multiple",
          title: "Grupos",
          to: "/groups"
        }
      ],
      rightDrawer: false,
      title: "Access Control"
    };
  }
};
</script>
