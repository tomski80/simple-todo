import { controller } from "./controller.js";
import { Todo } from "./model.js";

class View{
    constructor(){
        this.elemInput = $(".input-field");
        this.elemList = $(".todo-list");
    }

    init(){
        let self = this;

        this.elemInput.keypress( (e) => {
            if ( e.which === 13){
                controller.addTodo(new Todo(this.elemInput.val()) );
                this.elemInput.val("");
                this.render();
            }
        });

        this.elemList.on("click", ".btn-completed",function(){
            let id = $(this).attr("data-id");
            controller.toggleById(id);
            self.render();
        }); 

        this.elemList.on("click", ".btn-delete" , function(){
            let id = $(this).attr("data-id");
            controller.deleteById(id);
            self.render();
        });   
    }

    render(){
        let self = this;
        //remove li elements
        $("li").remove();
        //redraw li elements
        let todos = controller.getTodos();
        todos.forEach( (todo)=> {
            let classCompleted = "";
            let checkMark = "";     
            if(todo.completed === true){
                classCompleted = "completed";
                checkMark = "checked";
            }      
            let elem = `<li class="${classCompleted}">
                            <input type="checkbox" class="btn-completed" data-id="${todo.id}" ${checkMark}> 
                            <label>${todo.name}</label> 
                            <button class="btn-delete" data-id="${todo.id}"></button>
                        </li>`;
            this.elemList.append(elem);
        });
    }
}

export let view = new View();