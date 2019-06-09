import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify, {
  iconfont: "mdi",
  theme: {
    primary: "#9c27b0",
    secondary: "#03a9f4",
    accent: "#673ab7",
    error: "#f44336",
    warning: "#ffc107",
    info: "#ffeb3b",
    success: "#4caf50"
  }
});
