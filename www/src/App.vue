<template>
  <div id="app">

    <div class="row firstRow">
      <div class="col-xs-1"></div>

      <div class="col-xs-2"></div>

      <div class="col-xs-3">

        <!-- <div v-if="!loggedIn"><button @click="showLogIn()">Sign In</button></div>
        <div v-if="!loggedIn"><button @click="showRegister()">Register</button></div> -->
        <!-- <div v-if="loggedIn"><button @click="logOut()">Log Out</button></div> -->
          

        <input type="text" placeholder="name" v-model="accountUser.name">
        <input type="text" placeholder="email" v-model="accountUser.email">
        <input type="text" placeholder="password" v-model="accountUser.password">
        <button type="submit" class="btn" @click="register()">Submit</button>
        <button @click="logOut()">Log Out</button>
        <button type="submit" class="btn" @click="login()">log in</button>

        <!-- <div v-if="viewLogIn" class="row">
          <div class="col login-box">
            <form @submit.prevent="login()">
              <input type="text" placeholder="name" v-model="accountUser.name">
              <input type="text" placeholder="email" v-model="accountUser.email">
              <input type="text" placeholder="password" v-model="accountUser.password">
              <button type="submit" class="btn">log in</button>
            </form>
          </div>
        </div>-->
      </div> 

      <div class="col-xs-3"></div>

      <div class="col-xs-2"></div>

      <div class="col-xs-1"></div>
    </div>
    <error></error>
    <router-view></router-view>







    <!-- <nav class="navbar-primary fixed"> -->
    <!-- <div class="nav-wrapper ">
        
        <div id="nav-mobile" class="left" style="list-style:none">
          <div v-if="loggedIn">
            <h1>{{username}}</h1>
          </div>  -->
    <!-- <li v-if="!loggedIn"><a @click="showLogIn()">Sign In</a></li>
          <li v-if="!loggedIn"><a @click="showRegister()">Create Account</a></li>
          <li v-if="loggedIn"><a @click="logOut()">Log Out</a></li> -->


    <!-- <div>
            <h4>Boards</h4>
          </div>
          <div>
            <div v-if="viewLogIn" class="row">
              <div class="col login-box">
                <form @submit.prevent="login()">
                  <input type="text" placeholder="name" v-model="accountUser.name">
                  <input type="text" placeholder="email" v-model="accountUser.email">
                  <input type="text" placeholder="password" v-model="accountUser.password">
                  <button type="submit" class="btn">log in</button>
                </form>
              </div>
            </div>
            <div v-if="viewRegister" class="row">
              <div class="col m6 light-blue accent-4 login-box">
                <form @submit.prevent="register()">
                  <input type="text" placeholder="username" v-model="accountUser.name">
                  <input type="text" placeholder="email" v-model="accountUser.email">
                  <input type="text" placeholder="password" v-model="accountUser.password">
                  <button type="submit" class="btn">register</button>
                </form>
              </div>
            </div>
            </li>
            </ul>
          </div>
    </nav>  -->



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
          // viewRegister: '',
          // viewLogin: '',
          // loggedIn: ''
        }
      }
    },
    mounted() {
      //this.checkForUser()
    },
    methods: {
      // showLogIn() {
      //   this.viewLogIn = !this.viewLogIn
      //   this.viewRegister = false
      // },
      // showRegister() {
      //   this.viewRegister = !this.viewRegister
      //   this.viewLogIn = false
      // },
      login() {
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
      loggedIn() {
        return this.$store.state.loggedIn
      },
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