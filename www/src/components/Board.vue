<template>
  <div class="wholeThing">

    Active Board: {{board.name}} <br> Board Description: {{board.description}}

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
          boardId: this.$route.params.boardId
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
      }
    },

    methods: {
      showListCreate() {
        this.listCreate = !this.listCreate;
      },

      createList() {
        this.$store.dispatch('createList', this.newlist).then(() => {
          this.newlist.name = '';
          this.newlist.description = '';
          this.listCreate = !this.listCreate;
        });

      }
    }
  }

</script>

<style scoped>
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
    margin:10px;
  }

  input {
    border-radius: 10px;
  }
</style>