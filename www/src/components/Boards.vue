<template>
  <div>
    <!-- Put header section here with login/logout, board menu, any user info -->
    <!-- Integrate with add board below -->
    <!-- Active Boards: {{boards}} -->

    <!-- @click="createBoard" -->
    <button @click="showBoardCreate">Add Board</button>

    <div v-if="boardCreate" class="row">
        <input type="text" placeholder="name" v-model="newboard.name">
        <input type="text" placeholder="description" v-model="newboard.description">   
        <button type="submit" class="btn" @click.prevent="createBoard">Submit</button>
    </div>

    <ul>
      <li v-for="board in boards">
        <router-link :to="'/boards/'+ board._id">{{board.name}} <button @click.prevent="removeBoard(board)">X</button></router-link>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        boardCreate: false,
        newboard:{
          name:'',
          description: ''
        }
      }
    },

    name: 'boards',

    mounted() {
      this.$store.dispatch('getBoards')
    },

    computed: {
      boards() {
        return this.$store.state.boards
      }
    },

    methods: {
      showBoardCreate(){
        this.boardCreate = !this.boardCreate;

      },

      createBoard() {
        // this.$store.dispatch('createBoard', {
        //   name: 'Testing board creation',
        //   description: 'blarg'
        // })
        //console.log('this board is: ' + this.newboard.name)
        this.$store.dispatch('createBoard', this.newboard);
        
        
      },

      removeBoard(board) {
        //console.log(board)
        this.$store.dispatch('removeBoard', board)
      }
    }
  }

</script>

<style scoped>

</style>