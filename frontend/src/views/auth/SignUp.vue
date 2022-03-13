<template>
  <div
    class="
      pt-5
      m-3
      page-header
      align-items-start
      min-vh-50
      pb-11
      border-radius-lg
    "
    :style="{
      backgroundImage:
        'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
    }"
  >
    <span class="mask bg-gradient-dark opacity-6"></span>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mx-auto text-center col-lg-5">
          <h1 class="mt-5 mb-2 text-white">Welcome!</h1>
          <p class="text-white text-lead">Quotes Generator</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
      <div class="mx-auto col-xl-4 col-lg-5 col-md-7">
        <div class="card z-index-0">
          <div class="card-body">
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <vsud-input
                  type="text"
                  placeholder="Name"
                  aria-label="Name"
                  v-model="name"
                />
              </div>
              <div class="mb-3">
                <vsud-input
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <vsud-input
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  v-model="password"
                />
              </div>
              <vsud-checkbox id="flexCheckDefault" checked>
                I agree the
                <a href="javascript:;" class="text-info font-weight-bolder"
                  >Terms and Conditions</a
                >
              </vsud-checkbox>

              <div class="text-center">
                <vsud-button
                  color="info"
                  fullWidth
                  variant="gradient"
                  class="my-4 mb-2"
                  >Sign up</vsud-button
                >
              </div>
              <p class="text-sm mt-3 mb-0">
                Already have an account?
                <router-link :to="'/sign-in'"> Sign in </router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
import VsudCheckbox from "@/components/VsudCheckbox.vue";
import VsudButton from "@/components/VsudButton.vue";
// import * as yup from "yup";

export default {
  name: "sign-up",
  components: {
    VsudInput,
    VsudCheckbox,
    VsudButton,
  },
  created() {
    this.$store.state.settings.hideConfigButton = true;
    this.$store.state.settings.showNavbar = false;
    this.$store.state.settings.showSidenav = false;
    this.$store.state.settings.showFooter = false;
  },
  beforeUnmount() {
    this.$store.state.settings.hideConfigButton = false;
    this.$store.state.settings.showNavbar = true;
    this.$store.state.settings.showSidenav = true;
    this.$store.state.settings.showFooter = true;
  },
  data() {
    return {
    name:"",
    email:"",
    password:"",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleRegister(user) {
      console.log(this.name, this.email, this.password)
      this.message = "";
      this.successful = false;
      this.loading = true;
      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>
