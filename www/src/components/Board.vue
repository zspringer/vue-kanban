<template>
  <div class="wholeThing">

    <div class="center1">
      <h6>
        Active Board: {{board.name}}
        <br> Board Description: {{board.description}}
        <p class="creator">Created by: {{board.creatorName}}</p>
      </h6>
    </div>
    <div>
      <button @click="showListCreate">Add List</button>
      <div v-if="listCreate" class="row">
        <input type="text" placeholder="name" v-model="newlist.name">
        <input type="text" placeholder="description" v-model="newlist.description">
        <button type="button" class="btn1" @click.prevent.stop="createList">Create</button>
      </div>
    </div>

    <div v-for="list in lists">
      <Lists :listProp='list'></Lists>
    </div>

  </div>
</template>

<script>
  import Lists from './Lists'

  export default {
    data() {
      return {
        listCreate: false,
        listHeight: '',
        newlist: {
          name: '',
          description: '',
          boardId: this.$route.params.boardId,
          creatorName: ''
        }
      }
    },

    name: 'board',

    mounted() {
      this.$store.dispatch('getBoard', this.$route.params.boardId)
      this.$store.dispatch('getLists', this.$route.params.boardId)
    },

    components: {
      Lists
    },

    computed: {
      board() {
        return this.$store.state.activeBoard
      },

      lists() {
        return this.$store.state.activeLists
      },

      activeUser() {
        return this.$store.state.activeUser
      }
    },

    methods: {
      showListCreate() {
        this.listCreate = !this.listCreate;
      },

      createList() {
        var creatorName = this.activeUser.name;
        this.newlist.creatorName = creatorName

        this.$store.dispatch('createList', this.newlist).then(() => {
          this.newlist.name = '';
          this.newlist.description = '';
          this.newlist.creatorName = '';
          this.listCreate = !this.listCreate;
        });
      }
    }
  }

</script>

<style scoped>
  .center1 {
    display: inline-block;
    text-align: center;
  }

  h6 {
    background-color: whitesmoke;
    border-radius: 10px;
    opacity: .6;
    width: 300px;
    text-align: center;
    padding: 10px, 5px, 0, 5px;
  }

  .creator {
    font-size: 10px;
  }

  .row {
    margin: 20px;
  }

  .wholeThing {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .btn1 {
    opacity: .8;
    background: none;
    border-radius: 10px;
    border: 1px solid black;
    margin: 5px 22px 0 5px;
  }

  button {
    opacity: .8;
    background: none;
    border-radius: 10px;
    margin: 10px;
  }

  input {
    border-radius: 10px;
  }
</style>