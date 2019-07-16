import Vue from "vue";
import App from "./App.vue";
import VueApollo from "vue-apollo"
import apolloProvider from './graphql/apollo'
import router from './router'
import VueToastr from "vue-toastr";

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueApollo)
Vue.use(VueToastr, {
  defaultTimeout: 3000,
  defaultProgressBar: true,
  defaultProgressBarValue: 0,
  defaultType: "error",
  defaultPosition: "toast-bottom-right",
  defaultCloseOnHover: false,
});

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  router,
  render: function (h) {
    return h(App);
  }
}).$mount("#app");
