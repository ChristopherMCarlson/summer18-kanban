import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

var production = !window.location.host.includes('localhost')
var baseUrl = production ? 'https://cmcarlsonkanban.herokuapp.com/' : '//localhost:3000'

let auth = Axios.create({
  baseURL: baseUrl + "auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
})

const pixKey = '9888263-5e82026c4efaed628c83b0467';
const url2 = 'https://pixabay.com/api/?key=' + pixKey + '&q=team&order=popular&per_page=200&image_type=photo&page='
const apiUrl = url2;
function randomNum() {
  return Math.floor(Math.random() * 3) + 1;
}

let imgApi = Axios.create({
  baseURL: apiUrl,
  timeout: 3000
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    tasks: {},
    lists: [],
    imgResults: [],
    image: {},
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
    },
    setImgs(state, data) {
      state.imgResults.push(...data)
    },
    setImg(state, data) {
      let ranNum = Math.floor(Math.random() * 600);
      state.image = state.imgResults[ranNum].largeImageURL
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
    logout() {
      auth.delete('logout')
        .then(res => {
          router.push({ name: 'login' })
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
          let activeBoard = res.data.find(b => b._id == boardId)
          commit('setActiveBoard', activeBoard)
          dispatch('getLists')
        })
    },

    //LISTS
    getLists({ commit, dispatch, state }) {
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
    },
    moveTask({ commit, dispatch }, data) {
      api.put('tasks/' + data.taskId, data.listId)
        .then(() => {
          dispatch('getLists')
        })
    },


    //COMMENTS

    addComment({ commit, dispatch, state }, payload) {
      api.post('tasks/' + payload.taskId + '/comments', payload.formConfig)
        .then(() => {
          dispatch('getTasks', payload.listId)
        })
    },

    //IMAGES
    getImages({ commit, dispatch, state }, data) {
      if (data.length > 0) {
        commit('setImg', data)
        return
      }
      imgApi('' + 1).then(res => {
        commit('setImgs', res.data.hits)
      })
      imgApi('' + 2).then(res => {
        commit('setImgs', res.data.hits)
      })
      imgApi('' + 3).then(res => {
        commit('setImgs', res.data.hits)
        commit('setImg', data)
      })
    }
  }
})