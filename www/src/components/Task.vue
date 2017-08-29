<template>
  <div> 
    <!-- add any other embellishments here -->
    Active Task: {{task}}

     <li v-for="task in list"><router-link :to="'/tasks/'+task._id">{{task.name}}</router-link> <span @click="removeTask(task)">x</span></li>
  </div>
</template>

<script>
export default {
  name: 'task',
  mounted(){
    this.$root.$store.dispatch('getTask',this.$route.params.id)
  },
  computed:{
    board(){
      return this.$store.state.activeTasks
    }
  }
}
</script>

<style scoped>

</style>
