<template>
  <div v-if="this.loading">
    <h1>
      Loading Data
    </h1>
  </div>

  <div v-else>
    <div v-if="this.user">
      <div class="user-info">
        <div>
          <img class="user-info-img" :src="user.imgUrl" alt="User Image" />
        </div>
        <div>
          <h4>{{ user.fullname }}</h4>
          <ImgUploader v-if="this.isMe" @uploaded="onUploaded" />
        </div>
      </div>

      <div id="user-dash-board" class="user-dash-board">
        <div>
          <h6>{{ posts?.length || 0 }}</h6>
          <label>posts</label>
        </div>
        <div>
          <h6>876</h6>
          <label>followers</label>
        </div>
        <div>
          <h6>1123</h6>
          <label>following</label>
        </div>
      </div>

      <div class="user-post-list">
        <img class="user-grid-item" v-for="post in posts" :post="post" :key="post._id" :src="post.imgUrl"
          alt="User Image" />
      </div>

    </div>

    <div v-else>
      <h1>Sorry user was not found</h1>
    </div>

  </div>
</template>

<script>
import ImgUploader from '../cmps/ImgUploader.vue'
import PostPreview from './PostPreview.vue'

export default {

  data() {
    return {
      loading: true
    }
  },

  watch: {
    userId: {
      handler() {
        if (this.userId) {
          this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId })
        }
      },
      immediate: true,
    },
    user: {
      handler() {
        if (this.user) {
          this.$store.dispatch({ type: 'loadPosts', txt: this.user.username })
        }
      },
      immediate: true,
    }
  },


  computed: {
    posts() {
      return this.$store.getters.posts
    },
    user() {
      return this.$store.getters.watchedUser
    },
    userId() {
      return this.$route.params.id
    },
    isMe() {
      return this.userId === this.$store.getters.loggedinUser.username
    },

  },
  methods: {
    test() {
      console.log(this.isMe);
    },
    onUploaded(imgUrl) {
      // this.user.imgUrl = imgUrl
      // this.$store.dispatch({ type: "loadAndWatchUser", userId: this.userId })
    },

  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },

  components: {
    ImgUploader,
    PostPreview,
  }
}
</script>