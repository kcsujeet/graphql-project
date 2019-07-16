import Router from 'vue-router'
import Vue from 'vue'
import Home from './views/Home.vue'
import Register from './views/Signup.vue'
import Login from './views/Login.vue'
import Profile from './views/Profile.vue'
import PageNotFound from './views/PageNotFound.vue'
import Category from './views/Category.vue'
import Accessories from './views/categories/Accessories.vue'
import Automobiles from './views/categories/Automobiles.vue'


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
            path: '/category',
            component: Category,
            children: [
              {
                path: 'accessories',
                component: Accessories
              }, {
                path: 'automobiles',
                component: Automobiles
              }
            ]
          },
          {
            path: "*", 
            name: 'PageNotFound',
            components: {
                secondRouterView: PageNotFound 
            }
          },
          
    ]
})