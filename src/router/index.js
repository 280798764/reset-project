import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'
import login from './routes/login'
// import homepage from './routes/homepage'
import NetworkInfo from './routes/NetworkInfo'
import DeviceMonitor from './routes/DeviceMonitor'

Vue.use(Router)

const router = new Router({
  routes: [
    ...login,
    // ...homepage,
    ...NetworkInfo,
    ...DeviceMonitor,
    {
      path: '/*',
      redirect: to => {
        return '/login'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 页面调整 去除iview 提示信息
  iview.Notice.destroy()
  next()
})

export default router
