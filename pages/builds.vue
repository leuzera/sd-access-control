<template>
  <v-flex>
    <v-toolbar flat>
      <v-toolbar-title>{{ $nuxt.$route.name }}</v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-dialog v-model="buildDialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Novo Prédio</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedBuild.name" label="Nome"></v-text-field>
                  <v-text-field v-model="editedBuild.group" label="Grupo"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="close">Cancelar</v-btn>
            <v-btn flat @click="saveBuild">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-layout align-start justify-space-around row>
      <v-card v-for="build in buildings" :key="build._id">
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ build.name }}</h3>
              <p>Capacidade: {{ build.max_capacity }}</p>
            </div>
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="build.floors" hide-actions>
              <template v-slot:items="floor">
                <td>{{ floor.item.number }}</td>
                <td>{{ floor.item.capacity }}</td>
                <td class="justify-center layout px-0">
                  <v-icon small @click="deleteFloor(floor.item)">mdi-delete</v-icon>
                </td>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-dialog v-model="floorDialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn flat v-on="on">Novo Piso</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Novo Piso</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedFloor.name" label="Nome"></v-text-field>
                        <v-text-field v-model="editedFloor.capacity" label="Capacidade"></v-text-field>
                        <v-text-field v-model="editedFloor.group" label="Grupo"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat @click="close">Cancelar</v-btn>
                  <v-btn flat @click="createFloor">Salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn flat @click="editBuild(build)">Editar</v-btn>
            <v-btn flat @click="deleteBuild(build)">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-layout>
  </v-flex>
</template>

<script>
import querystring from "querystring";

export default {
  head: {
    title: "Prédios"
  },
  data() {
    return {
      headers: [
        { text: "Andar", value: "number", sortable: false },
        { text: "Capacidade", value: "capacity", sortable: false },
        { text: "", value: "name", sortable: false }
      ],
      buildings: [],
      buildDialog: false,
      buildIndex: -1,
      editedBuild: {
        name: "",
        group: ""
      },
      defaultBuild: {
        name: "",
        group: ""
      },
      floorDialog: false,
      floorIndex: -1,
      editedFloor: {
        name: "",
        group: "",
        capacity: 0
      },
      defaultFloor: {
        name: "",
        group: "",
        capacity: 0
      },
      errors: []
    };
  },
  computed: {
    formTitle() {
      return this.buildIndex === -1 ? "Novo Prédio" : "Editar Prédio";
    }
  },
  mounted() {
    this.$axios
      .get("/buildings")
      .then(res => {
        this.buildings = res.data.buildings;
      })
      .catch(error => this.errors.push(error));
  },
  methods: {
    editBuild(build) {
      this.buildIndex = this.buildings.indexOf(build);
      this.editedBuild = Object.assign({}, build);
      this.buildDialog = true;
    },

    deleteBuild(build) {
      this.$axios
        .delete("/building/" + build.name)
        .then(() => {
          const index = this.buildings.indexOf(build);
          this.buildings.splice(index, 1);
        })
        .catch(error => this.errors.push(error));
    },

    saveBuild() {
      this.$axios
        .post("/buildings", querystring.stringify(this.editedBuild))
        .then(() => {
          if (this.buildIndex > -1) {
            Object.assign(this.buildings[this.buildIndex], this.editedBuild);
          } else {
            this.buildings.push(this.editedBuild);
          }
          this.close();
        })
        .catch(error => this.errors.push(error));
    },

    createFloor() {
      console.log("create floor");
    },

    editFloor(floor) {
      console.log("edit ", floor);
    },

    deleteFloor(floor) {
      console.log("delete ", floor);
    },

    close() {
      this.buildDialog = false;
      setTimeout(() => {
        this.editedBuild = Object.assign({}, this.defaultBuild);
        this.buildIndex = -1;
      }, 300);
    }
  }
};
</script>
