import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      component: AppIndex
    },
    {
      path: '/direct/',
      name: 'direct',
      component: Msgs,
      children: [
        {
          path: '/inbox/',
          name: 'msg-list',
          component: MsgList
        },
        {
          path: '/inbox/:id?',
          name: 'msg-details',
          component: MsgDetails
        }
      ]
    },
    {
      path: '/:username',
      name: 'user-area',
      component: userArea
    },

  ]
})

export default router
