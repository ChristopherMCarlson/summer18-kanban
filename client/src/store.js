import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    tasks: {},
    lists: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, data) {
      state.lists = data
    },
    setActiveBoard(state, data) {
      state.activeBoard = data
    },
    setTasks(state, data) {
      Vue.set(state.tasks, data.listId, data.tasks)
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    activeBoard({ commit, dispatch }, boardId) {
      api.get('boards')
        .then(res => {
          console.log(res);
          let activeBoard = res.data.find(b => b._id == boardId)
          commit('setActiveBoard', activeBoard)
          dispatch('getLists')
        })
    },

    //LISTS
    getLists({ commit, dispatch, state }) {
      console.log(state.activeBoard._id);
      api.get('lists/' + state.activeBoard._id)
        .then(res => {
          commit('setLists', res.data)
          for (let i = 0; i < state.lists.length; i++) {
            const list = state.lists[i];
            dispatch('getTasks', list._id)
          }
        })
    },
    createList({ commit, dispatch, state }, listdata) {
      api.post('lists/' + state.activeBoard._id, listdata)
        .then(() => {
          dispatch('getLists')
        })
    },
    deleteList({ commit, dispatch, state }, listId) {
      api.delete('lists/' + listId)
        .then(() => {
          dispatch('getLists')
        })
    },

    //TASKS
    getTasks({ commit, dispatch }, listId) {
      api.get('tasks/' + listId)
        .then(res => {
          commit('setTasks', { listId, tasks: res.data })
        })
    },
    createTask({ commit, dispatch }, data) {
      let listID = data.listId
      let taskData = data.formData
      api.post('tasks/' + listID, taskData)
        .then(() => {
          dispatch('getTasks', listID)
        })
    },
    deleteTask({ commit, dispatch, state }, data) {
      api.delete('tasks/' + data.taskId)
        .then(() => {
          dispatch('getTasks', data.listId)
        })
    }

  }
})