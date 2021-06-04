<template>
    <div>
        <ul>
            <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem" class="shadow">
                {{ todoItem }}
                <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            todoItems: []
        }
    },
    methods: {
        removeTodo: function(todoItem, index){
            console.log(todoItem, index);
            localStorage.removeItem(todoItem); //저장소 삭제
            this.todoItems.splice(index, 1); // 스크립트 삭제 (splice: 기존배열을 변경하여 새로운 배열은 반환, slice: 기존배열을 변경하지 않고 삭제)
        }
    },

    created: function(){
        if(localStorage.length > 0){
            for (var i = 0; i < localStorage.length; i ++){
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                    this.todoItems.push(localStorage.key(i));
                }
            }
        }
    }
}
</script>

<style>
    ul {
        list-style-type: none;
        padding-left: 0;
        margin-top: 0;
        text-align: left;
    }

    li{
        display: flex;
        min-height: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0.5rem 0;
        padding: 0 0.9rem;
        background: white;
        border-radius: 5px;
    }

    .checkBtn {
        line-height: 45px;
        color: #62acde;
        margin-right: 5px;
    }

    .checkBtnCompleted{
        color: #baadad;
    }

    .textCompleted{
        text-decoration: line-through;
        color: #b3adad;
    }

    .removeBtn{
        margin-left: auto;
        color: #de4343;
    }
</style>