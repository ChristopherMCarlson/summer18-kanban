<template>
  <div class="boards">
    <QuickModal>
      <form @submit.prevent="addBoard">
        <input type="text" placeholder="title" v-model="newBoard.title" required>
        <input type="text" placeholder="description" v-model="newBoard.description">
        <button type="submit">Create Board</button>
      </form>
    </QuickModal>
    <div v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">
        <div class="title" @click="activeBoard(board._id)">
          {{board.title}}
        </div>
      </router-link>
      <button @click="deleteBoard(board._id)">DELETE BOARD</button>
    </div>
  </div>
</template>

<script>
  import QuickModal from "@/components/QuickModal.vue"
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      activeBoard(boardId) {
        this.$store.dispatch("activeBoard", boardId)
      }
    },
    components: {
      QuickModal
    }
  };
</script>