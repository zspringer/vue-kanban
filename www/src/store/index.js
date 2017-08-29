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
    username: ''
  },

  mutations: {
    setBoards(state, data) {
      state.boards = data
    },

    handleError(state, err) {
      state.error = err
    },

  },
  actions: {
    //when writing your auth routes (login, logout, register) be sure to use auth instead of api for the posts

    getBoards({ commit, dispatch }) {
      api('boards')
        .then(res => {
          commit('setBoards', res.data.data)
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
          dispatch('getBoards')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          this.getBoards()
        })
        .catch(err => {
          commit('handleError', err)
        })
    },



    // login({ commit, dispatch }, payload) {
    //   commit('login', payload)
    // },
    // logout({ commit, dispatch }, payload) {
    //   commit('logout', payload)
    // },

    // checkForUser({ commit, dispatch }, payload) {
    //   commit('checkForUser', payload)
    // },

    register({ commit, dispatch }, accountUser) {
      //console.log("user: ", accountUser.email, accountUser.name, accountUser.password)
      // commit('checkForegisterrUser', accountUser)
      auth.post('register', accountUser)
        .then(res => {
          //commit('setBoards', res.data.data)
          // if (!res.data.data) {
          //   router.push('/app');
          // }
          router.push('/app');

        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    //more new ones to finish

    login({ commit, dispatch }, accountUser) {
      // commit('checkForegisterrUser', accountUser)
      auth.post('login', accountUser)
        .then(res => {
          //commit('setBoards', res.data.data)
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
        })
        .catch(err => {
          commit('handleError', err)
        })
    },

    authenticate({ commit, dispatch }, accountUser) {
      // commit('checkForegisterrUser', accountUser)
      auth.get('authenticate', accountUser)
        .then(res => {
          //commit('setBoards', res.data.data)
          if (!res.data.data) {
            router.push('/boards');
          }
          router.push('/login');
        })
        .catch(err => {
          commit('handleError', err)
        })
    },


    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    }
  }

})


export default store
