import { createStore } from "vuex";
import { auth } from "./auth.module";
import { settings } from "./settings.module";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    auth,
    settings,
  },
});