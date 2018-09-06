<template>
  <div class="tasks">
    <h3>{{taskData.title}}</h3>
    <a data-toggle="collapse" :href="'#'+collapeId" role="button" aria-expanded="false" :aria-controls="taskData._id">
      <p><small>{{taskData.comments.length}} comments</small></p>
    </a>
    <div class="collapse" :id="collapeId">
      <div v-for="comment in taskData.comments" class="card card-body">
        {{comment.description}}
      </div>
    </div>
    <!-- OPTIONS DROPDOWN -->
    <div class="dropdown">
      <button class="btn btn-secondary" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" @click="triggerModal">Comment</a>
        <!-- <a class="dropdown-item" href="#">Edit</a> -->
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
    <!-- CHANGE LIST DROPDOWN -->
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="change-list-drop" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">
        Dropdown button
      </button>
      <div class="dropdown-menu" aria-labelledby="change-list-drop">
        <a href="#" v-for="list in allLists" @click="moveTask(list._id)">{{list.title}}</a>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import QuickModal from "@/components/QuickModal"
  export default {
    name: "Tasks",
    props: ["taskData", "allLists"],
    data() {
      return {
        formConfig: {
          description: ''
        },
        modalId: '',
        collapeId: 'c' + Math.floor(Math.random() * (1000) + 1)
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
      },
      moveTask(listId) {
        this.$store.dispatch('moveTask', { taskId: this.taskData._id, listId: { listId: listId } })
      }
    }
  }
</script>

<style>
</style>