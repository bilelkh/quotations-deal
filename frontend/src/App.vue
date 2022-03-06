<template>
  <sidenav
    :custom_class="this.$store.state.settings.mcolor"
    :class="[
      this.$store.state.settings.isTransparent,
      this.$store.state.settings.isRTL ? 'fixed-end' : 'fixed-start',
    ]"
    v-if="this.$store.state.settings.showSidenav"
  />
  <main
    class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
    :style="this.$store.state.settings.isRTL ? 'overflow-x: hidden' : ''"
  >
    <!-- nav -->
    <navbar
      :class="[navClasses]"
      :textWhite="this.$store.state.settings.isAbsolute ? 'text-white opacity-8' : ''"
      :minNav="navbarMinimize"
      v-if="this.$store.state.settings.showNavbar"
    />
    <router-view />
    <app-footer v-show="this.$store.state.settings.showFooter" />
    <configurator
      :toggle="toggleConfigurator"
      :class="[
        this.$store.state.settings.showConfig ? 'show' : '',
        this.$store.state.settings.hideConfigButton ? 'd-none' : '',
      ]"
    />
  </main>
</template>
<script>
import Sidenav from "./examples/Sidenav";
import Configurator from "@/examples/Configurator.vue";
import Navbar from "@/examples/Navbars/Navbar.vue";
import AppFooter from "@/examples/Footer.vue";
import { mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    Sidenav,
    Configurator,
    Navbar,
    AppFooter,
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky": this
          .$store.state.settings.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2": this.$store.state.settings
          .isAbsolute,
        "px-0 mx-4 mt-4": !this.$store.state.settings.isAbsolute,
      };
    },
  },
  beforeMount() {
    this.$store.state.settings.isTransparent = "bg-transparent";
  },
};
</script>
