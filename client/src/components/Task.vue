<template>
  <div class="tasks">
    <h3>{{taskData.title}}</h3>
    <p><small>{{taskData.comments.length}} comments</small></p>

    <div class="dropdown">
      <button class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" @click="triggerModal">Comment</a>
        <a class="dropdown-item" href="#">Edit</a>
        <a class="dropdown-item" href="#" @click="deleteTask(taskData._id)">Delete</a>
      </div>
      <QuickModal v-on:modalOpen="setModalId" :buttonId="taskData._id" :isHidden="true">
        <form class="test-form" @submit.prevent="addComment(taskData._id)">
          <label for="description">Comment</label>
          <input name="description" type="text" v-model="formConfig.description" required>
          <input type="submit" data-toggle="modal" :data-target="'#'+modalId">
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
        modalId: ''
      }
    },
    components: {
      QuickModal
    },
    methods: {
      setModalId(id) {
        this.modalId = id
      },
      deleteTask(taskId) {
        let data = {
          taskId: taskId,
          listId: this.taskData.listId,
        }
        this.$store.dispatch('deleteTask', data)
      },
      addComment(taskId) {
        this.$store.dispatch('addComment', { taskId, formConfig: this.formConfig, listId: this.taskData.listId })
        this.formConfig = {
          description: ''
        }
      },
      triggerModal() {
        document.getElementById(this.taskData._id).click()
      }
    }
  }
</script>

<style>
</style>