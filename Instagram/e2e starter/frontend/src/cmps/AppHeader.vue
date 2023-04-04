<template>
  <header class="app-header">
    <RouterLink to="/" style="padding-top: 10px;"><i class="app-header-logo" v-html="$getSvg('logo')"></i></RouterLink>
    <div class="header-search">
      <span><i v-html="$getSvg('searchGray')"></i></span>

      <input class="header-search-input" type="text" v-model="searchedUser" placeholder="Search">

      <div v-if="searchedUser.length > 0" class="inner-search-close">
        <span @click="searchedUser = ''">X</span>
      </div>
      <div v-if="searchedUser.length > 0" class="search-modal"> 
        <RouterLink class="search-user-link" :to="`/${user.username}`" v-for="user in users" :key="user._id" :value="user.username" >
            <img class="search-preview-img-user" :src="user.imgUrl" alt="" />
            <h4 class="search-preview-username">{{ user.username }}</h4>
        </RouterLink>
      </div>
    </div>

    <RouterLink to="/" style="padding-top: 10px;"><i v-html="$getSvg('like')" style="flex-grow: 1; max-width: 100%;"></i>
    </RouterLink>


  </header>
</template>

<script>


export default {

  name: 'AppHeader',
  components: {

  },
  data() {
    return {
      searchedUser: '',
    }
  },

  methods: {

  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },

    users() {
      return this.$store.getters.users
    },
  },

  watch: {
    searchedUser(newVal) {
      this.$store.dispatch({ type: 'loadUsers', txt: newVal })
      console.log(this.users);
    }
  },


}
</script>