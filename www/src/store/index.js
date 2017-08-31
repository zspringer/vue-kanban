import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})

vue.use(vuex)

var store = new vuex.Store({
  //{ name: 'This is total rubbish' }
  state: {
    boards: [],
    activeBoard: {},
    error: {},
    activeUser: {},
    activeLists: [],
    activeTasks: {},
    activeComments: {}
  },

  mutations: {
    setBoards(state, data) {
      state.boards = data
    },

    setLists(state, data) { 
      state.activeLists = data
    },


    setTasks(state, data) {///create object {listId, task}
      //console.log('boards: ' + data)
      // state.activeTasks[data[0].listId] = data
      //vue.set(state.activeTasks, data[0].listId, data)
      console.log('data: ', data)
      vue.set(state.activeTasks, data.listId, data.tasks)
    },


    setComments(state, data) {
      //vue.set(state.activeComments, data[0].taskId, data)
      vue.set(state.activeComments, data.taskId, data.comments)
    },


    setUser(state, data) {
      //console.log('test1: ' + data)
      state.activeUser = data
    },

    setActiveBoard(state, data) {
      //console.log('setting aCTIVE BOARD: ' + data);
      state.activeBoard = data
    },

    handleError(state, err) {
      state.error = err
    }



  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts

    getBoards({ commit, dispatch }) {
      api('userboards')
        .then(res => {
          //console.log(res)
          commit('setBoards', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getLists({ commit, dispatch }, id) {
      api('/boards/' + id + '/lists')
        .then(res => {
          //console.log('List response', res)
          commit('setLists', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getTasks({ commit, dispatch }, task) {

      api('/boards/' + task.boardId + '/lists/' + task.listId + "/tasks")
      
        .then(res => {

          var payload={ "listId":task.listId, "tasks":res.data.data}

          commit('setTasks', payload)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getComments({ commit, dispatch }, comment) {
      api('/boards/' + comment.boardId + '/lists/' + comment.listId + "/tasks/" + comment.taskId + "/comments")
      
        .then(res => {

         // console.log('getComments response: ', res) //good to here. Data present.

         var payload={ "taskId":comment.taskId, "comments":res.data.data}
          commit('setComments', payload)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getBoard({ commit, dispatch }, id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    createBoard({ commit, dispatch }, board) {
      //debugger
      api.post('boards/', board)
        .then(res => {
          //console.log('getting boards now')
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    createList({ commit, dispatch }, list) {
      api.post('lists', list)
        .then(res => {
          //console.log('Created list', res)
          dispatch('getLists', list.boardId)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    createTask({ commit, dispatch }, task) {

      api.post('tasks', task)
        .then(res => {
          
          dispatch('getTasks', task)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    createComment({ commit, dispatch }, comment) {
      api.post('comments', comment)
        .then(res => {
          dispatch('getComments', comment)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    removeList({ commit, dispatch }, list) {
      api.delete('lists/' + list._id)
        .then(res => {


          dispatch('getLists', list.boardId)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    removeTask({ commit, dispatch }, task) {
      api.delete('tasks/' + task._id)
        .then(res => {
          dispatch('getTasks', task)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    removeComment({ commit, dispatch }, comment) {
      api.delete('comments/' + comment._id)
        .then(res => {
          dispatch('getComments', comment)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    register({ commit, dispatch }, accountUser) {
      //console.log("user: ", accountUser.email, accountUser.name, accountUser.password)
      // commit('checkForegisterrUser', accountUser)
      auth.post('register', accountUser)
        .then(res => {
          commit('setBoards', res.data.data)

          if (!res.data.data) {
            router.push('/app');
          }

          commit('setUser', res.data.data)
          router.push('/app');

        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    //more new ones to finish

    login({ commit, dispatch }, accountUser) {
      // commit('checkForegisterrUser', accountUser)
      //console.log('starting log in 2')
      auth.post('login', accountUser)
        .then(res => {
          commit('setUser', res.data.data)
          //console.log(res.data.data.name);
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    logout({ commit, dispatch }, accountUser) {
      // commit('checkForegisterrUser', accountUser)
      auth.delete('logout', accountUser)
        .then(res => {
          //commit('setBoards', res.data.data)
          commit('setUser', {})
          dispatch('getBoards')
          router.push('/')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    authenticate({ commit, dispatch }) {
      // commit('checkForegisterrUser', accountUser)
      auth.get('authenticate')
        .then(res => {
          if (!res.data.data) {

            router.push('/app');
          }
          router.push('/'); //boards
          console.log('res.data' + res.data)
          commit('setUser', res.data.data)
        })
        .catch(err => {
          console.log('err ' + err)
          // commit('setUser', 'Nobody')
          dispatch('getBoards')
          commit('handleError', err)
        })
    },

    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    }
  }

})


export default store
