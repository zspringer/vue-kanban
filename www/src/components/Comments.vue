<template>
  <!-- <div> -->
  <!-- add any other embellishments here -->
  <!-- Active comments: {{comments}} -->

  <!-- <li v-for="comment in task"><router-link :to="'/comments/'+comment._id">{{comment.name}}</router-link> <span @click="removeComment(comment)">x</span></li>
   -->

  <!-- <div class="card-deck ">-->

  <div class="card">
    <div class="card-block">
      <button type="button" @click="removeComment(commentProp)" class="btn glyphicon glyphicon-trash"></button>
      <p class="card-title">{{commentProp.name}} <br/> ({{commentProp.description}})</p>
    </div>
  </div>

  <!--</div> -->
</template>

<script>
  export default {
    name: 'comments',

    props: ['commentProp'],
    // data() {
    //   return {
    //     commentCreate: false,
    //     newcomment: {
    //       name: '',
    //       description: '',
    //       boardId: this.$route.params.id,
    //     }
    //   }
    // },

    mounted() {
      //this.$store.dispatch('getComments', this.$route.params.boardId)
    },
    computed: {
      // board() {
      //   //return this.$store.state.activeBoard
      // }
    }
  }

</script>

<style scoped>
  .card {
    overflow-y: auto;
    background-color: lightslategray;
    width: 96%;
    text-align: center;
    float: left;
    margin: 5px;
    padding: 5px;

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    border: 1px solid black;
  }

  .card-title {
    /* border: 1px solid black;  */
    font-size: 10px;
    float: left;
  }

  button {
    font-size: 5 px;
    opacity: .8;
    background: none;
    float: left;
  }
</style>