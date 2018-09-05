<template>
  <div class="board">
    <div>
      <form class="list-form" @submit.prevent="createList">
        <label for="title">Title</label>
        <input name="title" type="text" v-model="formConfig.title">
        <label for="description">Description</label>
        <input name="description" type="text" v-model="formConfig.description">
        <input type="submit">
      </form>
    </div>
    <div v-for="list in lists">
      <list />
    </div>
  </div>
</template>

<script>
  import List from "@/components/List"

  export default {
    name: "board",
    data() {
      return {
        formConfig: {
          title: '',
          description: ''
        }
      }
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    methods: {
      createList() {
        this.$store.dispatch('createList', this.formConfig)
        this.formConfig = { title: '', description: '' }
      }
    },
    components: {
      List
    },
    computed: {
      lists() {
        return this.$store.state.lists
      },
      activeBoard() {
        return this.$store.state.activeBoard
      }
    },
    props: ["boardId"]
  };
</script>