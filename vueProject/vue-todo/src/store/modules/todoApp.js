const storage = {
    fetch(){
        const arr = [];
        if(localStorage.length > 0){
            for (let i = 0; i < localStorage.length; i ++){
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arr;
    },
};

const state = {
    todoItems: storage.fetch()
};

const getters = {
    toredTodoItems(state){
        return state.todoItems;
    }
};

const mutations = {
    addOneItem (state, todoItem) {
        const obj = {completed: false, item: todoItem};
    
        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItems.push(obj);
    },

    removeOneItem (state, payload) {
        localStorage.removeItem(payload.todoItem.item); //저장소 삭제
        state.todoItems.splice(payload.index, 1); // 스크립트 삭제 (splice: 기존배열을 변경하여 새로운 배열은 반환, slice: 기존배열을 변경하지 않고 삭제)
    },
    
    toggleOneItem (state, payload) {
        state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
        // localStorage 데이터 갱신
        localStorage.removeItem(payload.todoItem.item, payload.index);
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },

    clearAllItem(state){
        localStorage.clear();
        state.todoItems = [];
    }
};

export default { state, getters, mutations }