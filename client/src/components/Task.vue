<template>
  <div class="tasks">
    {{taskData.title}}
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
    },
    props: ["taskData"]
  }
</script>

<style>
</style>