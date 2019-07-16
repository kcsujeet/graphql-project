<template>
  <div class="container-fluid p-0 m-0 h-100 w-100">
    <div v-if="showMainMenu" class="row w-100 h-100 p-0 m-0">
      <div class="col-md-2 left-box-shadow">
        <nav class="nav flex-column bg-white h-100 d-flex">
          <router-link class="nav-link mt-5 mb-5" active-class to="/" exact>
            <h6 class="text-purple">postsApp</h6>
          </router-link>
          <h6 class="nav-link text-muted">categories</h6>
          <router-link class="nav-link" to="/category/accessories">
            <i class="fas fa-mitten text-purple"></i>
            <p class="text-dark-gray">accessories</p>
          </router-link>
          <router-link class="nav-link" to="/category/automobiles">
            <i class="fas fa-truck text-purple"></i>
            <p class="text-dark-gray">automobiles</p>
          </router-link>
          <router-link class="nav-link" to="/category/handsets">
            <i class="fas fa-mobile-alt text-purple"></i>
            <p class="text-dark-gray">handsets</p>
          </router-link>
          <router-link class="nav-link" to="/category/electronic">
            <i class="fas fa-desktop text-purple"></i>
            <p class="text-dark-gray">electronic</p>
          </router-link>


          <h6 class="nav-link text-muted mt-4">me</h6>
          <router-link class="nav-link" to="/" exact>
            <i class="fas fa-home text-purple"></i>
            <p class="text-dark-gray">home</p>
          </router-link>
          <router-link v-if="isLoggedIn" class="nav-link" to="/profile">
            <i class="far fa-user text-purple"></i>
            <p class="text-dark-gray">profile</p>
          </router-link>
          <router-link v-if="isLoggedIn" class="nav-link" to="/myads">
            <i class="fas fa-poll text-purple"></i>
            <p class="text-dark-gray">my ads</p>
          </router-link>
          <a @click="logout()" v-if="isLoggedIn" class="nav-link">
            <i class="fas fa-sign-out-alt text-purple"></i>
            <p class="text-dark-gray">logout</p>
          </a>
          <router-link v-if="!isLoggedIn" class="nav-link" to="/login">
            <i class="fas fa-sign-in-alt text-purple"></i>
            <p class="text-dark-gray">login</p>
          </router-link>
          <router-link v-if="!isLoggedIn" class="nav-link" to="/signup">
            <i class="fas fa-user-plus text-purple"></i>
            <p class="text-dark-gray">signup</p>
          </router-link>
        </nav>
      </div>
      <div class="col-md-7">
        <router-view></router-view>
      </div>
      <div class="col-md-3 left-box-shadow">
        <div class="form-group has-search">
          <span class="fa fa-search form-control-feedback"></span>
          <input type="text" class="form-control" placeholder="search" />
        </div>
        <div class="row">
          <div class="col-md-12">
            <h6 class="text-dark-gray mt-4 mb-2 font-weight-bold">Recent Activities</h6>
            <ul class="list-group">
              <Activity />
              <Activity />
              <Activity />
              <Activity />
              <Activity />
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <h6 class="text-dark-gray mt-4 mb-2 font-weight-bold">Top Contributers</h6>
            <ul class="list-group">
              <Activity />
              <Activity />
              <Activity />
              <Activity />
              <Activity />
            </ul>
          </div>
        </div>
      </div>
    </div>
    <router-view name="secondRouterView"></router-view>
  </div>
</template>

<script>
import Activity from "./components/Activity";

export default {
  name: "App",
  components: {
    Activity,
  },
  data() {
    return {
      isLoggedIn: false,
      treeData: [{
        name: "My Tree",
        children: [
          { name: "hello" },
          { name: "wat" },
          {
            name: "child folder",
            children: [
              {
                name: "child folder",
                children: [{ name: "hello" }, { name: "wat" }]
              },
              { name: "hello" },
              { name: "wat" },
              {
                name: "child folder",
                children: [{ name: "hello" }, { name: "wat" }]
              }
            ]
          }
        ]
      }]
    };
  },
  computed: {
    showMainMenu() {
      const loginRoute = this.$route.name == "Login" ? true : false;
      const signupRoute = this.$route.name == "Register" ? true : false;
      const pageNotFoundRoute =
        this.$route.name == "PageNotFound" ? true : false;
      const showMainMenu = !loginRoute && !signupRoute && !pageNotFoundRoute;
      return showMainMenu ? true : false;
    },
    
  },
  methods: {
    logout() {
      this.$apollo.mutate({
        mutation: require('./graphql/mutation/clientSide/toggleIsLoggedIn.gql'),
        variables: {
          bool_value: false
        }
      }).then (resp => {
        localStorage.removeItem('isLoggedIn')
        this.$router.push({ path: "/" });
      }).catch( error => {
        alert(error)
      })
    }
  },
  apollo: {
    isLoggedIn: {
      query: require('./graphql/query/clientSide/isLoggedIn.gql')
    }
  }, 

};
</script>
<style lang="scss">
@import url("./styles/app.scss");
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
nav.nav {
  a {
    padding-left: 3rem;
    border-left: 5px;
    cursor: pointer;
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
.container-fluid {
  display: flex;
}

h6.nav-link {
  padding-left: 3rem;
}

.has-search {
  input {
    border-radius: 1.2rem;
  }
  .form-control-feedback {
    cursor: pointer !important;
    box-shadow: -2px 1px 3px 0px rgba(185, 173, 173, 0.8);
    background: #6a75ca;
    border-radius: 1.2rem;
    color: white;
    right: 1rem;
    position: absolute;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    transition: 0.2s ease-in-out;
    &:hover {
      box-shadow: 0px 0px 3px 3px rgba(185, 173, 173, 0.6);
    }
  }
}
</style>

