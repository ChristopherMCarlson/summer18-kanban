<template>
  <div class="whole-page">
    <div class="filler">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="login">
      <LoginModal>
        <form class="login-user" v-if="loginForm" @submit.prevent="loginUser">
          <input class="login-input" type="email" v-model="creds.email" placeholder="email">
          <input class="login-input" type="password" v-model="creds.password" placeholder="password">
          <button class="log-btn" type="submit">Login</button>
          <div class="select" @click="loginForm = !loginForm">
            <p v-if="loginForm">No account? <i class="fas fa-user-plus"></i></p>
            <p v-else>Already have an account? <i class="fas fa-sign-in-alt"></i></p>
          </div>
        </form>
        <form class="login-user" v-else @submit.prevent="register">
          <input class="login-input" type="text" v-model="newUser.name" placeholder="name">
          <input class="login-input" type="email" v-model="newUser.email" placeholder="email">
          <input class="login-input" type="password" v-model="newUser.password" placeholder="password">
          <button class="log-btn" type="submit">Create</button>
          <div class="select" @click="loginForm = !loginForm">
            <p v-if="loginForm">No account? <i class="fas fa-user-plus"></i></p>
            <p v-else>Already have an account? <i class="fas fa-sign-in-alt"></i></p>
          </div>
        </form>
      </LoginModal>
    </div>
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
  .whole-page {
    height: 100vh;
    background: url('../assets/team.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0 1rem 0 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    display: flex;
    width: 100%;
    height: fit-content;
    color: black;
    /* background-color: #e4f9f5; */
    padding: .3rem .3rem .3rem 0;
    justify-content: center;
    align-items: center;
  }

  .login-user {
    background-color: #40514e;
    padding: 2rem;
    text-align: left;
    border-radius: 0.3125rem;
    color: #11999e;
  }

  .login-user input {
    width: 100%;
    margin-bottom: 1.25rem;
  }

  .login-input {
    color: #e4f9f5;
  }

  .login-user input[type="text"],
  input[type="password"],
  input[type="email"] {
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    outline: none;
    height: 2.5rem;
    font-size: 1rem
  }

  .modal-body {
    display: flex;
    justify-content: center;
  }

  .select {
    display: flex;
    justify-content: flex-end;
  }

  .openForm-btn {
    border: none;
    background-color: black;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 0.9375rem;
    transition: background-color .3s;
    height: 2.5rem
  }

  .log-btn {
    width: 100%;
    border: none;
    background-color: black;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 0.9375rem;
    transition: background-color .3s;
    height: 2.5rem
  }

  .log-btn:hover {
    background-color: #11999e;
  }
</style>