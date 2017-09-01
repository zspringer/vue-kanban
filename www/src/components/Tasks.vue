<template>

  <div class="card ">
    <div class="card-block">
      <button type="button" @click="removeTask(taskProp)" class="btn glyphicon glyphicon-trash"></button>
      <p class="card-title">{{taskProp.name}} <br/> ({{taskProp.description}})</p>
    </div>

    <div class="special">
      <button @click="showCommentCreate" class="glyphicon glyphicon-plus"></button>
      <div v-if="commentCreate" class="row">
        <input type="text" placeholder="name" v-model="newcomment.name">
        <input type="text" placeholder="description" v-model="newcomment.description"><br/>
        <button type="submit" class="btn" @click="createComment(taskProp)">Submit</button>
      </div>
    </div>

    <div v-for="comment in comments">
      <Comments :commentProp='comment'></Comments>
    </div>

  </div>

</template>

<script>
  import Comments from './Comments'

  export default {
    name: 'tasks',
    props: ['taskProp'],
    data() {
      return {
        commentCreate: false,
        newcomment: {
          name: '',
          description: '',
          boardId: this.$route.params.boardId,
          listId: '',
          taskId: ''
        }
      }
    },
    components: {
      Comments
    },

    mounted() {

      // console.log('mounted: boardId: ', this.taskProp.boardId)
      this.$store.dispatch('getComments', { boardId: this.taskProp.boardId, listId: this.taskProp.listId, taskId: this.taskProp._id })
    },
    computed: {
      // board() {
      //   return this.$store.state.activeBoard
      // },
      // lists() {
      //   return this.$store.state.activeLists
      // }

      comments() {
        return this.$store.state.activeComments[this.taskProp._id];
      }
    },

    methods: {
      removeTask(task) {
        this.$store.dispatch('removeTask', task)
      },

      showCommentCreate() {
        this.commentCreate = !this.commentCreate;
      },

      createComment(commentProp) {
        //this.newtask.listId = list._id

        // console.log('list: ', commentProp.listId);
        // console.log('task: ', commentProp._id);


        var listId = commentProp.listId;
        var taskId = commentProp._id;
        this.newcomment.listId = listId;
        this.newcomment.taskId = taskId;

        console.log('created comment User is: ', this.$store.state.activeUser.name)

        this.$store.dispatch('createComment', this.newcomment);
      }
    }
  }

</script>

<style scoped>
  .card {
    background-color: lightgray;
    /* width: 185px; */
    width: 96%;
    text-align: center;
    float: left;

    border-radius: 15px;
    overflow-y: auto;

    padding: 5px;
    margin: 5px 20px 5px 4px;
     overflow-x: hidden;
  }

  .card-title {
    /* border: 1px solid black;  */
    font-size: 14px;
    float: left;
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

  .btn {
    opacity: .8;
    background: none;
  }

</style>