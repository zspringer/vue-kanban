<template>
  <div> 
    <!-- add any other embellishments here -->
    <!-- Active comments: {{comments}} -->

     <li v-for="comment in task"><router-link :to="'/comments/'+comment._id">{{comment.name}}</router-link> <span @click="removeComment(comment)">x</span></li>
  </div>
</template>

<script>
export default {
  name: 'comments',
  mounted(){
    this.$root.$store.dispatch('getComments',this.$route.params.id)
  },
  computed:{
    board(){
      return this.$store.state.activeBoard
    }
  }
}
</script>

<style scoped>

</style>
