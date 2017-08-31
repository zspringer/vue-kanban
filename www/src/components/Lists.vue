<template>
  <div>
    <!-- add any other embellishments here -->
    <!-- Active Lists: {{lists}} -->

    <div class="card-deck ">
      <!-- <div id="templateInsert"> -->

      <!-- <div v-for="list in lists"> -->
        <!-- Template Goes Here -->

        <div class="card">
{{listProp.name}}
          <!-- <div class="card-block">
            <button type="button" @click="removeList(listProp)" class="btn btn-primary glyphicon glyphicon-minus"></button>
            <p class="card-title">{{listProp.name}} <br/> ({{listProp.description}})</p>
          </div>

          <div>
            <button @click="showTaskCreate" class="glyphicon glyphicon-plus">AddTask</button>
            <div v-if="taskCreate" class="row">
              <input type="text" placeholder="name" v-model="newtask.name">
              <input type="text" placeholder="description" v-model="newtask.description"><br/>
              <button type="submit" class="btn" @click="createTask(listProp)">Submit</button>
            </div>
          </div> -->


          <!-- <Tasks></Tasks> -->


        </div>

        <!-- End Template -->
      <!-- </div> -->

      <!-- </div> -->
    </div>


  </div>
</template>

<script>
  export default {
    name: 'lists',
    props: ['listProp'],
    data() {
      return {
        taskCreate: false,
        newtask: {
          name: '',
          description: '',
          boardId: this.$route.params.id,
         
        }
      }
    },


    mounted() {
      // console.log('ListProp:', this.listProp)
      //  this.$store.dispatch('getTasks', {boardId: this.$route.params.id, listId: this.listProp._id})
       //
    },

    computed: {
     
    },

    methods: {
      removeList(list) {
        console.log('fgg ', list)
        this.$store.dispatch('removeList', list)
      },

      showTaskCreate() {
        this.taskCreate = !this.taskCreate;
      },

      createTask(list) {
        //this.newtask.listId = list._id

        console.log('toopid id' + listProp._id)
        this.$store.dispatch('createTask', this.newtask);
      }
    }
  }

</script>

<style scoped>
  .card {
    /* border-color: black; */
    background-color: gray;
    width: 225px;
    text-align: center;
    float: left;
    margin: 20px;
    padding: 5px;
  }
</style>