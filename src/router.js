import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      beforeEnter: (to, from ,next) => {
        let expired_at = localStorage.getItem('expired_at')
        let token = localStorage.getItem('token')
        if (expired_at != null && expired_at > Math.floor(Date.now()/1000) && token != null) {
          next('/')
        }
        next()
      }
    },
    {
      path: '/nodes',
      name: 'NodesList',
      component: () => import('./views/NodesList.vue')
    },
    {
      path: '/node/:name',
      name: 'Node',
      component: () => import('./views/Node.vue')
    },
    {
      path: '/deploys',
      name: 'DeploymentsList',
      component: () => import('./views/DeploymentsList.vue')
    },
    {
      path: '/pods',
      name: 'PodsList',
      component: () => import('./views/PodsList.vue')
    },
    {
      path: '/images',
      name: 'ImagesList',
      component: () => import('./views/ImagesList.vue')
    },
    {
      path: '/deploy/create',
      name: 'DeployCreate',
      component: () => import('./views/DeployCreate.vue')
    },

    //路由404
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
