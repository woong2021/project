const  addOneItem = (state, todoItem) => {
    const obj = {completed: false, item: todoItem};

    localStorage.setItem(todoItem, JSON.stringify(obj));
    state.todoItems.push(obj);
}
const removeOneItem = (state, payload) => {
    localStorage.removeItem(payload.todoItem.item); //저장소 삭제
    state.todoItems.splice(payload.index, 1); // 스크립트 삭제 (splice: 기존배열을 변경하여 새로운 배열은 반환, slice: 기존배열을 변경하지 않고 삭제)
}

const toggleOneItem = (state, payload) => {
    state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
    // localStorage 데이터 갱신
    localStorage.removeItem(payload.todoItem.item, payload.index);
    localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
}
const clearAllItem = (state) => {
    localStorage.clear();
    state.todoItems = [];
}

export { addOneItem, removeOneItem, toggleOneItem, clearAllItem }