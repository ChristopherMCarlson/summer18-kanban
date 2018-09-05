<template>
  <div class="lists">
    <div class="list" v-for="list in lists">
      {{list.title}} <br/> {{list.description}}
    </div>
  </div>
</template>

<script>
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
  }
</script>

<style scoped>
</style>