<template>
  <div class="list">
    {{listData.title}} <br /> {{listData.description}}
    <div class="tasks" v-for="task in tasks">
      <task :taskData="task" />
    </div>
  </div>
</template>

<script>
  import Task from "@/components/Task"
  export default {
    name: 'List',
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id]
      }

    },
    components: {
      Task
    },
    props: ["listData"]
  }
</script>

<style scoped>
  .list {
    border: 1px solid black;
  }
</style>