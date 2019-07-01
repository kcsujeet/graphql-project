<template>
  <div class="card">
      <div class="card-header">
          Add Post
      </div>
      <div class="card-body">
    <form novalidate class="p-3">
      <input class="form-control"
        v-model="post_form.title"
        required
        :error-messages="titleErrors"
        label="Title"
        outline
        @input="$v.post_form.title.$touch()"
        @blur="$v.post_form.title.$touch()"
      />
      <input class="form-control"
        v-model="post_form.description"
        required
        :error-messages="descriptionErrors"
        label="Description"
        outline
        @input="$v.post_form.description.$touch()"
        @blur="$v.post_form.description.$touch()"
      />
      <v-btn @click="submit" color="success">Submit</v-btn>
    </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

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
    titleErrors() {},
    descriptionErrors() {}
  },
  methods: {
    submit() {}
  }
};
</script>

<style>
</style>
