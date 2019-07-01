<template>
<div class="row h-100 w-100 justify-content-center">
    <div class="col-md-10 h-100 display-flex align-items-center justify-content-center">
      <div class="row w-75 login-container h-75">
        <div class="col-md-6 p-0">
          <div class="overlay h-100 display-flex justify-content-center align-items-center">
            <div class="overlay-panel h-50 w-75">
              <h1>already registered?</h1>
              <p>signin and start posting ads</p>
              <router-link to="/login" class="ghost custom-btn text-white" id="signIn">login</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-6 p-0 bg-white display-flex justify-content-center align-items-center">
          <router-link active-class="" class="home-icon" to='/'><i class="fas fa-home "></i></router-link>
          <div class="form-container w-75">
            <form class="diplay-flex justify-content-center flex-direction-column text-center">
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
             <input class="form-control"
              v-model="input_form.name"
              :error-messages="nameErrors"
              :counter="20"
              label="Name"
              placeholder="name"
              required
              outline
              @input="$v.input_form.name.$touch()"
              @blur="$v.input_form.name.$touch()"
            />
            <input class="form-control"
              v-model="input_form.email"
              :error-messages="emailErrors"
              label="E-mail"
              placeholder="email"
              required
              outline
              @input="$v.input_form.email.$touch()"
              @blur="$v.input_form.email.$touch()"
            />
            <input class="form-control"
              v-model="input_form.password"
              type="password"
              :error-messages="passwordErrors"
              label="Password"
              outline
              required
              placeholder="password"
              @input="$v.input_form.password.$touch()"
              @blur="$v.input_form.password.$touch()"
            />
            <input class="form-control"
              v-model="input_form.password_confirmation"
              type="password"
              :error-messages="passwordConfirmationErrors"
              label="Password Confirmation"
              required
              outline
              placeholder="confirm password"
              @input="$v.input_form.password_confirmation.$touch()"
              @blur="$v.input_form.password_confirmation.$touch()"
            />

            <div class="custom-btn mt-3" @click="submit">Signup</div>
            </form>
          </div>
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
          mutation: require("../graphql/signup.gql"),
          variables: {
            email: this.input_form.email,
            password: this.input_form.password,
            name: this.input_form.name
          }
        })
        .then(data => {
          // Result
          console.log(data);
        })
        .catch(error => {
          // Error
          console.error(error);
        });
    }
  },
  apollo: {}
};
</script>

<style lang="scss" scoped>
@import url('../styles/login-signup.scss');
</style>
