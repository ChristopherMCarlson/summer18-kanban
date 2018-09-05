<template>
  <div class="tasks">
    <div class="task" v-for="task in tasks">
      {{task.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tasks",
    computed: {
      // tasks() {
      //   return this.$store.state.tasks
      // },
      // lists() {
      //   return this.$store.state.lists
      // }
    }
  }
</script>

<style>
</style>