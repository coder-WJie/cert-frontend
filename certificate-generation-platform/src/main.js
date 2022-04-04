import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'

// 导入echarts
import * as  echarts from 'echarts'
console.log('echarts',echarts);
Vue.prototype.$echarts = echarts


Vue.use(ElementUI);

// 配置请求根路径
// axios.defaults.baseURL = 'http://192.168.43.17:8081/';
// axios.defaults.baseURL = 'https://43.135.79.92:8081/';
// axios.defaults.baseURL = 'https://certificate.jooks.cn:8081/';
axios.defaults.baseURL = 'https://ccpc-cert.acmclub.cn:8081/';

Vue.prototype.$http = axios


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
