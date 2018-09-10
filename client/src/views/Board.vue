<template>
  <div class="board" id="background" :style="{backgroundImage: 'url('+this.$store.state.image+')'}">
    <div>
      <QuickModal v-on:modalOpen="setModalId">
        <template slot="header">
          New List
        </template>
        <form class="list-form input-group mb-3" @submit.prevent="createList">
          <input name="title" type="text" placeholder="Title" class="form-control" v-model="formConfig.title">
          <input name="description" type="text" class="form-control" placeholder="Description" aria-label="Description" aria-describedby="basic-addon2"
            v-model="formConfig.description" required>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" data-toggle="modal" :data-target="'#'+modalId">Submit</button>
          </div>
        </form>
      </QuickModal>
    </div>
    <button @click="logout" class="btn btn-danger mt-2">Logout</button>
    <div class="row" style="justify-content:center">
      <div v-for="list in lists" :key="list._id" class="col-sm-2 list-body">
        <list :listData="list" :allLists="lists" />
      </div>
    </div>
  </div>
</template>

<script>
  import List from "@/components/List"
  import QuickModal from "@/components/QuickModal"

  export default {
    name: "board",
    data() {
      return {
        formConfig: {
          title: '',
          description: ''
        },
        modalId: ''
      }
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      } else {
        this.getImgs()
      }
    },
    methods: {
      setModalId(id) {
        this.modalId = id
      },
      createList() {
        this.$store.dispatch('createList', this.formConfig)
        this.formConfig = { title: '', description: '' }
      },
      getImgs() {
        this.$store.dispatch('getImages', this.$store.state.imgResults)
          .then(res => {
            document.getElementById('background').style.backgroundImage = `url(${this.$store.state.image})`
          })
      },
      logout() {
        this.$store.dispatch('logout')
      }
    },
    components: {
      List,
      QuickModal
    },
    computed: {
      lists() {
        return this.$store.state.lists
      },
      activeBoard() {
        return this.$store.state.activeBoard
      },
      bgImg() {
        return this.$store.state.image
      }
    },
    props: ["boardId"]
  };
</script>

<style>
  .list-body {
    display: flex;
    justify-content: center;
  }

  /* SCROLLBAR */

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #e4f9f5;
  }

  ::-webkit-scrollbar-thumb {
    background: #40514e;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .board {
    justify-content: stretch;
    min-height: 97vh;
    max-width: 98vw;
    background-size: cover;
    margin: 0 1% 0 1%;
  }
</style>