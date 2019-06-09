<template>
  <v-flex>
    <v-toolbar flat>
      <v-toolbar-title>{{ $nuxt.$route.name }}</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Novo Usuário</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Novo Usuário</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="edited.name" label="Nome"></v-text-field>
                  <v-text-field v-model="edited.password" label="Senha"></v-text-field>
                  <v-text-field v-model="edited.group" label="Grupo"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="close">Cancelar</v-btn>
            <v-btn flat @click="saveUser">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-layout align-start justify-space-around row>
      <v-data-table :headers="headers" :items="users" hide-actions>
        <template v-slot:items="user">
          <td>{{ user.item.name }}</td>
          <td>{{ user.item.group.name }}</td>
          <td class="justify-space-around layout px-0">
            <v-icon small @click="editUser(user.item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteUser(user.item)">mdi-delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-layout>
  </v-flex>
</template>

<script>
import querystring from "querystring";

export default {
  head: {
    title: "Usuários"
  },
  data() {
    return {
      headers: [
        { text: "Nome", value: "name" },
        { text: "Grupo", value: "group" },
        { text: "", value: "name", sortable: false }
      ],
      users: [],
      dialog: false,
      editedIndex: -1,
      edited: {
        name: "",
        password: "",
        group: ""
      },
      default: {
        name: "",
        password: "",
        group: ""
      },
      errors: []
    };
  },
  mounted() {
    this.$axios
      .get("/users")
      .then(res => {
        this.users = res.data.users;
      })
      .catch(error => this.errors.push(error));
  },
  methods: {
    saveUser() {
      this.$axios
        .post("/users", querystring.stringify(this.edited))
        .then(res => {
          if (this.editedIndex > -1) {
            Object.assign(this.users[this.editedIndex], this.edited);
          } else {
            this.users.push(res.data.result);
          }
          this.close();
        })
        .catch(error => this.errors.push(error));
    },

    editUser(user) {
      console.log("edit ", user);
    },

    deleteUser(user) {
      this.$axios
        .delete("/user/" + user.name)
        .then(() => {
          const index = this.users.indexOf(user);
          this.users.splice(index, 1);
        })
        .catch(error => this.errors.push(error));
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.edited = Object.assign({}, this.default);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>
