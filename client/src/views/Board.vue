<template>
  <div class="board">
    <div>
      <QuickModal v-on:modalOpen="setModalId">
        <form class="list-form" @submit.prevent="createList">
          <label for="title">Title</label>
          <input name="title" type="text" v-model="formConfig.title">
          <label for="description">Description</label>
          <input name="description" type="text" v-model="formConfig.description">
          <input type="submit" data-toggle="modal" :data-target="'#'+modalId">
        </form>
      </QuickModal>
    </div>
    <div v-for="list in lists" :key="list._id">
      <list :listData="list" :allLists="lists" />
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
      }
    },
    methods: {
      setModalId(id) {
        this.modalId = id
      },
      createList() {
        this.$store.dispatch('createList', this.formConfig)
        this.formConfig = { title: '', description: '' }
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
      }
    },
    props: ["boardId"]
  };
</script>