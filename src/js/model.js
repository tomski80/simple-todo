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

    static set counter(count){
        Todo._counter = count;
    }
}

class TodoList {
    constructor(){
        this.todos = [];
    }

    init(){
        this.load();    
    }

    add(name){
        let todo = new Todo(name);
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

    load(){
        this.todos = Storage.loadFromLocalStorage() || [];
        console.log("Loaded...");
    }

    save(){
        Storage.saveToLocalStorage(this.todos);
    }
}

class Storage {
    static storageAvailable(type) {
        try {
            var storage = window[type],
                x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    }

    static objToString(arrTodos){
        let stringTodos = "";
        arrTodos.forEach( (todo) => {
            stringTodos = stringTodos.concat(`${todo.name},`);
            stringTodos = stringTodos.concat(`${todo.id},`);
            stringTodos = stringTodos.concat(`${todo.completed},`);
        });
        return stringTodos;
    }

    static strToObj(string){
        let strArr = [];
        let objArr = [];
        strArr = string.split(",");
        strArr.pop(); // remove last element as it is empty space 
        for(let i = 0; i < strArr.length; i += 3){
            let obj = new Todo;
            obj.name = strArr[i];
            obj.id = +(strArr[i+1]);
            if(strArr[i+2] === "true"){
                obj.completed = true;
            }else{
                obj.completed = false;
            }
            objArr.push(obj);
        }
        return objArr;
    }

    static saveToLocalStorage(arrTodos){
        if (this.storageAvailable("localStorage")) {
            // Yippee! We can use localStorage awesomeness
            window.localStorage.setItem("todos",this.objToString(arrTodos));
            console.log("saved");
        }
        else {
            // Too bad, no localStorage for us
            console.log("Sorry, no local storage available!");
        }
    }

    static loadFromLocalStorage(){
        if (this.storageAvailable("localStorage")) {
            // Yippee! We can use localStorage awesomeness
            let string = window.localStorage.getItem("todos");
            if(string){
                //set id counter 
                let arrTodos = this.strToObj(string);
                let lastId = arrTodos[arrTodos.length-1].id;
                Todo.counter = lastId;
                // return arr of Todo objects
                return arrTodos;
            }
        }
        else {
            // Too bad, no localStorage for us
            console.log("Sorry, no local storage available!");
        }       
    }
}

export let todoList = new TodoList();