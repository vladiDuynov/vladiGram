<!-- Sidebar component -->
<template>
  <div class="new-post-container">
    <div class="new-post-header">
      <span>Create new Post</span>
      <button v-if="this.post.imgUrl"  @click="createNewPost" class="login-container-button">Share</button>
    </div>
    
    <span v-if="this.post.imgUrl"><img class="new-post-img-preview" :src="this.post.imgUrl" alt="" /></span>
    <div v-else>
      <span><i v-html="$getSvg('addMedia')" style="flex-grow: 1; max-width: 100%;"></i></span>
      <p>Drag photos and videos here</p>
    </div>
    
    
    <form class="login-form" @submit.prevent="createNewPost()">
        <ImgUploader v-if="!this.post.imgUrl" @uploaded="onUploaded" />
        <!-- <button class="login-container-button">Post</button> -->
    </form>

  </div>
</template>
  
<script>

import ImgUploader from './ImgUploader.vue'

export default {
  name: 'Sidebar',
  data() {
    return {

      post:{
        txt: '',
        imgUrl: '',
        createdAt: Date.now(),
        by: {

        },
        loc: {
            lat: 11,
            lng: 22,
            name: ''
        },
        comments: [
        ],
        likedBy: [],
        tags: ["fun",
            "kids"]
    }
    }
  },

  methods: {
    async createNewPost(){
      if(this.loggedinUser)
        
        try {
          await this.$store.dispatch({ type: "addPost", post: this.post}) 
          this.$emit('close')
          this.$router.push('/')
        } catch (err) {
          console.log(err)
          this.msg = 'Failed to Upload a new post'
        }
      
    },

    onUploaded(imgUrl) {
      this.post.imgUrl = imgUrl
    }
  },

  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },

  components: {
    ImgUploader
  },


}
</script>
  

  