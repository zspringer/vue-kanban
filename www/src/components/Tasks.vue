<template>

  <div class="card wholeThing">
    <div class="card-block">
      <button type="button" @click="removeTask(taskProp)" class="btn btn-primary glyphicon glyphicon-minus"></button>
      <p class="card-title">{{taskProp.name}} <br/> ({{taskProp.description}})</p>
    </div>

    <div>
      <button @click="showCommentCreate" class="glyphicon glyphicon-plus">AddComment</button>
      <div v-if="commentCreate" class="row">
        <input type="text" placeholder="name" v-model="newcomment.name">
        <input type="text" placeholder="description" v-model="newcomment.description"><br/>
        <button type="submit" class="btn" @click="createComment(commentProp)">Submit</button>
      </div>
    </div>

    <div v-for="comment in comments">
      <Comments :commentProp='comment'></Comments>
    </div>

  </div>

</template>

<script>
  // import Comments './Comments'

  export default {
    name: 'tasks',
    props: ['taskProp'],
    data() {
      return {
        commentCreate: false,
        newcomment: {
          name: '',
          description: '',
          boardId: this.$route.params.id,
        }
      }
    },

    mounted() {
      //this.$root.$store.dispatch('getTasks',this.$route.params.id)
    },
    computed: {
      // board() {
      //   return this.$store.state.activeBoard
      // },
      // lists() {
      //   return this.$store.state.activeLists
      // }

      comments() {
        return this.$store.state.activeComments;
      }
    },

    methods: {
      removeTask(task) {
        this.$store.dispatch('removeTask', task)
      },

      showCommentCreate() {
        this.taskCreate = !this.taskCreate;
      },

      createComment() {
        //this.newtask.listId = list._id
        this.$store.dispatch('createComment', this.newcomment);
      }
    }
  }

</script>

<style scoped>
  .wholeThing {
    overflow-y: scroll;
  }

  .card {
    /* border-color: black; */
    /* 225px */
    background-color: gray;
    width: 215px;
    text-align: center;
    float: left;
    margin: 5px;
    padding: 5px;
  }
</style>