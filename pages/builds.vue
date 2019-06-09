<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-item-group>
        <v-item v-for="build in buildings" :key="build.name">
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ build.name }}</h3>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat>Editar</v-btn>
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
      buildings: [],
      errors: []
    };
  },
  mounted() {
    this.$axios
      .get("buildings")
      .then(res => {
        this.buildings = res.data.buildings;
      })
      .catch(error => this.errors.push(error));
  }
};
</script>
