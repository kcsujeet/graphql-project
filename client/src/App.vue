<template>
  <div class="container-fluid p-0 m-0 h-100 bg-ice">
    <div v-if="showMainMenu" class="row w-100 h-100">
      <div class="col-md-2 left-box-shadow pr-0">
        <nav class="nav flex-column bg-white w-100 h-100">
          <router-link class="nav-link  mt-5 mb-5" active-class="" to="/" exact>
            <h6 class="text-purple">postsApp</h6>
          </router-link>
          <router-link class="nav-link text-muted " to="#">categories</router-link>
          <router-link class="nav-link " to="#">
            <i class="fas fa-mitten text-purple"></i>
            <p class="text-dark-gray">accessories</p>
          </router-link>
          <router-link class="nav-link" to="#">
            <i class="fas fa-truck text-purple"></i>
            <p class="text-dark-gray">automobiles</p>
          </router-link>
          <router-link class="nav-link" to="#">
            <i class="fas fa-mobile-alt text-purple"></i>
            <p class="text-dark-gray">handsets</p>
          </router-link>
          <router-link class="nav-link" to="#">
            <i class="fas fa-desktop text-purple"></i>
            <p class="text-dark-gray">electronic</p>
          </router-link>

          <router-link class="nav-link text-muted mt-4" to="#">me</router-link>
          <router-link class="nav-link" to="/" exact>
            <i class="fas fa-home text-purple"></i>
            <p class="text-dark-gray">home</p>
          </router-link>
          <router-link class="nav-link " to="/profile">
            <i class="far fa-user text-purple"></i>
            <p class="text-dark-gray">profile</p>
          </router-link>
          <router-link class="nav-link " to="#">
            <i class="fas fa-poll text-purple"></i>
            <p class="text-dark-gray">my ads</p>
          </router-link>
          <router-link class="nav-link " to="#">
            <i class="fas fa-sign-out-alt text-purple"></i>
            <p class="text-dark-gray">logout</p>
          </router-link>
          <router-link class="nav-link " to="/login">
            <i class="fas fa-sign-in-alt text-purple"></i>
            <p class="text-dark-gray">login</p>
          </router-link>
          <router-link class="nav-link " to="/signup">
            <i class="fas fa-user-plus text-purple"></i>
            <p class="text-dark-gray">signup</p>
          </router-link>
        </nav>
      </div>
      <div class="col-md-7 bg-ice">
        <router-view></router-view>
      </div>
      <div class="col-md-3 left-box-shadow"></div>
    </div>
    <router-view name="secondRouterView"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    
  }),
  computed: {
    showMainMenu(){
      const loginRoute = (this.$route.name == 'Login') ? true : false
      const signupRoute = (this.$route.name == 'Register') ? true :false
      const pageNotFoundRoute = (this.$route.name == 'PageNotFound') ? true : false
      const showMainMenu = !loginRoute && !signupRoute && !pageNotFoundRoute
      return showMainMenu ? true : false 
    }
  }
};
</script>
<style lang="scss">
@import url("./app.scss");
nav.nav {
  a {
    padding-left: 3rem;
    border-left: 5px;
    i {
      width: 1rem;
    }
    p {
      font-size: 85%;
      display: inline;
      margin-left: 1rem;
    }
  }
}
.container-fluid{
  display: flex;
}
</style>

