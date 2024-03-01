import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueEsign from 'vue-esign'
import back from   './api/back.js'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(vueEsign)
Vue.use(back)

const whiteList = [
    '/login',
    '/entrance/select-action',
    '/paiBan'

]

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    const token = localStorage.getItem("login_token");
    if (to.path === '/login' && token) {
        next();
    }
    if (whiteList.indexOf(to.path) !== -1) {
        next();
    } else {
        if (token) {
            next()
        } else {
            router.push({name:'login'})
        }
    }
})
router.afterEach((to,from)=>{
    /*if(ap) {
        ap.setNavigationBar(to.meta.title);
    }*/
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
