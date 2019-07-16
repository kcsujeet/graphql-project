<template>
      <div class="row my-3">
        <div class=" col-md-12 display-flex justify-content-center align-items-center">
          <div class="form-container">
            <form class="border-thin p-3 border-radius-1 diplay-flex justify-content-center flex-direction-column text-center" @submit.prevent="submit">
              <h5>Add Post</h5>
              <b-form-input
                class="form-control"
                v-model="post_form.title"
                :class= "{ 'is-invalid' : titleErrors.length != 0}"
                label="title"
                placeholder="title"
                outline
                @input="$v.post_form.title.$touch()"
                @blur="$v.post_form.title.$touch()"
              ></b-form-input>
              <ul v-if="titleErrors" class="p-0 m-0">
                <li class="text-danger text-sm p-0 m-0 text-left" v-for="(error,index) in titleErrors" :key="index"><small>{{error}}</small></li>
              </ul>
              <b-form-input
                class="form-control mb-3"
                v-model="post_form.description"
                type="text"
                placeholder="description"
                :class = "{ 'is-invalid': descriptionErrors.length != 0}"
                label="description"
                outline
                @input="$v.post_form.description.$touch()"
                @blur="$v.post_form.description.$touch()"
              ></b-form-input>
               <ul v-if="descriptionErrors" class="p-0 m-0">
                <li class="text-danger text-sm p-0 m-0 text-left" v-for="(error,index) in descriptionErrors" :key="index"><small>{{error}}</small></li>
              </ul>
              <button class="custom-btn mt-3" type="submit">add</button>
            </form>
          </div>
        </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "AddPost",
  data() {
    return {
      post_form: {
        title: "",
        description: ""
      }
    };
  },
  validations: {
    post_form: {
      title: { required },
      description: { required }
    }
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.post_form.title.$dirty) return errors;
      !this.$v.post_form.title.required && errors.push("Title is required");
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.post_form.description.$dirty) return errors;
      !this.$v.post_form.description.required && errors.push("Title is required");
      return errors;
    }
  },
  methods: {
    submit(event) {
     this.$emit('new_post', this.post_form)
     this.post_form.title = null
     this.post_form.description = null
     this.$v.$reset()
    }
  }
};
</script>

<style lang="scss" scoped>
@import url('../styles/login-signup.scss');
</style>
