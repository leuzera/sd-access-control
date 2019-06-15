<template>
  <v-flex>
    <v-toolbar flat>
      <v-toolbar-title>{{ $nuxt.$route.name }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Novo Grupo</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Novo Grupo</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="edited.name" label="Nome"></v-text-field>
                  <v-text-field v-model="edited.permission" label="Permissão"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="close">Cancelar</v-btn>
            <v-btn flat @click="saveGroup">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
import querystring from "querystring";

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
      dialog: false,
      editedIndex: -1,
      edited: {
        name: "",
        permissions: ""
      },
      default: {
        name: "",
        permissions: ""
      },
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
    saveGroup() {
      this.$axios
        .post("/groups", querystring.stringify(this.edited))
        .then(res => {
          if (this.editedIndex > -1) {
            Object.assign(this.groups[this.editedIndex], this.edited);
          } else {
            this.groups.push(res.data.group);
          }
          this.close();
        })
        .catch(error => (this.errors = error));
    },

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
