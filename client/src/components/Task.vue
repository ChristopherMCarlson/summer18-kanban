<template>
  <div class="tasks">
    {{taskData.title}}
    <div class="dropdown">
      <button class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Comment</a>
        <a class="dropdown-item" href="#">Edit</a>
        <a class="dropdown-item" href="#" @click="deleteTask(taskData._id)">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Tasks",
    props: ["taskData"],
    methods: {
      deleteTask(taskId) {
        let data = {
          taskId: taskId,
          listId: this.taskData.listId
        }
        this.$store.dispatch('deleteTask', data)
      }
    }
  }
</script>

<style>
</style>