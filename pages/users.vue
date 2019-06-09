<template>
  <v-flex>
    <v-toolbar flat>
      <v-toolbar-title>{{ $nuxt.$route.name }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
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
    }
  }
};
</script>
