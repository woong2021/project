<template>
  <div>
    <app-header v-bind:propsdata="str" v-on:renew="renewStr"></app-header>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader.vue';

  export default {
    data: function() {
      return {
        str: 'hi'
      }
    },
    components: {
      'app-header' : AppHeader
    },
    methods: {
      renewStr: function() {
        this.str = 'header'
      }
    }
  }

</script>

<style>

</style>