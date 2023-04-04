<template>
  <AppHeader v-if="!$route.meta.requiresLogin"/>
  <main class="app-main">
    <RouterView />
  </main>
  <AppNav v-if="!$route.meta.requiresNav" />
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