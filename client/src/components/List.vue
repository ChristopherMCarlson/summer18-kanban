<template>
  <div class="list">

  </div>
</template>

<script>
  import Tasks from "@/components/Tasks"
  export default {
    name: 'List',
    computed: {
      // lists() {
      //   return this.$store.state.lists
      // },
      // tasks() {
      //   return this.$store.
      // },

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