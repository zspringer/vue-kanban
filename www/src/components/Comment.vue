<template>
  <div> 
    <!-- add any other embellishments here -->
    Active comment: {{comment}}

     <li v-for="comment in comments"><router-link :to="'/comments/'+comment._id">{{comment.name}}</router-link> <span @click="removeComment(comment)">x</span></li>
  </div>
</template>

<script>
export default {
  name: 'comment',
  mounted(){
    this.$root.$store.dispatch('getComment',this.$route.params.id)
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
