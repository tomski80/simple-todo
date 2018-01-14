import { todoList } from "./model.js";
import { view } from "./view.js";

class Controller{
    constructor(){

    }

    init(){
        todoList.init();
        view.init();
    }

    getTodos(){
        return todoList.todos;
    }

    addTodo(todo){
        todoList.add(todo);
        this.save();
    }

    deleteById(todoId){
        todoList.removeById(todoId);
        this.save();
    }

    toggleById(todoId){
        todoList.toggleById(todoId);
        this.save();
    }

    save(){
        todoList.save();
    }

    load(){
        todoList.load();
    }
}

export let controller = new Controller();