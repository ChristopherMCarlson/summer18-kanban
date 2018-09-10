<template>
  <div class="whole-page">
    <div class="filler">
      <div class="login">
        <LoginModal>
          <form class="login-user" v-if="loginForm" @submit.prevent="loginUser">
            <input class="login-input" type="email" v-model="creds.email" placeholder="email">
            <input class="login-input" type="password" v-model="creds.password" placeholder="password">
            <button class="log-btn" type="submit" data-toggle="modal" data-target="#exampleModalCenter">Login</button>
            <div class="select" @click="loginForm = !loginForm">
              <p v-if="loginForm">No account? <i class="fas fa-user-plus"></i></p>
              <p v-else>Already have an account? <i class="fas fa-sign-in-alt"></i></p>
            </div>
          </form>
          <form class="login-user" v-else @submit.prevent="register">
            <input class="login-input" type="text" v-model="newUser.name" placeholder="name">
            <input class="login-input" type="email" v-model="newUser.email" placeholder="email">
            <input class="login-input" type="password" v-model="newUser.password" placeholder="password">
            <button class="log-btn" type="submit" data-toggle="modal" data-target="#exampleModalCenter">Create</button>
            <div class="select" @click="loginForm = !loginForm">
              <p v-if="loginForm">No account? <i class="fas fa-user-plus"></i></p>
              <p v-else>Already have an account? <i class="fas fa-sign-in-alt"></i></p>
            </div>
          </form>
        </LoginModal>
      </div>
      <div class="stuff">
        <div class="imgs">
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="../assets/team1.jpg" alt="Card image cap">
            <div class="card-body">
              <p class="card-text">"There are no secrets to success. It is the result of preparation, hard work, and
                learning from failure." <br /> -Colin Powell</p>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="../assets/team2.jpg" alt="Card image cap">
            <div class="card-body">
              <p class="card-text">"Productivity is never an accident. It is always the result of a commitment to
                excellence, intelligent planning, and focused effort." <br /> -Paul J. Meyer
              </p>
            </div>
          </div>
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="../assets/team3.jpg" alt="Card image cap">
            <div class="card-body">
              <p class="card-text">“Before anything else, preparation is the key to success.” <br /> -Alexander Graham
                Bell</p>
            </div>
          </div>
          <!-- <img src="//placehold.it/200x200" alt="">
          <img src="//placehold.it/200x200" alt="">
          <img src="//placehold.it/200x200" alt=""> -->
        </div>
      </div>
    </div>
    <div class="footer">
      <p>“By failing to prepare, you are preparing to fail.” <br /> ― Benjamin Franklin</p>
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
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .footer {
    height: auto;
    width: 100%;
    background-color: #11999e;
    /* margin-top: 1rem; */
  }

  .footer p {
    font-size: 2rem;
  }

  .whole-page {
    /* height: 100vh; */
    /* background: url('../assets/team.jpg'); */
    margin: 0 1rem 0 1rem;
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
  }

  .stuff {
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .imgs {
    display: flex;
    justify-content: space-around;
    align-self: center;
    width: 100%;
  }

  .login {
    display: flex;
    width: 100%;
    height: fit-content;
    color: black;
    background: linear-gradient(to top, #11999e, white);
    padding: .3rem .3rem .3rem 0;
    justify-content: flex-end;
    box-shadow: 0 8px 6px -6px black;
    /* align-items: center;  */
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

  .filler {
    background: url('../assets/team.jpg');
    /* background-color: black; */
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 80%;
  }
</style>