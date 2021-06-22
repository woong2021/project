<template>
  <div>
    <button @click="LoginUser1">Login</button>
    <h1>List</h1>
    <ul>
      <!-- <li v-for="item in items" v-bind:key="items">{{ item }}</li> -->
      
      <!-- async & await -->
      <li v-for="item in items">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import { handleException } from './utils/handler.js';

export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {
    // promise
    // LoginUser() {
    //   axios.get('https://jsonplaceholder.typicode.com/users/1')
      
    //   .then(response => {
    //     if (response.data.id === 1){
    //       console.log('사용자가 인증되었습니다.');

    //       axios.get('https://jsonplaceholder.typicode.com/todos')
    //       .then(response => {
    //         this.items = response.data;
    //       });        
    //     }  
    //   })
    //   .catch(error => console.log(error));
    // },

    // async & await
    async LoginUser1() {
      try {
        var response = await axios.get('https://jsonplaceholder.typicode.com/users/1');

        if(response.data.id === 1) {
          console.log('사용자가 인증되었습니다.');
          var list = await axios.get('https://jsonplaceholder.typicode.com/todos');

          this.items = list.data;
        }
      } catch (error){
        handleException(error);
        console.log(error);
      }
    }
  },
}
</script>

<style>

</style>
