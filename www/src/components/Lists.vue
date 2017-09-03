<template>
  <div class="card main">
    <div class="card-block">
      <button type="button" @click="removeList(listProp)" class="btn glyphicon glyphicon-trash"></button>
      <p class="creator">Created by: {{listProp.creatorName}}</p>
      <button @click="showTaskCreate" class="glyphicon glyphicon-plus right"></button>
      <p class="card-title">{{listProp.name}} <br/> ({{listProp.description}})</p>

      <div>
        <div v-if="taskCreate" class="row1">
          <input type="text" placeholder="name" v-model="newtask.name">
          <input type="text" placeholder="description" v-model="newtask.description"><br/>
          <button type="submit" class="btn1" @click="createTask(listProp)">Create</button>
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
          listId: '',
          creatorName: ''
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

      activeUser() {
        return this.$store.state.activeUser
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
        if (list.creatorId == this.activeUser._id) {
          this.$store.dispatch('removeList', list)
        } else {
          alert('You do not have permission to remove this!')
        }
      },

      showTaskCreate() {
        this.taskCreate = !this.taskCreate;
      },

      createTask(listProp) {
        var listId = listProp._id
        var creatorName = this.activeUser.name;
        this.newtask.listId = listId
        this.newtask.creatorName = creatorName


        this.$store.dispatch('createTask', this.newtask).then(() => {
          this.newtask.name = '';
          this.newtask.description = '';
          this.newtask.creatorName = '';
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
  .creator {
    font-size: 10px;
  }

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
    height: 80vh;
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
    margin: 5px;
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

</style>