<template>
  <div class="card main">
    <div class="card-block">
      <button type="button" @click="removeList(listProp)" class="btn glyphicon glyphicon-trash"></button>
      <button @click="showTaskCreate" class="glyphicon glyphicon-plus right"></button>
      <p class="card-title">{{listProp.name}} <br/> ({{listProp.description}})</p>

      <div>
        <div v-if="taskCreate" class="row1">
          <input type="text" placeholder="name" v-model="newtask.name">
          <input type="text" placeholder="description" v-model="newtask.description"><br/>
          <button type="submit" class="btn1" @click="createTask(listProp)">Submit</button>
        </div>
      </div>
    </div>

    <draggable :id="listProp._id" v-model="tasks" :options="{group:'taskItems', draggable:'.item'}" class="dragArea" :move="checkEnd">
      <li :key="task._id" v-for="task in tasks" class="item">
        <Tasks :taskProp='task'></Tasks>
      </li>
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
          listId: ''
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
        this.$store.dispatch('createTask', this.newtask).then(() => {
          this.newtask.name = '';
          this.newtask.description = '';
          this.taskCreate = !this.taskCreate;
        });
      },

      checkEnd(evt) {
        var listid = evt.to.id;
        var taskid = evt.draggedContext.element._id;
        var data = { listId: listid, taskId: taskid }

        this.$store.dispatch('updateTaskParent', data);
      }
    }
  }

</script>

<style scoped>
   ::-webkit-scrollbar {
    display: none;
  }

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

  .main {
    overflow-x: hidden;
    height: 100vh;
    border: 1px solid black;
    border-radius: 10px;

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
    padding: 7px; 

    overflow-y: auto;
    opacity: .93;
  }

  .card-block {
    position: sticky;
    top: 0;
    z-index: 5000;
    width: 98%;
    background-color: grey;
    overflow: hidden;
    border-radius: 10px;
    margin: auto;
  }

  .card-title {
    width: 100%;
    font-size: 18px;
    float: left;
    background-color: grey;
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
    margin:5px;
  }

  .right {
    float: right !important;
  }

  .btn1 {
    opacity: .8;
    background: none;
    border-radius: 10px;
    border: 1px solid black;
    margin: 5px 12px 5px 0;
  }

  input {
    border-radius: 10px;
  }
  /* .center {
    float: right;
    position: relative;
    right: 50%;
    text-align: left;
  }

  .centerX {
    position: relative;
    left: 50%;
  }

  .wrap {
    margin: 25px auto 0 auto;
    width: 100%;
  }

  ul li {
    float: left;
  }
*/
</style>