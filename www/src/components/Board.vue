<template>
  <div>
    <!-- add any other embellishments here -->

    Active Board: {{board.name}} <br/>Board Description: {{board.description}}

    <div>
      <button @click="showListCreate">Add List</button>
      <div v-if="listCreate" class="row">
        <input type="text" placeholder="name" v-model="newlist.name">
        <input type="text" placeholder="description" v-model="newlist.description">
        <button type="submit" class="btn" @click="createList">Submit</button>
      </div>
    </div>

    <!-- <li v-for="lists in board"> -->
    <li v-for="lists in board">
      <!-- <router-link :to="'/lists/'+lists._id">{{lists.name}}</router-link> <span @click="removeList(lists)">xx</span> -->
      <router-link :to="'/this.$store.state.activeBoard.boardId/'">{{list.name}}</router-link> <button @click="removeList(list)">xx</button>
    </li>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listCreate: false,
        newlist: {
          name: '',
          description: ''
        }
      }
    },

    name: 'board',

    mounted() {
      // this.$root.$store.dispatch('getBoard', this.$route.params.id)
      // this.$root.$store.dispatch('setActiveBoard', this.$route.params.id)
      //this.$root.$store.dispatch('getBoard', this.$route.params.id)
      this.$store.dispatch('setActiveBoard')
    },

    computed: {
      board() {
        return this.$store.state.activeBoard
      }
    },

    methods: {
      showListCreate() {
        this.listCreate = !this.listCreate;
      },

      createList() {
        this.$store.dispatch('createList', this.newlist);
      },

      removeList(list) {
        //console.log(board)
        this.$store.dispatch('removeList', list)
      }
    }
  }

</script>

<style scoped>

</style>