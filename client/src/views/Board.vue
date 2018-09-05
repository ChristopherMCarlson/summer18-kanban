<template>
  <div class="board">
    <div>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- <form class="list-form" @submit.prevent="createList">
        <label for="title">Title</label>
        <input name="title" type="text" v-model="formConfig.title">
        <label for="description">Description</label>
        <input name="description" type="text" v-model="formConfig.description">
        <input type="submit">
      </form> -->
    </div>
    <div v-for="list in lists" :key="list._id">
      <list :listData="list" />
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