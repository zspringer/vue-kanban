<template>
  <div> 
    <!-- add any other embellishments here -->
    <!-- Active Lists: {{lists}} -->

     <li v-for="list in lists"><router-link :to="'/lists/'+list._id">{{list.name}}</router-link> <span @click="removeList(list)">x</span></li>
  </div>
</template>

<script>
export default {
  name: 'lists',
  mounted(){
    this.$root.$store.dispatch('getLists',this.$route.params.id)
  },
  computed:{
    board(){
      return this.$store.state.activeLists
    }
  }
}
</script>

<style scoped>

</style>
