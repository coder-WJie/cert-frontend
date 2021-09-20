import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
import axios from 'axios'

Vue.use(ElementUI);

// 配置请求根路径
// axios.defaults.baseURL = 'http://192.168.43.17:8081/';

Vue.prototype.$http = axios


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
