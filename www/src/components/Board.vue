<template>
  <div> 
    <!-- add any other embellishments here -->
    Active Board: {{board}}

     <li v-for="lists in board"><router-link :to="'/lists/'+list._id">{{list.name}}</router-link> <span @click="removeList(list)">xx</span></li>
  </div>
</template>

<script>
export default {
  name: 'board',
  mounted(){
    //console.log('route id is: ' + this.$route.params.id)
    this.$root.$store.dispatch('getBoard',this.$route.params.id)
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
