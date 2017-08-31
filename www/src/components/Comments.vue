<template>
  <!-- <div> -->
    <!-- add any other embellishments here -->
    <!-- Active comments: {{comments}} -->

    <!-- <li v-for="comment in task"><router-link :to="'/comments/'+comment._id">{{comment.name}}</router-link> <span @click="removeComment(comment)">x</span></li>
   -->

    <!-- <div class="card-deck ">-->

      <div class="card">
        <div class="card-block">
          <button type="button" @click="removeComment(commentProp)" class="btn btn-primary glyphicon glyphicon-minus"></button>
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

</style>