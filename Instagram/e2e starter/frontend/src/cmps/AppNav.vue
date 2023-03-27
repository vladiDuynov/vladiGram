<template>
  <nav class="app-nav">
    <RouterLink to="/"><i v-html="$getSvg('home')" style="flex-grow: 1; max-width: 100%;"></i></RouterLink>
    <RouterLink to="/"><i v-html="$getSvg('search')" style="flex-grow: 1; max-width: 100%;"></i></RouterLink>
    <RouterLink to="/login/"><i v-html="$getSvg('inbox')" style="flex-grow: 1; max-width: 100%;"></i></RouterLink>
    <RouterLink to="/"><i v-html="$getSvg('like')" style="flex-grow: 1; max-width: 100%;"></i></RouterLink> 

     <RouterLink v-if="this.loggedinUser" :to="`/${this.loggedinUser.username}`">
        <img  class="nav-bar-img-user" :src="this.loggedinUser.imgUrl" alt=""/>
      </RouterLink>


  </nav>
</template>

<script>
import { userService } from '../services/user.service.js'
export default {
  name: 'AppNav',

  methods:{
    test(){
      const liked = userService.getLoggedinUser()
      console.log(liked);

    },

  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  }
}
</script>

