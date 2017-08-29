<template>
  <div> 
    <!-- add any other embellishments here -->
    Active List: {{list}}

     <li v-for="list in lists"><router-link :to="'/lists/'+list._id">{{list.name}}</router-link> <span @click="removeList(list)">x</span></li>
  </div>
</template>

<script>
export default {
  name: 'list',
  mounted(){
    this.$root.$store.dispatch('getList',this.$route.params.id)
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
