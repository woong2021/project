<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <!-- <button v-on:click="addTodo">add</button> -->
        <div class="addContainer" v-on:click="addTodo">
            <i class="fas fa-plus addBtn"></i>
        </div>
        <Modal v-if="showModal" @close="showModal = false">
             <h3 slot="header"> <!-- slot : 컴포넌트를 재정의 -->
                warning!!
                <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
            </h3>
            <main slot="body">
                입력된 값이 없습니다.
            </main>
            <footer slot="footer">
                copy right
            </footer>
        </Modal>
    </div>
</template>

<script>
import Modal from './common/Modal.vue'

export default {
    data(){
        return {
            newTodoItem: "",
            showModal: false
        }
    },
    methods:{
        addTodo(){
            console.log(this.newTodoItem);
            if (this.newTodoItem !== ''){
                //저장하는 로직
                //this.$emit('addTodoItem', this.newTodoItem);
                const text = this.newTodoItem.trim();

                this.$store.commit('addOneItem', text);
                this.clearInput();
            } else {
                this.showModal = !this.showModal;
            }
        },
        clearInput(){
            // inputbox 초기화
            this.newTodoItem = '';
        }
    },
    components : {
        Modal
    }
}
</script>

<style>
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
        width: 70%;
        height: 100%;
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

    .closeModalBtn{
        color: #42b983;
    }
</style>