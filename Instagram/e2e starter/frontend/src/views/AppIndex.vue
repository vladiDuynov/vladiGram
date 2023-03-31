<template>
  <section v-if="this.loggedinUser">
    <AppHeader/>
    <PostPreview v-for="post in posts" :post="post" :key="post._id"></PostPreview>
  </section>
  
  <section v-else>
    <p>You need to log in to view this content</p>
  </section>
</template>

<script>

import PostPreview from './PostPreview.vue'
import AppHeader from '../cmps/AppHeader.vue'
export default {
  name: 'home',
  created() {
    this.$store.dispatch({ type: 'loadPosts' , txt: ''})
  },
  data() {
    return {
    }
  },
  components: {
    PostPreview,
    AppHeader
  },
  computed: {
    posts() {
      return this.$store.getters.posts
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },

  },
  mounted() {
    if (!this.loggedinUser) {
      setTimeout(() => {
        this.$router.push('/login')
      }, 2000)
    }
  },

}
</script>


