<template>
  <div id="app">

    <div class="row firstRow">
      <div class="col-xs-1"></div>

      <div class="col-xs-2">
        <input type="text" placeholder="email" v-model="accountUser.email">
        <input type="text" placeholder="password" v-model="accountUser.password">
        <button type="submit" class="btn" @click="login()">log in</button><br>
        <button @click="logOut()">Log Out</button>

      </div>

      <div class="col-xs-3">
        <input type="text" placeholder="name" v-model="accountUser.name">
        <input type="text" placeholder="email" v-model="accountUser.email">
        <input type="text" placeholder="password" v-model="accountUser.password">
        <button type="submit" class="btn" @click="register()">Submit</button>


      </div>

      <div class="col-xs-3">
        <div>{{username}} is Logged in</div>
      </div>

      <div class="col-xs-2">

      </div>

      <div class="col-xs-1"></div>
    </div>

    <error></error>
    <router-view></router-view>


  </div>
</template>

<script>
  import Error from './components/Error'
  export default {
    name: 'app',
    components: {
      Error
    },
    data() {
      return {
        viewLogIn: false,
        viewRegister: false,
        accountUser: {
          name: '',
          email: '',
          password: ''
        }
      }
    },

    mounted() {
      //this.checkForUser()
      this.$store.dispatch('authenticate', this.accountUser)
    },

    methods: {
      login() {
        //console.log('starting log in 1')
        this.$store.dispatch('login', this.accountUser)
        //this.viewLogIn = false;
      },
      register() {
        console.log(this.accountUser);

        this.$store.dispatch('register', this.accountUser)
        //this.viewRegister = false;
      },
      checkForUser() {
        this.$store.dispatch('checkForUser')
      },
      logOut() {
        this.$store.dispatch('logout')
      }
    },
    computed: {
      username() {
        return this.$store.state.username
      }
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  * {
    outline: 1px solid black;
  }

  .firstRow {
    height: 5%;
  }
</style>