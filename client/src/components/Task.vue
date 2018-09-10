<template>
  <div class="tasks">
    <div class="row center-content mt-3">
      <h3>{{taskData.title}}</h3>
      <!-- OPTIONS DROPDOWN -->
      <div class="dropdown">
        <a class="three-button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-ellipsis-v fa-xs"></i>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#" @click="triggerModal">Comment</a>
          <a class="dropdown-item" href="#" @click="deleteTask(taskData._id)">Delete</a>
        </div>
      </div>
      <div class="dropdown">
        <a class="dropdown-toggle" id="change-list-drop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        </a>
        <div class="dropdown-menu text-center" aria-labelledby="change-list-drop">
          <div class="bottom-line-dropdown">
            <p>Move Task</p>
          </div>
          <a href="#" v-for="list in allLists" v-if="list._id != taskData.listId" @click="moveTask(list._id)" class="text-center">{{list.title}}<br/></a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row center-content">
        <a data-toggle="collapse" :href="'#'+collapeId" role="button" aria-expanded="false" :aria-controls="taskData._id">
          <p><small>{{taskData.comments.length}} comments</small></p>
        </a>
      </div>
      <div class="row center-content">
        <div class="collapse" :id="collapeId">
          <div v-for="comment in taskData.comments" class="card card-body mx-2">
            {{comment.description}}
          </div>
        </div>
      </div>
    </div>
    <QuickModal v-on:modalOpen="setModalId" :buttonId="taskData._id" :isHidden="true">
      <template slot="header">
        New Comment
      </template>
      <form class="test-form input-group mb-3" @submit.prevent="addComment(taskData._id)">
        <input name="description" type="text" class="form-control" placeholder="Comment" aria-label="Comment" aria-describedby="basic-addon2"
          v-model="formConfig.description" required>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="submit" data-toggle="modal" :data-target="'#'+modalId">Submit</button>
        </div>
      </form>
    </QuickModal>
    <!-- CHANGE LIST DROPDOWN -->
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
  .center-content {
    justify-content: center;
  }

  .three-button {
    margin: 2.5px 2.5px 2.5px 2.5px;
    padding: 3px 7px 3px 7px;
    background-color: #11999e;
    border-radius: 50%;
    font-size: 0.7rem;
  }

  .three-button:hover {
    cursor: pointer;
  }

  .dropdown:hover {
    cursor: pointer;
  }

  .bottom-line-dropdown {
    border-bottom: grey solid 1px;
    margin-bottom: 0rem;
  }
</style>