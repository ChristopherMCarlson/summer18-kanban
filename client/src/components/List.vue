<template>
  <div class="list card">
    <h1>
      {{listData.title}}
    </h1>
    <div class="bottom-line-title">
      {{listData.description}}
    </div>
    <QuickModal v-on:modalOpen="setModalId">
      <template slot="header">
        New Task
      </template>
      <form class="list-form input-group mb-3" @submit.prevent="createTask">
        <input name="title" type="text" placeholder="New Task" class="form-control" v-model="formConfig.title">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="submit" data-toggle="modal" :data-target="'#'+modalId">Submit</button>
        </div>
      </form>
    </QuickModal>
    <div class="scroll">
      <div class="tasks" v-for="task in tasks">
        <task :taskData="task" :allLists="allLists" />
      </div>
    </div>
    <div class="row mt-2 mb-2">
      <div class="col-sm-12">
        <button class="btn btn-danger" @click="deleteList(listData._id)">
          Remove List
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from "@/components/Task"
  import QuickModal from "@/components/QuickModal"
  export default {
    name: 'List',
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id]
      }
    },
    data() {
      return {
        formConfig: {
          title: '',
        },
        modalId: ''
      }
    },
    methods: {
      setModalId(id) {
        this.modalId = id
      },
      createTask() {
        let data = {
          listId: this.listData._id,
          formData: this.formConfig
        }
        this.$store.dispatch('createTask', data)
        this.formConfig = { title: '' }
      },
      deleteList(listId) {
        this.$store.dispatch('deleteList', listId)
      }
    },
    components: {
      Task,
      QuickModal
    },
    props: ["listData", "allLists"]
  }
</script>

<style scoped>
  .list {
    width: 18rem;
    height: 42vh;
    margin-top: 5%;
  }

  .scroll {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 60%;
  }

  .center-button {
    justify-content: center;
  }

  .bottom-line-title {
    border-bottom: grey solid 1px;
    font-size: 0.7rem
  }
</style>