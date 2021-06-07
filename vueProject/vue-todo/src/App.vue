<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem" v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItem"></TodoFooter>
  </div>
</template>

<script>
  import TodoHeader from './components/TodoHeader.vue'
  import TodoInput from './components/TodoInput.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'
  
  export default {
    data: function(){
      return {
        todoItems: []
      }
    },
    methods: {
        addOneItem: function(todoItem){
          const obj = {completed: false, item: todoItem};
          localStorage.setItem(todoItem, JSON.stringify(obj));
          this.todoItems.push(obj);
        },
        removeOneItem: function(todoItem, index){
            localStorage.removeItem(todoItem.item); //저장소 삭제
            this.todoItems.splice(index, 1); // 스크립트 삭제 (splice: 기존배열을 변경하여 새로운 배열은 반환, slice: 기존배열을 변경하지 않고 삭제)
        },
        toggleOneItem: function(todoItem, index){
            this.todoItems[index].completed = !this.todoItems[index].completed;
            // localStorage 데이터 갱신
            localStorage.removeItem(todoItem.item, index);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
        },
        clearAllItem: function(){
          localStorage.clear();
          this.todoItems = [];
        }
    },
    created: function(){
        if(localStorage.length > 0){
            for (let i = 0; i < localStorage.length; i ++){
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                    this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
    },
    components: {
      'TodoHeader': TodoHeader,
      'TodoInput': TodoInput,
      'TodoList': TodoList,
      'TodoFooter': TodoFooter
    }
  }
</script>
<style>
  body {
    background-color : #F6F6F6;
    text-align : center;
  }

  input {
    border-style: groove;
    width: 200px;
  }

  button {
    border-style: groove;
  }

  .shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, .03);
  }
</style>