<template>
  <div class="container about">
    <div v-if="loggedinUser">
      <h3>
        Loggedin User:
        {{ loggedinUser.fullname }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div v-else>
      <div v-if="!this.toggleSignup" class="login-container">
        <div class="login-logo">
          <RouterLink to="/"><i class="app-header-logo" v-html="$getSvg('logo')"></i></RouterLink>
        </div>
        <button class="login-container-button">Continue with Facebook</button>
        <span class="login-or">
          <span class="login-or-span">OR</span>
        </span>

        <form class="login-form" @submit.prevent="doLogin">
          <!-- <select class="login-input" v-model="loginCred.username">
            <option value="">Select User</option>
            <option v-for="user in users" :key="user._id" :value="user.username">{{ user.fullname }}</option>
          </select> -->
          <input class="login-input" type="text" v-model="loginCred.username"
            placeholder="Phone number, username, or email" />
          <input class="login-input" type="text" v-model="loginCred.password" placeholder="Password" />

          <div class="forgot-password">
            <span>Forgot password?</span>
          </div>
          <button class="login-container-button">Log in</button>
        </form>

        <div class="login-footer">
          <span>Don't have an account?</span>&nbsp
          <span @click="toggleSignUpForm" class="login-footer-button">Sign up</span>
        </div>
      </div>


      <div v-if="this.toggleSignup" class="login-container">
        <div class="login-logo">
          <RouterLink to="/"><i class="app-header-logo" v-html="$getSvg('logo')"></i></RouterLink>
        </div>
        <button class="login-container-button">Continue with Facebook</button>
        <span class="login-or">
          <span class="login-or-span">OR</span>
        </span>
        <form class="login-form" @submit.prevent="doSignup">
          <input class="login-input" type="text" v-model="signupCred.fullname" placeholder="Your full name" />
          <input class="login-input" type="text" v-model="signupCred.username" placeholder="Username" />
          <input class="login-input" type="password" v-model="signupCred.password" placeholder="Password" />
          <ImgUploader @uploaded="onUploaded" />
          <img class="img-profile-preview" v-if="this.signupCred.imgUrl" :src="this.signupCred.imgUrl" />
          <button class="login-container-button">SignUp</button>
        </form>
        
        <div class="login-footer">
          <span>Have an account?</span>&nbsp
          <span @click="toggleSignUpForm" class="login-footer-button">Log in</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '../cmps/AppHeader.vue'
import ImgUploader from '../cmps/ImgUploader.vue'
export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: '', password: '' },
      signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
      toggleSignup: false,
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    toggleSignUpForm() {
      this.toggleSignup = !this.toggleSignup
    },
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')
    },
    loadUsers() {
      this.$store.dispatch({ type: "loadUsers" })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: "removeUser", userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    }
  },
  components: {
    ImgUploader,
    AppHeader
  }
}
</script>