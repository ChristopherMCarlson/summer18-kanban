<template>
  <div class="lists">
    <div class="list" v-for="list in lists">
      {{list.title}} <br /> {{list.description}}
      <tasks />
    </div>
  </div>
</template>

<script>
  import Tasks from "@/components/Tasks"
  export default {
    name: 'List',
    computed: {
      lists() {
        return this.$store.state.lists
      },
      activeBoard() {
        return this.$store.state.activeBoard
      }
    },
    components: {
      Tasks
    }
  }
</script>

<style scoped>
  .list {
    border: 1px solid black;
  }
</style>