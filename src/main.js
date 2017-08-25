import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueScroller from 'vue-scroller';
import indexPage from './pages/index.vue'
import  detailPage from './pages/detail.vue'
import classificationPage from './pages/classification.vue'
import registerPage from './pages/register.vue'
import loginPage from './pages/login.vue'
import aaPage from './personal/aa.vue'
import personal_indexPage from './pages/personal_index'
import classification_detailPage from './pages/classification-details.vue'
import personal_myaccountPage from './pages/personal_myaccount.vue'
import shopping_cartPage from './pages/shopping_cart.vue'
import personal_accountsafePage from './pages/personal_accountsafe.vue'
import personal_setTelPage from './personal/personal_setTel.vue'
import personal_integrationPage from './personal/personal_integration'
import personal_paySuccessPage from './personal/personal_paySuccess'
import personal_balancePayPage from './personal/personal_balancePay'
import personal_addAddressPage from  './personal/personal_addAddress'
import receipt_addressPage from './personal/receipt_address'
import personal_infoPage from './pages/personal_info'
import personal_rankPage from './pages/personal_rank'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import { Validator } from 'vee-validate';
import axios from 'axios';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);
Vue.use(MintUI);
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
axios.defaults.withCredentials=true;
Validator.addLocale(zh_CN);
Vue.config.productionTip = false;
Vue.prototype.HOST = '/api';
Vue.use(VueScroller);
//Vue.use(VeeValidate);
Vue.use(VeeValidate, {
  locale: 'zh_CN',
});
//Vue.use(Validator);
Vue.use(VueRouter);
Vue.use(VueResource);
let router = new VueRouter({
  mode: 'history',
  routes: [
   { path: '/', component: indexPage },
   { path: '/detail/:type', component: detailPage },
   { path: '/classification', component: classificationPage },
   { path: '/register', component: registerPage },
   { path: '/login', component: loginPage },
   { path: '/aa', component: aaPage },
   { path: '/personal_index', component: personal_indexPage },
   { path: '/classification_detail/:type', component: classification_detailPage , meta: { keepAlive: true }},
   { path: '/personal_myaccount', component: personal_myaccountPage },
   {path:'/shopping_cart',component:shopping_cartPage},
   {path:'/personal_accountsafe',component:personal_accountsafePage},
   {path:'/personal_info',component:personal_infoPage},
   {path:'/personal_rank',component:personal_rankPage},
   {path:'/personal_setTel',component:personal_setTelPage},
   {path:'/personal_integration',component:personal_integrationPage},
   {path:'/personal_paySuccess',component:personal_paySuccessPage},
   {path:'/personal_balancePay/:type',component:personal_balancePayPage},
   {path:'/receipt_address',component:receipt_addressPage},
   {path:'/personal_addAddress',component:personal_addAddressPage}

  ]
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

