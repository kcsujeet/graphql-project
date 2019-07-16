<template>
  <div class="row h-100 w-100 justify-content-center">
    <div class="col-md-10 h-100 display-flex align-items-center justify-content-center">
      <div class="row w-75 login-container h-75">
        <div class="col-md-6 p-0">
          <transition
            appear
            disappear
            name="custom-classes-transition"
            enter-active-class="animated fadeInLeft "
            leave-active-class="animated fadeOutRight "
          >
            <div class="overlay h-100 display-flex justify-content-center align-items-center">
              <div class="overlay-panel h-50 w-75">
                <h1>not registered?</h1>
                <p>signup now and start the journey with us</p>
                <router-link to="/signup" class="ghost custom-btn text-white" id="signIn">sign up</router-link>
              </div>
            </div>
          </transition>
        </div>
        <div class="col-md-6 p-0 bg-white display-flex justify-content-center align-items-center">
          <transition
            appear
            disappear
            name="custom-classes-transition"
            enter-active-class="animated fadeInRight "
            leave-active-class="animated fadeOutLeft "
          >
            <div class="form-container w-75">
              <router-link active-class class="home-icon" to="/">
                <i class="fas fa-home"></i>
              </router-link>

              <form
                class="diplay-flex justify-content-center flex-direction-column text-center"
                @submit.prevent="submit"
              >
                <h1>Sign In</h1>
                <div class="social-container">
                  <a href="#" class="social">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" class="social">
                    <i class="fab fa-google-plus-g"></i>
                  </a>
                  <a href="#" class="social">
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
                <b-form-input
                  class="form-control"
                  v-model="input_form.email"
                  :class="{ 'is-invalid' : emailErrors.length != 0}"
                  label="E-mail"
                  placeholder="email"
                  required
                  outline
                  @input="$v.input_form.email.$touch()"
                  @blur="$v.input_form.email.$touch()"
                ></b-form-input>
                <ul v-if="emailErrors" class="p-0 m-0">
                  <li
                    class="text-danger text-sm p-0 m-0 text-left"
                    v-for="(error,index) in emailErrors"
                    :key="index"
                  >
                    <small>{{error}}</small>
                  </li>
                </ul>
                <b-form-input
                  class="form-control mb-3"
                  v-model="input_form.password"
                  type="password"
                  placeholder="password"
                  :class="{ 'is-invalid': passwordErrors.length != 0}"
                  label="Password"
                  outline
                  required
                  @input="$v.input_form.password.$touch()"
                  @blur="$v.input_form.password.$touch()"
                ></b-form-input>
                <ul v-if="passwordErrors" class="p-0 m-0">
                  <li
                    class="text-danger text-sm p-0 m-0 text-left"
                    v-for="(error,index) in passwordErrors"
                    :key="index"
                  >
                    <small>{{error}}</small>
                  </li>
                </ul>
                <router-link to="/" exact>forgot password?</router-link>
                <br />
                <button class="custom-btn mt-3" type="submit">Login</button>
              </form>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "Login",
  data() {
    return {
      input_form: {
        email: "",
        password: ""
      }
    };
  },
  validations: {
    input_form: {
      email: { required, email },
      password: { required }
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.input_form.email.$dirty) return errors;
      !this.$v.input_form.email.email && errors.push("Must be valid e-mail");
      !this.$v.input_form.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.input_form.password.$dirty) return errors;
      !this.$v.input_form.password.required &&
        errors.push("Password is required");
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.input_form.$pending || this.$v.input_form.$error) return;
      this.login();
    },
    login() {
      this.$apollo
        .mutate({
          mutation: require("../graphql/login.gql"),
          variables: {
            email: this.input_form.email,
            password: this.input_form.password
          }
        })
        .then(resp => {
          localStorage.setItem('isLoggedIn', true)
          this.$apollo.mutate({
            mutation: require('../graphql/mutation/clientSide/toggleIsLoggedIn.gql'), 
            variables: {
              bool_value: true
            }
          })
          this.$toastr.s("Logged in successfully.");
          this.$router.push({ name: "Profile" });
        })
        .catch(error => {
          this.$toastr.e("Couldn't login. Try again.");
        });
    }
  },
  apollo: {}
};
</script>

<style lang="scss" scoped>
@import url("../styles/login-signup.scss");
</style>
