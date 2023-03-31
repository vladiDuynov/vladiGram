<template>
  <div class="post-details">
    <header class="app-header">
      <div style="display: flex;">
        <RouterLink :to="`/${this.post.by.username}`">
          <img class="post-preview-img-user" :src="post.by.imgUrl" alt="" />
        </RouterLink>
        <h4 class="post-preview-username">{{ post?.by?.username }}</h4>
      </div>
      <span><i v-html="$getSvg('more')" style="flex-grow: 1; max-width: 100%;"></i></span>
    </header>

    <div class="post-preview-img-preview">
      <img @click="showModal = true" :src="post.imgUrl" alt="" style=" width: 100%;" />
    </div>
    
    <div class="comments-list">
      <div class="actions-container">
        <div>
          <button class="post-preview-buttons" v-if="isPostLiked" @click="likePost"><i v-html="$getSvg('unlike')"></i></button>
          <button class="post-preview-buttons" v-else @click="likePost"><i v-html="$getSvg('like')"></i></button>
          <button class="post-preview-buttons" @click="addComment"><i v-html="$getSvg('comment')"></i></button>
          <button class="post-preview-buttons"><i v-html="$getSvg('share')"></i></button>
        </div>

        <button class="post-preview-buttons"><i v-html="$getSvg('save')"></i></button>
      </div>

      <div class="post-preview-likes" v-if="post.likedBy && post.likedBy.length > 0">
        <label for="liked-by">Liked by </label>
        <h4>{{ lastLiked[0].fullname }}</h4>
        <span v-if="moreThanZeroLikes()"> and {{ post.likedBy.length - lastLiked.length }} others</span>
      </div>
      <!-- <section v-for="comment in lastThreeComments" :comment="comment" :key="comment.id" style="display: flex;">
        <h4>{{ comment.by.fullname }}</h4> &nbsp; {{ comment.txt }}
      </section> -->
      <div>
        <input type="text" v-model="comment" placeholder="Add a comment!" />
      </div>
    </div>
  </div>
</template>

<script>
import NewPost from '../cmps/NewPost.vue'

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
      showModal: false,

    }
  },

  created() {
    const likedBy = this.post.likedBy
    if (likedBy.length > 0) {
      this.lastLike = likedBy[likedBy.length - 1].fullname
    } else {
      this.lastLike = 'No one liked this post yet!'
    }
  },

  methods: {

    getTimeElapsed(createdAt) {
      const postCreatedAt = new Date(createdAt).getTime() // convert to milliseconds
      const currentTime = Date.now() // current time in milliseconds

      const timeDiff = currentTime - postCreatedAt // calculate time difference

      // calculate elapsed time in minutes, hours, or days
      const elapsedMinutes = Math.round(timeDiff / (1000 * 60))
      const elapsedHours = Math.round(timeDiff / (1000 * 60 * 60))
      const elapsedDays = Math.round(timeDiff / (1000 * 60 * 60 * 24))

      // display elapsed time in the appropriate format
      if (elapsedMinutes < 60) {
        return `${elapsedMinutes} minutes ago`
      } else if (elapsedHours < 24) {
        return `${elapsedHours} hours ago`
      } else {
        return `${elapsedDays} days ago`
      }
    },

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
    isliked() {
      if (this.post.likedBy.length > 0) {
        this.liked = true
      }
      else this.liked = false
    },

    isPostLiked() {
      const currentUser = userService.getLoggedinUser();
      if (this.post && this.post.likedBy) {
        return this.post.likedBy.some((like) => like._id === currentUser._id);
      } else {
        return false;
      }
    }
  },
  components: {
    NewPost
  },
}
</script>
