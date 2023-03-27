import Vuex from 'vuex'

import { userStore } from './user.store.js'
import { postStore } from './post.store.js'
import { reviewStore } from './review.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    userStore,
    postStore,
    reviewStore
  },
  state: {
  },
  mutations: {
  },
  actions: {
  }
})
