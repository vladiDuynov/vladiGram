<template>
  <div v-if="this.loading">
    <h5>
      Loading Data
    </h5>
  </div>

  <div v-else>
    <div v-if="this.user">
      <div class="user-header">
        <span><i v-html="$getSvg('settings')" style="flex-grow: 1; max-width: 100%;"></i></span>
        {{ user.fullname }}
        <span><i v-html="$getSvg('addUser')" style="flex-grow: 1; max-width: 100%;"></i></span>
      </div>

      <div class="user-info">
        <div>
          <img class="user-info-img" :src="user.imgUrl" alt="User Image" />
        </div>
        <div>
          <h4>{{ user.fullname }}</h4>
          <form v-if="this.isMe" class="login-form" @submit.prevent="updateProfilePic()">
            <ImgUploader @uploaded="onUploaded" />
            <!-- <button class="login-container-button"></button> -->
          </form>
        </div>
      </div>

      <div class="user-details">
        <h5>{{ this.user.fullname }}</h5>
        <p>{{ this.user.txt }}</p>

      </div>

      <div id="user-dash-board" class="user-dash-board">
        <div class="dashboard-element">
          <h6>{{ posts?.length || 0 }}</h6>
          <span>posts</span>
        </div>
        <div class="dashboard-element">
          <h6>876</h6>
          <span>followers</span>
        </div>
        <div class="dashboard-element">
          <h6>1123</h6>
          <span>following</span>
        </div>
      </div>

      <div class="user-post-filer">
        <span><i v-html="$getSvg('posts-tab')" style="flex-grow: 1; max-width: 100%;"></i></span>
        <span><i v-html="$getSvg('reels')" style="flex-grow: 1; max-width: 100%;"></i></span>
        <span><i v-html="$getSvg('saved-tab')" style="flex-grow: 1; max-width: 100%;"></i></span>
        <span><i v-html="$getSvg('tagged-tab')" style="flex-grow: 1; max-width: 100%;"></i></span>

      </div>



      <div class="user-post-list">
        <img class="user-grid-item"  @click="showPostDetails(post)" v-for="post in posts" :post="post" :key="post._id" :src="post.imgUrl"
          alt="User Image" />

        <div v-if="showModal" class="modal">
          <PostDetails :post="selectedPost" />  
          <span @click="showModal = false" style="padding: 4%;"><i v-html="$getSvg('close')"
              style="flex-grow: 1; max-width: 100%;"></i></span>
        </div>
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
import PostDetails from './PostDetails.vue'

export default {

  data() {
    return {
      loading: true,
      showModal: false,
      selectedPost: null
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

    showPostDetails(post) {
      this.selectedPost = post
      this.showModal = true
    },

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
    PostDetails,
  }
}
</script>