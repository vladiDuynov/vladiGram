<template>
  <div class="post-preview">
    <header class="preview-header">
      <RouterLink :to="`/${this.post.by.username}`">
        <img class="post-preview-img-user" :src="post.by.imgUrl" alt=""/>
      </RouterLink>
      <h4 class="post-preview-username">{{ post?.by?.fullname }}</h4>
    </header>
    <div class="post-preview-img-preview">
      <img :src="post.imgUrl" alt="" style=" width: 100%;" />
    </div>
    <div class="comments-list">
      <div class="actions-container">
        <button @click="likePost" class="post-preview-buttons"><i v-html="$getSvg('like')"></i></button>
        <button @click="addComment" class="post-preview-buttons"><i v-html="$getSvg('comment')"></i></button>
        <button class="post-preview-buttons"><i v-html="$getSvg('share')"></i></button>
      </div>

      <div class="post-preview-likes">
        <label for="liked-by" >Liked by </label>
        <h4  v-for="(lastlike1, i) in lastLiked" :lastlike1="lastlike1" :key="i"> &nbsp; {{ this.lastLike }} &nbsp; </h4>
        <span v-if="moreThanZeroLikes()"> and {{ post.likedBy.length - lastLiked.length }} others</span>
      </div>
      <section v-for="comment in lastThreeComments" :comment="comment" :key="comment.id" style="display: flex;">
        <h4>{{ comment.by.fullname }}</h4> &nbsp; {{ comment.txt }}
      </section>
      <div>
        <input type="text" v-model="comment" placeholder="Add a comment!" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'post-preview',
  props: {
    post: Object,
  },
  data() {
    return {
      comment: '',
      lastLike: '',
      liked: true,
      
    }
  },

  created() {
    const like1 = JSON.parse(JSON.stringify(this.post.likedBy.slice(-1)))
    try {
      this.lastLike = like1[0].fullname
    } catch (error) {
      this.lastLike = ' No one liked this post yet!'
    }
  },

  methods: {
    showWatchedUser() {
      console.log(this.post.by.username);
      
      
    },

    moreThanZeroLikes() {
      if (this.post.likedBy.length - this.lastLiked.length > 0) return true
      return false
    },
    goToDetail() {
      this.$router.push(`/post/${this.post._id}`)
    },
    goToEdit() {
      this.$router.push(`/post/edit/${this.post._id}`)
    },
    removepost(postId) {
      this.$emit('removepost', postId)
    },

    async likePost() {
      await this.$store.dispatch({ type: "addLike", postId: this.post._id })
      const like1 = JSON.parse(JSON.stringify(this.post.likedBy.slice(-1)))

      try {
        this.lastLike = like1[0].fullname
      } catch (error) {
        this.lastLike = 'No one liked this post yet!'

      }
    },

    async addComment() {
      if (this.comment.length < 1) {
        alert("Can't post an empty comment, please try again")
        return
      }
      await this.$store.dispatch({ type: "addPostComment", postId: this.post._id, txt: this.comment })
      this.comment = ''

    },

  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },

    lastThreeComments() {
      return this.post.comments.slice(-3)
    },

    lastLiked() {
      return this.post.likedBy.slice(-1)
    },
    isliked(){
      if(this.post.likedBy.length>0){
        this.liked = true
      }
      else this.liked = false
    },
  },
}
</script>
