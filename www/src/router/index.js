import Vue from 'vue'
import Router from 'vue-router'
import Boards from 'components/Boards'
import Board from 'components/Board'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'App',
    //   component: Boards
    // },
    {
      path: '/',
      name: 'Boards',
      component: Boards
    },{
      path: '/boards/:boardId',
      name: 'Board',
      component: Board
    }
  ]
})
