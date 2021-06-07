<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <!-- <button v-on:click="addTodo">add</button> -->
        <div class="addContainer" v-on:click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            newTodoItem: ""
        }
    },
    methods:{
        addTodo: function(){
            console.log(this.newTodoItem);
            //저장하는 로직
            localStorage.setItem(this.newTodoItem, this.newTodoItem);
            this.clearInput();
        },
        clearInput: function(){
            // inputbox 초기화
            this.newTodoItem = '';
        }
    }
}
</script>

<style scope>
    input:focus{
        outline: none;
    }

    .inputBox {
        border-radius: 5px;
        background: #FFFFFF;
        height: 50px;
        line-height: 50px;
    }

    .inputBox input{
        border-style: none;
        font-size: 0.9rem;
        
    }

    .addContainer{
        display: block;
        border-radius: 0 5px 5px 0;
        background: linear-gradient(to right, #6478fb, #8763f8);
        width: 3rem;
        float: right;
        cursor: pointer;
        border:1px solid;
        height: 50px;
        width: 100px;
    }

    .addBtn{
        color: #ffffff;
        vertical-align: middle;
    }
</style>