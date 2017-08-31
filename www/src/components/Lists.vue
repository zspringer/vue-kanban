<template>

  <div class="card wholeThing">
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
      <Tasks :taskProp='task'></Tasks>
    </div>
  </div>

</template>

<script>
  import Tasks from './Tasks'

  export default {
    name: 'lists',

    props: ['listProp'],

    data() {
      return {
        taskCreate: false,
        newtask: {
          name: '',
          description: '',
          boardId: this.$route.params.boardId,
          listId: ''  //we think
        }
      }
    },

    components: {
      Tasks
    },

    mounted() {
      this.$store.dispatch('getTasks', { boardId: this.listProp.boardId, listId: this.listProp._id })
    },

    computed: {
      lists() {
        return this.$store.state.activeLists
      },
      tasks() {
        return this.$store.state.activeTasks[this.listProp._id];
      }
    },

    methods: {
      removeList(list) {
        this.$store.dispatch('removeList', list)
      },

      showTaskCreate() {
        this.taskCreate = !this.taskCreate;
      },

      createTask(listProp) {
        var listId = listProp._id
        this.newtask.listId = listId
        this.$store.dispatch('createTask', this.newtask);
      }
    }
  }

</script>

<style scoped>
  .wholeThing {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .card {
    /* border-color: black; */
    /* 225px */
    background-color: gray;
    width: 225px;
    text-align: center;
    float: left;
    margin: 5px;
    padding: 5px;
  }
</style>