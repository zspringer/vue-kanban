<template>
  <div class="test">
    <!-- Put header section here with login/logout, board menu, any user info -->
    <!-- Integrate with add board below -->
    <!-- Active Boards: {{boards}} -->

    <!-- @click="createBoard" -->
    <button @click="showBoardCreate">Add Board</button>

    <div v-if="boardCreate" class="row">
      <input type="text" placeholder="name" v-model="newboard.name">
      <input type="text" placeholder="description" v-model="newboard.description">
      <button type="submit" class="btn" @click="createBoard">Submit</button>
    </div>

    <ul>
      <li v-for="board in boards" style="list-style: none">
        <div class="special">
          <router-link :to="'/boards/'+board._id" routerLinkActive="special">{{board.name}}<button @click.prevent.stop="removeBoard(board)" class="glyphicon glyphicon-trash btn btn-xs"></button></router-link> 
         
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        boardCreate: false,
        newboard: {
          name: '',
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
      showBoardCreate() {
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
  button {
    font-size: 5 px;
    opacity: .8;
    background: none;
    color: black;
  }


  .test {
    border: 1px;
    overflow: hidden;
    border-radius: 15px;
  }

  p{    
    color: black !important;
    /* text-decoration: none; */
  }
</style>