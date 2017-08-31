<template>
  <!-- <div> -->
  <!-- <div>
      <button @click="showListCreate">Add Task</button>
      <div v-if="listCreate" class="row">
        <input type="text" placeholder="name" v-model="newlist.name">
        <input type="text" placeholder="description" v-model="newlist.description">
        <button type="button" class="btn" @click.prevent.stop="createList">Submit</button>
      </div>
    </div> -->
  <!-- <div class="card-deck "> -->

  <div class="card">
    <div class="card-block">
      <button type="button" @click="removeList(listProp)" class="btn btn-primary glyphicon glyphicon-minus"></button>
      <p class="card-title">{{listProp.name}} <br/> ({{listProp.description}})</p>
    </div>

    <div>
      <button @click="showTaskCreate" class="glyphicon glyphicon-plus">AddTask</button>
      <div v-if="taskCreate" class="row">
        <input type="text" placeholder="name" v-model="newtask.name">
        <input type="text" placeholder="description" v-model="newtask.description"><br/>
        <button type="submit" class="btn" @click="createTask(listProp)">Submit</button>
      </div>
    </div>

    <div v-for="task in tasks">
      <!-- ///one task  -->
      <Tasks :taskProp='task'></Tasks>
    </div>

  </div>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
  import Tasks from './Tasks'

  export default {
    name: 'lists',

    props: ['listProp'],

    data() {
      return {
        taskCreate: false,
        tasks: '',       //holy crap! this fixed the ' Property or method 'tasks' is not defined on the instance but referenced during render. '
        newtask: {
          name: '',
          description: '',
          boardId: this.$route.params.id
        }
      }
    },


    mounted() {
      //  this.$store.dispatch('getTasks', {boardId: this.$route.params.id, listId: this.listProp._id})
      //  this.$store.dispatch('getBoard', this.$route.params.boardId),
      // this.$store.dispatch('getLists', this.$route.params.boardId),
      this.$store.dispatch('getTasks', this.$route.params.boardId)
    },

    computed: {
      // board() {
      //   return this.$store.state.activeBoard
      // },
      // lists() {
      //   return this.$store.state.activeLists
      // }
    },

    methods: {
      removeList(list) {
        console.log('fgg ', list)
        this.$store.dispatch('removeList', list)
      },

      showTaskCreate() {
        this.taskCreate = !this.taskCreate;
      },

      createTask() {
        this.$store.dispatch('createTask', this.newtask);
      }
    }
  }

</script>

<style scoped>
  .card {
    /* border-color: black; */
    background-color: gray;
    width: 225px;
    text-align: center;
    float: left;
    margin: 20px;
    padding: 5px;
  }
</style>