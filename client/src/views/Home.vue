<template>
  <div class="row justify-content-center">
    <div class="col-md-11">
        <div class="row">
          <h6 class="text-dark-gray mt-4 mb-4 font-weight-bold">All Posts</h6>
        </div>
      <div class="justify-content-center row">
        <div class="col-md-12">
          <post v-for="(post,index) in get_posts" v-bind:post="post" :key="index"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "../components/Post";
export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    Post
  },
  data() {
    return {
      get_posts: []
    };
  },
  apollo: {
    get_posts: {
      query: require("../graphql/get_posts.gql")
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
