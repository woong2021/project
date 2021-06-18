<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <input type="text" id="username" v-model="username">
    </div>
    <div>
      <label for="password">pw: </label>
      <input type="password" id="password" v-model="password">
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data: function(){
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm: function(){
      //submit 세로고침을 막음 (jscript 방식)
      /*
      event.preventDefault(); 
      */
      console.log(this.username, this.password);
      
      let url = 'https://jsonplaceholder.typicode.com/users';
      let data = {
        username: this.username,
        password: this.password
      }

      axios.post(url, data)
        .then(function(response){
          console.log(response);
        })
        .catch(function(error){
           console.log(error); 
        });
    }
  }
}
</script>

<style>

</style>