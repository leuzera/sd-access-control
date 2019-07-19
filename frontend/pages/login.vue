<template>
  <v-flex>
    <v-toolbar flat>
      <v-toolbar-title>{{ $nuxt.$route.name }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <v-layout align-start justify-space-around row>
      <v-flex xs7 offset-xs5 offset-md2 offset-lg5>
        <form>
          <v-text-field v-model="username" label="Nome de Usuário" data-vv-name="username" required></v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            label="Senha"
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>
          <v-btn @click="login">Entrar</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  middleware: ["auth"],
  head: {
    title: "Login"
  },
  data() {
    return {
      showPassword: false,
      username: "",
      password: "",
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;
      return this.$auth
        .loginWith("local", {
          data: {
            username: this.username,
            password: this.password
          }
        })
        .then(() => {})
        .catch(e => {
          this.error = e + "";
        });
    }
  }
};
</script>
