<template>

  <div class="card wholeThing2">
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



    <draggable v-model="tasks" :options="{group:'taskItems', draggable:'.item'}" class="dragArea">
      <!-- <transition-group> -->
        <div :key="task._id" v-for="task in tasks" class="item">
          <Tasks :taskProp='task'></Tasks>
        </div>
      <!-- </transition-group> -->
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
      draggable
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
        set(value){
          // console.log('setting tasks: ', value)
          var payload={ "listId":this.listProp._id, "tasks":value}
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





      add: function () {
        listProp.push({
          name: 'Juan'
        });
      },
      replace: function () {
        listProp = [{
          name: 'Edgard'
        }]
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

  .wholeThing2 {
    overflow-y: auto;
    overflow-x: hidden;
    height: 60vh;
    margin: 5px;
    padding: 5px;
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