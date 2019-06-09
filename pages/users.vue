<template>
  <v-layout align-start justify-space-around row>
    <v-flex xs12 sm8 md6>
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
    </v-flex>
  </v-layout>
</template>

<script>
export default {
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
