import Router from 'vue-router'
import Vue from 'vue'
import Home from './views/Home.vue'
import Register from './views/Signup.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import PageNotFound from './views/PageNotFound.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            name: 'Home',
            component: Home
          },{
              path: '/signup',
              name: 'Register',
              components: {
                secondRouterView: Register
            }
          },{
            path: '/login',
            name: 'Login',
            components:{
                secondRouterView: Login
            }
          },{
              path:'/profile',
              name: 'Profile',
              component: Profile
          },
          {
            path: "*", 
            name: 'PageNotFound',
            components: {
                secondRouterView: PageNotFound 
            }
          }
    ]
})