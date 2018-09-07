<template>
  <div class="list card">
    {{listData.title}} <br /> {{listData.description}}
    <QuickModal v-on:modalOpen="setModalId">
      <form class="test-form" @submit.prevent="createTask">
        <label for="title">Title</label>
        <input name="title" type="text" v-model="formConfig.title" required>
        <input type="submit" data-toggle="modal" :data-target="'#'+modalId">
      </form>
    </QuickModal>
    <button class="btn btn-danger" @click="deleteList(listData._id)">
      -
    </button>
    <div class="scroll">
      <div class="tasks" v-for="task in tasks">
        <task :taskData="task" :allLists="allLists" />
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
    height: 25rem;
  }

  .scroll {
    overflow-y: scroll;
    height: 20rem;
  }
</style>