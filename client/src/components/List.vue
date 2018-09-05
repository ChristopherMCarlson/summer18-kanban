<template>
  <div class="lists">
    <div class="list" v-for="list in lists">
      {{list.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
    beforeMount() {
      this.$store.dispatch('getLists')
    },
    computed: {
      lists() {
        return this.$store.state.lists
      },
      board() {
        return this.$store.state.activeBoard
      }
    },
  }
</script>

<style scoped>
</style>