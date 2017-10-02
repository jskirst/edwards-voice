import Vue from 'vue'
import Router from 'vue-router'
import StepList from '@/components/StepList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StepList',
      component: StepList
    }
  ]
})
