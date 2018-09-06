<template>
  <div class="tasks">
    {{taskData.title}}
    <div class="dropdown">
      <button class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button data-toggle="modal" :data-target="'#'+taskData._id">Comment</button>
        <a class="dropdown-item" href="#">Edit</a>
        <a class="dropdown-item" href="#" @click="deleteTask(taskData._id)">Delete</a>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" :id="taskData._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add New</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="test-form" @submit.prevent="createTask">
              <label for="description">Comment</label>
              <input name="description" type="text" v-model="formConfig.description" required>
              <input type="submit" data-toggle="modal" :data-target="'#'+taskData._id">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "Tasks",
    props: ["taskData"],
    data() {
      return {
        formConfig: {
          description: ''
        },
        modalShow: false
      }
    },
    methods: {
      deleteTask(taskId) {
        let data = {
          taskId: taskId,
          listId: this.taskData.listId,
        }
        this.$store.dispatch('deleteTask', data)
      },
      addComment(taskId) {

        this.$store.dispatch('addComment', data)
      }
    }
  }
</script>

<style>
</style>