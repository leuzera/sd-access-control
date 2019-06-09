<template>
  <v-flex>
    <v-toolbar flat>
      <v-toolbar-title>{{ $nuxt.$route.name }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <v-layout align-start justify-space-around row>
      <v-data-table :headers="headers" :items="groups" hide-actions>
        <template v-slot:items="group">
          <td>{{ group.item.name }}</td>
          <td>{{ group.item.permissions }}</td>
          <td class="justify-space-around layout px-0">
            <v-icon small @click="editGroup(group.item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteGroup(group.item)">mdi-delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  head: {
    title: "Grupos"
  },
  data() {
    return {
      headers: [
        { text: "Grupo", value: "name" },
        { text: "Permição", value: "permissions" },
        { text: "", value: "name", sortable: false }
      ],
      groups: [],
      error: ""
    };
  },
  mounted() {
    this.$axios
      .get("/groups")
      .then(res => {
        this.groups = res.data.groups;
      })
      .catch(error => {
        this.error = error;
      });
  },
  methods: {
    editGroup(group) {
      console.log("edit ", group);
    },

    deleteGroup(group) {
      this.$axios
        .delete("/group/" + group.name)
        .then(() => {
          const index = this.groups.indexOf(group);
          this.groups.splice(index, 1);
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>
