<template>
  <div class="wholeThing">
   
      Active Board: {{board.name}}  <br>
     Board Description: {{board.description}}
  
    <div>
      <button @click="showListCreate">Add List</button>
      <div v-if="listCreate" class="row">
        <input type="text" placeholder="name" v-model="newlist.name">
        <input type="text" placeholder="description" v-model="newlist.description">
        <button type="button" class="btn" @click.prevent.stop="createList">Submit</button>
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
        this.$store.dispatch('createList', this.newlist);
      }


    }
  }

</script>

<style scoped>
  .wholeThing {
    overflow-y: auto;
    overflow-x: hidden;
    
  }

  .btn {
    font-size: 5 px;
    opacity: .8;
    background: none;
    height: 5px;
    width: 5px;
  }

  button {
    opacity: .8;
    background: none;
    border-radius: 10px;
  }
</style>