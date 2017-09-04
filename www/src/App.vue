<template>
  <div id="app">

    <!-- NavBar for if user is not logged in -->

    <div v-if="!activeUser" class="loggedout">
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

          <div class=" navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav navbar-right">
              <div v-if="!activeUser" class="nonSal">

                <li class="dropdown">
                  <a class="dropdown-toggle glyphicon glyphicon-user" data-toggle="dropdown"> Register<span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <form @submit.prevent="login()">
                      <input type="text" placeholder="name" v-model="accountUser.name">
                      <input type="text" placeholder="email" v-model="accountUser.email">
                      <input type="text" placeholder="password" v-model="accountUser.password">
                      <li><button type="submit" class="btn2" @click="register()">Register</button></li>
                    </form>
                  </ul>
                </li>

                <li class="dropdown">
                  <a class="dropdown-toggle glyphicon glyphicon-log-in" data-toggle="dropdown"> Login<span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    <form @submit.prevent="login()">
                      <input type="text" placeholder="email" v-model="accountUser.email">
                      <input type="text" placeholder="password" v-model="accountUser.password">
                      <li><button type="submit" class="btn2" @click="login()">Log In</button></li>
                    </form>
                  </ul>
                </li>
              </div>

              <div v-else="" class="salutation">
                <li class="user">{{activeUser.name}}</li>
                <li> <button v-if="activeUser" class="getout" @click="logOut()">Log Out</button></li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>

    <!-- NavBar for if user is logged in -->

    <div v-if="activeUser" class="loggedin">
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

          <div class=" navbar-collapse" id="myNavbar">
            <div class="special">
              <ul class="nav navbar-nav navbar-right">

                <li class="user">{{activeUser.name}}</li>
                <li> <button class="getout" @click="logOut()">Log Out</button></li>
              </ul>
            </div>

          </div>

        </div>
      </nav>
    </div>

    <error></error>

    <div class="center1">
      <h3>
        Vue-Kanban lets you work more efficiently and effectively <br/>so you and your team can get more done.
      </h3>

      <h5>
        Vue-Kanban’s structure using boards, lists, task-cards and comment-cards enable you to manage your projects<br/>        easily while enjoying the time-freedom and flexibility that only Vue-Kanban provides!
      </h5>
    </div>

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
        salutation: '',
        accountUser: {
          name: '',
          email: '',
          password: ''
        }
      }
    },

    mounted() {
      this.$store.dispatch('authenticate')
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
  * {
    /* border: 1px solid white; */
  }

  .dropdown-menu {
    background-color: black;
    color: white;
    border-radius: 10px;
    padding: 5px;
  }

  .btn2 {
    background-color: black;
    color: white;
    border-radius: 10px;
    margin: 5px;
  }

  input {
    color: black;
    border-radius: 10px;
    padding: 5px;
  }

  .center1 {
    text-align: center;
    margin: 0;
  }

  body {
    background-image: url("./images/workspace.jpg");
    /* text-align: center; */
    background-position: center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-color: black;
    margin: auto;
    color: white;
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
    margin-top: 60px;
  }

  .user {
    color: white;
    font-weight: bold;
    font-size: 20px;
    float: left;
    margin: 8px;
  }

  #myNavbar {
    width: 350 px;
    padding: 5px;
  }

  li {
    list-style: none;
  }

  .getout {
    opacity: .8;
    border-radius: 10px;
    margin: 10px 10px 10px 0;

    background-color: black;
    color: white;
    float: right;
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  #app {
    margin: 0;
    padding: 0;
  }
</style>