<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder text-info text-gradient">
                    Welcome To Quotations Deals
                  </h4>
                </div>
                <div class="card-body">
                  <form
                    class="text-start"
                    @submit.prevent="handleLogin"
                    ref="form"
                  >
                    <label>Email</label>
                    <vsud-input
                      type="email"
                      placeholder="Email"
                      name="email"
                      required
                      v-model="user.email"
                    />
                    <label>Password</label>
                    <vsud-input
                      type="password"
                      placeholder="Password"
                      name="password"
                      required
                      v-model="user.password"
                    />
                    <vsud-switch id="rememberMe" checked>
                      Remember me
                    </vsud-switch>
                    <div class="text-center">
                      <vsud-button
                        class="my-4 mb-2"
                        variant="gradient"
                        color="info"
                        fullWidth
                        >Sign in
                      </vsud-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link :to="'/sign-up'"> Sign up </router-link>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="
                  top-0
                  oblique
                  position-absolute
                  h-100
                  d-md-block d-none
                  me-n8
                "
              >
                <div
                  class="
                    bg-cover
                    oblique-image
                    position-absolute
                    fixed-top
                    ms-auto
                    h-100
                    z-index-0
                    ms-n6
                  "
                  :style="{
                    backgroundImage:
                      'url(' +
                      require('@/assets/img/curved-images/curved14.jpg') +
                      ')',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import VsudInput from "@/components/VsudInput.vue";
import VsudSwitch from "@/components/VsudSwitch.vue";
import VsudButton from "@/components/VsudButton.vue";
import * as yup from "yup";

export default {
  name: "sign-in",
  components: {
    VsudInput,
    VsudSwitch,
    VsudButton,
  },
  beforeMount() {
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
    const schema = yup.object().shape({
      name: yup.string().required("Name is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
     user:{
      email:"",
      password:"",
     }
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/dashboard");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>
