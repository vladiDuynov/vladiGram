<template>
  <nav class="app-nav">
    <RouterLink to="/"><i v-html="$getSvg('home')" style="flex-grow: 1; max-width: 100%;"></i></RouterLink>
    <span><i v-html="$getSvg('explore')" style="flex-grow: 1; max-width: 100%;"></i></span>

    <span><i v-html="$getSvg('reels')" style="flex-grow: 1; max-width: 100%;"></i></span>
    <RouterLink to="/login/"><i v-html="$getSvg('inbox')" style="flex-grow: 1; max-width: 100%;"></i></RouterLink>
    <!-- <RouterLink to="/newpost" v-if="loggedinUser"><i class="app-header-post-button" v-html="$getSvg('newPost')"></i> -->
    <span v-if="loggedinUser" @click="showNewPostModal = true"><i v-html="$getSvg('newPost')"></i>
    </span>

    <RouterLink v-if="this.loggedinUser" :to="`/${this.loggedinUser.username}`">
      <img class="nav-bar-img-user" :src="this.loggedinUser.imgUrl" alt="" />
    </RouterLink>

    <div v-if="showNewPostModal" class="modal">
      <NewPost />
      <span @click="showNewPostModal = false" style="padding: 4%;"><i v-html="$getSvg('close')"
          style="flex-grow: 1; max-width: 100%;"></i></span>
    </div>




  </nav>
</template>

<script>
import { userService } from '../services/user.service.js'
import NewPost from './NewPost.vue';
export default {
    name: "AppNav",
    data() {
        return {
            showNewPostModal: false,
        };
    },
    methods: {
        test() {
            const liked = userService.getLoggedinUser();
            console.log(liked);
        },
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
    },
    components: { NewPost }
}
</script>

