<template>
  <div>

    <button class="center1" v-if="activeUser" @click="showBoardCreate">Add Board</button>

    <div v-if="boardCreate" class="row">
      <div class="special">
        <input type="text" placeholder="name" v-model="newboard.name">
        <input type="text" placeholder="description" v-model="newboard.description">
        <button type="submit" class="btn" @click="createBoard">Create</button>
      </div>
    </div>

    <div class="wrap">
      <div class="center">
        <ul class="centerX">

          <li v-for="board in boards" class="wholeCard">
            <div class="card ">
              <div class="card-block">
                <router-link :to="'/boards/'+board._id">
                  <p class="card-title">{{board.name}}</p>
                  <p class="card-text">{{board.description}}</p>
                  <p class="creator">Created by: {{board.creatorName}}</p>

                </router-link>
                <button @click.prevent.stop="removeBoard(board)" class="glyphicon glyphicon-trash btn btn-xs"></button>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        boardCreate: false,
        newboard: {
          name: '',
          description: '',
          creatorName: ''
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
      },

      activeUser() {
        return this.$store.state.activeUser
      }
    },

    methods: {
      showBoardCreate() {
        this.boardCreate = !this.boardCreate;
      },

      createBoard() {
        var creatorName = this.activeUser.name
        this.newboard.creatorName = creatorName

        this.$store.dispatch('createBoard', this.newboard).then(() => {
          this.newboard.name = '';
          this.newboard.description = '';
          this.newboard.creatorName = '';
          this.boardCreate = !this.boardCreate;
        });
      },

      removeBoard(board) {
        if (board.creatorId == this.activeUser._id) {
          this.$store.dispatch('removeBoard', board)
        } else {
          alert('You do not have permission to remove this!')
        }
      }
    }
  }

</script>

<style scoped>
  * {
    /* border: 1px solid black; */
  }

  .creator {
    font-size: 10px;
  }

  .row {
    margin-top: 20px;
  }

  .btn {
    border: 1px solid black;
  }

  .card-title {
    font-weight: bold;
    font-size: 16px;
    text-decoration: underline;
  }

  .card-text {
    font-style: italic;
    font-size: 12px;
  }

  .center1 {
    text-align: center;
  }

  .wholeCard {
    font-weight: bold;
    background-color: gray;
    opacity: .5;
    border-radius: 10px;
    margin: 20px;
  }

  .center {
    float: right;
    position: relative;
    right: 50%;
    /* text-align: left; */
    text-align: center;

    margin: 0;
  }

  .centerX {
    position: relative;
    left: 50%;
  }

  .wrap {
    margin: 0 auto 0 auto;
    width: 100%;
  }

  .card {
    width: 150px;
    text-align: center;
  }

  button {
    opacity: .8;
    background: none;
    color: black;
    border-radius: 10px;
  }

  p {
    color: black !important;
    margin: 0;
  }

  ul li {
    float: left;
  }

  input {
    border-radius: 10px;
  }
</style>