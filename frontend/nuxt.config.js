require("dotenv").config();

import VuetifyLoaderPlugin from "vuetify-loader/lib/plugin";
import pkg from "./package";

export default {
  mode: "spa",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    titleTemplate: "%s - Access Control",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["@/plugins/vuetify"],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    "@nuxtjs/router",
    "@nuxtjs/auth"
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    https: process.env.API_HTTPS
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: "/auth", method: "post", propertyName: "token" },
          logout: false,
          user: { url: "/user", method: "get", propertyName: "user" }
        }
      }
    }
  },

  generate: {
    routes: ["/"]
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
};
