export class Todo {
    constructor(name){
        this.name = name;
        this.id = Todo.counter;
        this.completed = false;
    }

    static get counter(){
        Todo._counter = (Todo._counter || 0) + 1;
        return Todo._counter; 
    }
}

class TodoList {
    constructor(){
        this.todos = [];
    }

    add(todo){
        this.todos.push(todo);
    }

    removeById(id){
        this.todos = this.todos.filter( (elem) =>{
            return elem.id !== +id;
        });
    }

    toggleById(id){
        let index = this.todos.findIndex( (elem)=>{
            return elem.id === +id;
        });
        this.todos[index].completed = !this.todos[index].completed;
    }
}

export let todoList = new TodoList();