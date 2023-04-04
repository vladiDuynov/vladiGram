import { createRouter, createWebHashHistory } from 'vue-router'
import AppIndex from './views/AppIndex.vue'
// import Chat from './views/Chat.vue'
import LoginSignup from './views/LoginSignup.vue'
import NewPost from './cmps/NewPost.vue'
import UserDetails from './views/UserDetails.vue'

const routes = [
  {
    path: '/',
    component:AppIndex
  },
  // {
  //   path: '/chat',
  //   name: 'Chat',
  //   component: Chat
  // },
  {
    path: '/login',
    name: 'LoginSignup',
    component: LoginSignup,
    meta: { requiresLogin: true ,requiresNav:true}
  },
  {
    path: '/newpost',
    name: 'NewPost',
    component: NewPost
  },

  {
    path: '/:id',
    name: 'UserDetails',
    component: UserDetails,
    meta: { requiresLogin: true}
  },
  // {
  //   path: '/user/:id',
  //   name: 'UserDetails',
  //   component: UserDetails
  // } 
]
export const router = createRouter({
  routes,
  history: createWebHashHistory()
  // base: process.env.BASE_URL,
})

