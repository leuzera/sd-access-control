<template>
  <v-layout align-start justify-space-around row>
    <v-flex xs12 sm8 md6>
      <v-item-group>
        <v-item v-for="build in buildings" :key="build._id">
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ build.name }}</h3>
                <p>{{ build.occupancy }}/{{ build.max_capacity }}</p>
              </div>
            </v-card-title>
            <v-card-text>
              <v-data-table :headers="headers" :items="build.floors" hide-actions>
                <template v-slot:items="floor">
                  <td>{{ floor.item.number }}</td>
                  <td>{{ floor.item.occupancy }}</td>
                  <td>{{ floor.item.capacity }}</td>
                  <td class="justify-center layout px-0">
                    <v-icon small @click="deleteFloor(floor.item)">mdi-delete</v-icon>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions>
              <v-btn flat @click="editBuild(build)">Editar</v-btn>
              <v-btn flat @click="deleteBuild(build)">Excluir</v-btn>
            </v-card-actions>
          </v-card>
        </v-item>
      </v-item-group>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Andar", value: "number" },
        { text: "Ocupação", value: "occupancy" },
        { text: "Capacidade", value: "capacity" },
        { text: "", value: "name", sortable: false }
      ],
      buildings: [],
      errors: []
    };
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
      console.log("edit ", build);
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

    editFloor(floor) {
      console.log("edit ", floor);
    },

    deleteFloor(floor) {
      console.log("delete ", floor);
    }
  }
};
</script>
