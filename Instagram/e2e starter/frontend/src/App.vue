<template>
  <main class="app-main">
    <RouterView />
  </main>
  <AppNav />
</template>

<script>
import AppNav from './cmps/AppNav.vue'
import AppHeader from './cmps/AppHeader.vue'
import LoginSignup from './views/LoginSignup.vue'
export default {

  created() {

  },
  components: {
    AppHeader,
    AppNav,
    LoginSignup
},
}
</script>