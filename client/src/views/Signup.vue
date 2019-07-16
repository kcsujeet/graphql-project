<template>
  <div class="row h-100 w-100 justify-content-center">
    <div class="col-md-10 h-100 display-flex align-items-center justify-content-center">
      <div class="row w-75 login-container h-75">
        <div class="col-md-6 p-0">
          <transition appear disappear name="custom-classes-transition" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight ">
            <div v-if="true" class="overlay h-100 display-flex justify-content-center align-items-center">
              <div class="overlay-panel h-50 w-75">
                <h1>already registered?</h1>
                <p>signin and start posting ads</p>
                <router-link to="/login" class="ghost custom-btn text-white" id="signIn">login</router-link>
              </div>
            </div>
          </transition>
        </div>
        <div class="col-md-6 p-0 bg-white display-flex justify-content-center align-items-center">
          <transition appear disappear name="custom-classes-transition" enter-active-class="animated slideInRight " leave-active-class="animated slideOutLeft ">
            <div v-if="true" class="form-container w-75">
                          <router-link active-class class="home-icon" to="/">
              <i class="fas fa-home"></i>
            </router-link>
              <form
                class="diplay-flex justify-content-center flex-direction-column text-center"
                @submit.prevent="submit"
              >
                <h1>Sign Up</h1>
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
                <span>or use your account</span>
                <input
                  class="form-control"
                  v-model="input_form.name"
                  :class="{ 'is-invalid' : nameErrors.length != 0}"
                  :counter="20"
                  label="Name"
                  placeholder="name"
                  outline
                  @input="$v.input_form.name.$touch()"
                  @blur="$v.input_form.name.$touch()"
                />
                <ul v-if="nameErrors" class="p-0 m-0">
                  <li
                    class="text-danger text-sm p-0 m-0 text-left"
                    v-for="(error,index) in nameErrors"
                    :key="index"
                  >
                    <small>{{error}}</small>
                  </li>
                </ul>
                <input
                  class="form-control"
                  v-model="input_form.email"
                  :class="{ 'is-invalid' : emailErrors.length != 0}"
                  label="E-mail"
                  placeholder="email"
                  outline
                  @input="$v.input_form.email.$touch()"
                  @blur="$v.input_form.email.$touch()"
                />
                <ul v-if="emailErrors" class="p-0 m-0">
                  <li
                    class="text-danger text-sm p-0 m-0 text-left"
                    v-for="(error,index) in emailErrors"
                    :key="index"
                  >
                    <small>{{error}}</small>
                  </li>
                </ul>
                <input
                  class="form-control"
                  v-model="input_form.password"
                  type="password"
                  :class="{ 'is-invalid' : passwordErrors.length != 0}"
                  label="Password"
                  outline
                  placeholder="password"
                  @input="$v.input_form.password.$touch()"
                  @blur="$v.input_form.password.$touch()"
                />
                <ul v-if="passwordErrors" class="p-0 m-0">
                  <li
                    class="text-danger text-sm p-0 m-0 text-left"
                    v-for="(error,index) in passwordErrors"
                    :key="index"
                  >
                    <small>{{error}}</small>
                  </li>
                </ul>
                <input
                  class="form-control"
                  v-model="input_form.password_confirmation"
                  type="password"
                  :class="{'is-invalid': passwordConfirmationErrors.length != 0}"
                  label="Password Confirmation"
                  outline
                  placeholder="confirm password"
                  @input="$v.input_form.password_confirmation.$touch()"
                  @blur="$v.input_form.password_confirmation.$touch()"
                />
                <ul v-if="passwordConfirmationErrors" class="p-0 m-0">
                  <li
                    class="text-danger text-sm p-0 m-0 text-left"
                    v-for="(error,index) in passwordConfirmationErrors"
                    :key="index"
                  >
                    <small>{{error}}</small>
                  </li>
                </ul>

                <button class="custom-btn mt-3" type="submit">signup</button>
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
  name: "Register",
  data() {
    return {
      input_form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  validations: {
    input_form: {
      name: { required, maxLength: maxLength(20) },
      email: { required, email },
      password: { required },
      password_confirmation: { required }
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.input_form.name.$dirty) return errors;
      !this.$v.input_form.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.input_form.name.required && errors.push("Name is required.");
      return errors;
    },
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
      if (
        this.input_form.password_confirmation != "" &&
        this.input_form.password != this.input_form.password_confirmation
      ) {
        errors.push("Passwords don't match");
      }
      return errors;
    },
    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.input_form.password_confirmation.$dirty) return errors;
      !this.$v.input_form.password_confirmation.required &&
        errors.push("Password is required");
      if (this.input_form.password != this.input_form.password_confirmation) {
        errors.push("Passwords don't match");
      }
      return errors;
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.input_form.$pending || this.$v.input_form.$error) return;
      this.signup();
    },
    signup() {
      this.$apollo
        .mutate({
          mutation: require("../graphql/mutation/signup.gql"),
          variables: {
            email: this.input_form.email,
            password: this.input_form.password,
            name: this.input_form.name
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
          this.$toastr.s("Signed up successfully");
          this.$router.push({ name: "Profile" });
        })
        .catch(error => {
          this.$toastr.e("Couln't sign up. Try again.")
        });
    }
  },
  apollo: {}
};
</script>

<style lang="scss" scoped>
@import url("../styles/login-signup.scss");
</style>
