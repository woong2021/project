<template>
  <div>
      <app-header 
        v-bind:propsdata="str"
        v-on:renew="renewStr"
      ></app-header>
      <hr>
      <form v-on:submit.prevent="subitForm">
        <div>
          <label for="username">ID : </label>
          <input type="text" id="username" v-model="username">
        </div>
        <div>
          <label for="password">PW : </label>
          <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">Login</button>  
    </form>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import axios from 'axios';

export default {
  data: function(){
    return {
      str: 'Header',
      username: '',
      password: '',
    }
  },
  components:{
    'app-header' : AppHeader
  },
  methods: {
    renewStr : function() {
      this.str = 'hi'
    },
    subitForm: function(event) {
      event.preventDefault(); // 세로고침을 막아줌
      console.log(this.username, this.password);

      var url = 'https://jsonplaceholder.typicode.com/users';
      var data = {
        username: this.username,
        password: this.password
      }
      axios.post(url, data)
        .then(function(response){
          console.log(response);
        })
        .then(function(error){
          console.log(error)
        });
    }
  }
}

</script>

<style>
  form div:first-child label{
    margin-right: 10px;
  }
</style>