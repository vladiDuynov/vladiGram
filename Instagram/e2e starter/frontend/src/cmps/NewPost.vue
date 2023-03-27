<!-- Sidebar component -->
<template>
  <div>
    <p>Here you can create a new Post!</p>
    
    <form @submit.prevent="createNewPost()">
        <h2>New Post</h2>
        <input type="text" v-model="post.txt" placeholder="Post text" />
        <ImgUploader @uploaded="onUploaded" />
        <button>Post</button>
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
  

  