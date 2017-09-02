<template>
  <div id="app">

    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>                        
              </button>
          <a class="navbar-brand" href="#">Vue Kanban</a>
        </div>

        <div class="user">{{activeUser.name}} is Logged In</div>
        <button @click="logOut()">Log Out</button>

        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Page 1-1</a></li>
                <li><a href="#">Page 1-2</a></li>
                <li><a href="#">Page 1-3</a></li>
              </ul>
            </li>
            <li><a href="#">Page 2</a></li>
            <li><a href="#">Page 3</a></li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a class="dropdown-toggle glyphicon glyphicon-user" data-toggle="dropdown"> Register<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <form @submit.prevent="login()">
                  <input type="text" placeholder="name" v-model="accountUser.name">
                  <input type="text" placeholder="email" v-model="accountUser.email">
                  <input type="text" placeholder="password" v-model="accountUser.password">
                  <li><button type="submit" class="btn" @click="register()">Submit</button></li>
                </form>
              </ul>
            </li>

            <li class="dropdown">
              <a class="dropdown-toggle glyphicon glyphicon-log-in" data-toggle="dropdown"> Login<span class="caret"></span></a>
              <ul class="dropdown-menu">
                <form @submit.prevent="login()">
                  <input type="text" placeholder="email" v-model="accountUser.email">
                  <input type="text" placeholder="password" v-model="accountUser.password">
                  <li><button type="submit" class="btn" @click="login()">Log In</button></li>
                </form>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

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

    },

    methods: {
      login() {
        this.$store.dispatch('login', this.accountUser)
      },

      register() {
        this.$store.dispatch('register', this.accountUser)
      },

      checkForUser() {
        this.$store.dispatch('checkForUser')
      },

      logOut() {
        this.$store.dispatch('logout')
      }
    },
    computed: {
      activeUser() {
        return this.$store.state.activeUser
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

  .user {
    color: white;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  * {
    /* outline: 1px solid black; */
  }

  .firstRow {
    height: 5%;
  }
</style>