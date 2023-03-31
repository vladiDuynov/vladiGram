<template>
  <header class="app-header">

    <RouterLink to="/"><i class="app-header-logo" v-html="$getSvg('logo')"></i></RouterLink>
    <RouterLink to="/"><i v-html="$getSvg('like')" style="flex-grow: 1; max-width: 100%;"></i></RouterLink> 


  </header>
</template>

<script>

import NewPost from './NewPost.vue'
export default {

  name: 'AppHeader',
   components: {
      NewPost
  },
  data() {
    return {
      
    }
  },

  methods: {
    async createNewPost(){
      if(this.loggedinUser)
        await this.$store.dispatch({ type: "addPost", post: this.post}) 
      
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>