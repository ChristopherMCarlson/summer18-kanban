<template>
  <div class="login">
    <LoginModal>
      <form class="login-user" v-if="loginForm" @submit.prevent="loginUser">
        <input type="email" v-model="creds.email" placeholder="email">
        <input type="password" v-model="creds.password" placeholder="password">
        <button class="log-btn" type="submit">Login</button>
        <div class="select" @click="loginForm = !loginForm">
          <p v-if="loginForm">No account? <i class="fas fa-user-plus"></i></p>
          <p v-else>Already have an account? <i class="fas fa-sign-in-alt"></i></p>
        </div>
      </form>
      <form class="login-user" v-else @submit.prevent="register">
        <input type="text" v-model="newUser.name" placeholder="name">
        <input type="email" v-model="newUser.email" placeholder="email">
        <input type="password" v-model="newUser.password" placeholder="password">
        <button class="log-btn" type="submit">Create</button>
        <div class="select" @click="loginForm = !loginForm">
          <p v-if="loginForm">No account? <i class="fas fa-user-plus"></i></p>
          <p v-else>Already have an account? <i class="fas fa-sign-in-alt"></i></p>
        </div>
      </form>
    </LoginModal>
  </div>
</template>

<script>
  import LoginModal from "@/components/LoginModal"
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    },
    components: {
      LoginModal
    }
  };
</script>

<style scoped>
  body {
    height: 100vh;
    width: 100%;
    padding: 0;
  }

  #app {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .login {
    display: flex;
    width: 100%;
    height: fit-content;
    color: black;
    background-color: #e4f9f5;
  }

  .login-user {
    width: 20rem;
    height: auto;
    background-color: #5a5a5a8a;
    color: #ffffff;
    padding: 2rem;
    text-align: left;
    border-radius: 0.3125rem;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
  }
</style>