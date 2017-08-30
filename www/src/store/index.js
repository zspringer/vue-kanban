import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'

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
    activeUser: {}
  },

  mutations: {
    setBoards(state, data) {
      //console.log('boards: ' + data)
      state.boards = data
    },

    setUser(state, data) {
      //console.log('test1: ' + data)
      state.activeUser = data
    },

    setActiveBoard(state, data) {
      console.log('setting aCTIVE BOARD: ' + data);
      state.activeBoard = data
    },

    handleError(state, err) {
      state.error = err
    },

  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts

    getBoards({ commit, dispatch }) {
      api('userboards')
        .then(res => {
          console.log(res)
          commit('setBoards', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    getBoard({ commit, dispatch }, id) {
      console.log('made it this far')
      api('boards/' + id)
        .then(res => {
          console.log('Checking setactiveboard ' + res.data.data)
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
          console.log('getting boards now')
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    createList({ commit, dispatch }, list) {
      //debugger
      var x = store.state.activeBoard.id;
      console.log(x)

      api.post('boards/' + store.state.activeBoard._id +'/Lists/', list)
        .then(res => {
          console.log('getting lists now')
          dispatch('getLists')
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
          dispatch('getLists')
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
          console.log(res.data.data.name);
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
          commit('setUser',{})
          dispatch('getBoards')
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
          router.push('/boards');
          commit('setUser', res.data.data)
        })
        .catch(err => {
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
