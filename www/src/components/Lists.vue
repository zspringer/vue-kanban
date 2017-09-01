<template>
  <div class="card main">
    <div class="card-block">
      <button type="button" @click="removeList(listProp)" class="btn glyphicon glyphicon-trash"></button>
      <button @click="showTaskCreate" class="glyphicon glyphicon-plus right"></button>
      <p class="card-title">{{listProp.name}} <br/> ({{listProp.description}})</p>
    </div>

    <div class="task">
      <!-- <button @click="showTaskCreate" class="glyphicon glyphicon-plus"></button> -->
      <div v-if="taskCreate" class="row">
        <input type="text" placeholder="name" v-model="newtask.name">
        <input type="text" placeholder="description" v-model="newtask.description"><br/>
        <button type="submit" class="btn" @click="createTask(listProp)">Submit</button>
      </div>
    </div>
    <!-- :move="checkEnd" -->
    <draggable :id="listProp._id" v-model="tasks" :options="{group:'taskItems', draggable:'.item'}" class="dragArea" :move="checkEnd">
      <div :key="task._id" v-for="task in tasks" class="item">
        <Tasks :taskProp='task'></Tasks>
      </div>
    </draggable>


  </div>
</template>

<script>
  import Tasks from './Tasks'
  import draggable from 'vuedraggable'

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
      Tasks,
      draggable,

    },

    mounted() {
      this.$store.dispatch('getTasks', { boardId: this.listProp.boardId, listId: this.listProp._id })
    },

    computed: {
      lists() {
        return this.$store.state.activeLists
      },
      tasks: {
        get() {
          return this.$store.state.activeTasks[this.listProp._id];
        },
        set(value) {
          // console.log('setting tasks: ', value)
          var payload = { "listId": this.listProp._id, "tasks": value }
          this.$store.commit('setTasks', payload)
        }
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
      },

      checkEnd(evt) {
        console.log(evt)
        // var listid = evt.relatedContext.element.listId;
        var listid = evt.to.id;
        var taskid = evt.draggedContext.element._id;
        var data = { listId: listid, taskId: taskid }







        this.$store.dispatch('updateTaskParent', data);
      }

    }
  }

</script>

<style scoped>
  .item {
    cursor: grab;
    transition: all .250s;
  }

  .item:active {
    cursor: grabbing;
  }

  .dragArea {
    height: 100px;
    margin-bottom: 20px;
    width: 100%;
  }

  body::-webkit-scrollbar {
    width: 5px;
    height: 90%;
  }

  .main {
    overflow-x: hidden;
    height: 100vh;
    border: 1px solid black;
    border-radius: 15px;

    margin: 10px;
    padding: 5px;

    overflow-y: scroll;
  }

  .card {
    background-color: transparent;
    width: 225px;
    text-align: center;
    float: left;

    margin: 10px;
    padding: 5px;

    overflow-y: auto;
    opacity: .93;
  }

  .card-block {
    position: sticky;
    top: 0;
    z-index: 5000;
    background-color: grey;
    overflow: hidden;
    border-radius: 15px;
    /* border: 1px solid black;
     */
  }

  .card-title {
    /* border: 1px solid black;  */
    width: 100%;
    font-size: 18px;
    float: left;
    background-color: grey;
  }

  .special {
    /* border: 1px solid black; */
    /* overflow: hidden; */
  }

  .task {
    /* overflow: hidden; */
  }

  .card-block>button {
    font-size: 5 px;
    opacity: .8;
    background: none;
    float: left;
  }

  button {
    opacity: .8;
    background: none;
    float: right;
    border-radius: 10px;
  }

  .right {
    float: right !important;
  }
</style>