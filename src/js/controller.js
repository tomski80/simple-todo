import { todoList } from "./model.js";
import { view } from "./view.js";

class Controller{
    constructor(){

    }

    init(){
        view.init();
    }
    getTodos(){
        return todoList.todos;
    }

    addTodo(todo){
        todoList.add(todo);
    }

    deleteById(todoId){
        todoList.removeById(todoId);
    }

    toggleById(todoId){
        todoList.toggleById(todoId);
    }
}

export let controller = new Controller();