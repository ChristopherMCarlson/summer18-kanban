<template>
  <div class="tasks">
    {{taskData.title}}
    <div class="dropdown">
      <button class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" @click="triggerModal">Comment</a>
        <a class="dropdown-item" href="#">Edit</a>
        <a class="dropdown-item" href="#" @click="deleteTask(taskData._id)">Delete</a>
      </div>
      <QuickModal :buttonId="taskData._id" :isHidden="true">
        <form class="test-form" @submit.prevent="createTask">
          <label for="description">Comment</label>
          <input name="description" type="text" v-model="formConfig.description" required>
          <input type="submit" data-toggle="modal" :data-target="'#'+taskData._id">
        </form>
      </QuickModal>
    </div>
  </div>
  </div>
</template>

<script>
  import QuickModal from "@/components/QuickModal"
  export default {
    name: "Tasks",
    props: ["taskData"],
    data() {
      return {
        formConfig: {
          description: ''
        },
        tabIndex: -1,
        modalShow: false
      }
    },
    components: {
      QuickModal
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
      },
      triggerModal() {
        document.getElementById(this.taskData._id).click()
      }
    }
  }
</script>

<style>
</style>