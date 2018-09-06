<template>
  <div class="list">
    {{listData.title}} <br /> {{listData.description}}
    <QuickModal v-on:modalOpen="setModalId">
      <form class="test-form" @submit.prevent="createTask">
        <label for="title">Title</label>
        <input name="title" type="text" v-model="formConfig.title" required>
        <input type="submit" data-toggle="modal" :data-target="'#'+modalId">
      </form>
    </QuickModal>
    <div class="tasks" v-for="task in tasks">
      <task :taskData="task" />
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
      }
    },
    components: {
      Task,
      QuickModal
    },
    props: ["listData"]
  }
</script>

<style scoped>
  .list {
    border: 1px solid black;
  }
</style>