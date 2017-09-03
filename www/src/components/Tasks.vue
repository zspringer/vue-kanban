<template>
  <div class="card ">
    <div class="card-block">
      <button type="button" @click="removeTask(taskProp)" class="btn glyphicon glyphicon-trash"></button>
      <p class="creator">Created by: {{taskProp.creatorName}}</p>
      <p class="card-title">{{taskProp.name}} <br/> ({{taskProp.description}})</p>
    </div>

    <div class="special">
      <button @click="showCommentCreate" class="glyphicon glyphicon-plus"></button>
      <div v-if="commentCreate" class="row">
        <input type="text" placeholder="name" v-model="newcomment.name">
        <input type="text" placeholder="description" v-model="newcomment.description"><br/>
        <button type="submit" class="btn1" @click.prevent.stop="createComment(taskProp)">Create</button>
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
          taskId: '',
          creatorName: ''
        }
      }
    },

    components: {
      Comments
    },

    mounted() {
      this.$store.dispatch('getComments', { boardId: this.taskProp.boardId, listId: this.taskProp.listId, taskId: this.taskProp._id })
    },

    computed: {
      comments() {
        return this.$store.state.activeComments[this.taskProp._id];
      },

      activeUser() {
        return this.$store.state.activeUser
      }
    },

    methods: {
      removeTask(task) {
        if (task.creatorId == this.activeUser._id) {
          this.$store.dispatch('removeTask', task)
        } else {
          alert('You do not have permission to remove this!')
        }
      },

      showCommentCreate() {
        this.commentCreate = !this.commentCreate;
      },

      createComment(commentProp) {
        var listId = commentProp.listId;
        var taskId = commentProp._id;
        var creatorName = this.activeUser.name;
        this.newcomment.listId = listId;
        this.newcomment.taskId = taskId;
        this.newcomment.creatorName = creatorName;

        this.$store.dispatch('createComment', this.newcomment).then(() => {
          this.newcomment.name = '';
          this.newcomment.description = '';
          this.newcomment.creatorName = '';
          this.commentCreate = !this.commentCreate;
        });
      }
    }
  }

</script>

<style scoped>
  .creator {
    font-size: 10px;
  }

  .card {
    background-color: lightgray;
    width: 97%;
    text-align: center;
    float: left;

    border-radius: 10px;
    overflow-y: auto;

    padding: 5px;
    margin: 5px 22px 5px 3px;
    overflow-x: hidden;
  }

  .card-title {
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

  .btn1 {
    opacity: .8;
    background: none;
    border-radius: 10px;
    border: 1px solid black;
    margin: 5px 22px 0 5px;
  }

  input {
    border-radius: 10px;
  }
</style>