import {TodoItem, TodoList} from '../types/todo'
//------------------------------------------------------------
// TODO ITEM 
//------------------------------------------------------------

export function renderTodoItems(todoItems:TodoItem[]):void{

    todoItems.forEach(todoItem => {
        const todoItemElement = renderHtmlForTheTodoItem(todoItem);
        addEventListenerToEveryButtonOnTheTodoItem(todoItemElement);
        addDragAndDropEventListenerToTheTodoItem();
    });
};


export function renderHtmlForTheTodoItem(todoItem: TodoItem){
    
    const todoListMain = document.querySelector('.todo-list-main');
    const todoItemElement = document.createElement('article');
    todoItemElement.classList.add('todo-item');
    todoItemElement.id = todoItem.id;
    todoItemElement.setAttribute('draggable', 'true');
    let emptyCircle: string;
    let checkMark: string;
    if(todoItem.isDone){
        emptyCircle = "hidden"; 
        checkMark = ""; 
    } else {
        emptyCircle = "";
        checkMark = "hidden";
    }

    todoItemElement.innerHTML = `
        <button class="status-of-todo-item-btn button"
            <img class="status-todo-of-todo-item-img icon ${emptyCircle}" src="/icons/circle-svgrepo-com.svg" alt="Status 'todo' of the to-do item">
            <img class="status-done-of-todo-item-img icon ${checkMark}" src="/icons/check-mark-button-svgrepo-com.svg" alt="Status 'todo' of the to-do item">
        </button>
        <p class="todo-item-description-p" contenteditable="false">${todoItem.description}</p>
        <button class="edit-todo-item-btn button">
            <img class="todo-item-img icon"  src="/icons/pencil-svgrepo-com.svg" title="Edit description of the todo item" alt="edit-icon of the todo item">
        </button>
        <button class="check-todo-item-btn button">
            <img class="todo-item-img icon" src="/icons/check-svgrepo-com.svg" title="Change status of the todo item to 'DONE'" alt="check-icon of the todo item">
        </button>
        <button class="delete-todo-item-btn button">
            <img class="todo-item-img icon" src="/icons/trash-svgrepo-com.svg" title="Delete the todo item" alt="delete-icon of the todo item">
        </button>
    `;
    todoListMain?.appendChild(todoItemElement);
    return todoItemElement;
};


function addEventListenerToEveryButtonOnTheTodoItem(todoItemElement: HTMLElement){

    const buttonObjects = [
        { button: todoItemElement.querySelector(".status-of-todo-item-btn") as HTMLButtonElement, action: "ChangeStatus"}, 
        { button: todoItemElement.querySelector(".edit-todo-item-btn") as HTMLButtonElement, action: "Edit" },
        { button: todoItemElement.querySelector(".check-todo-item-btn") as HTMLButtonElement, action: "Check" },
        { button: todoItemElement.querySelector(".delete-todo-item-btn") as HTMLButtonElement, action: "Delete" }
    ];
    
    buttonObjects.forEach(obj => {
        obj.button.addEventListener("click", (event: MouseEvent) => {
            try {
                const targetElement = event.target as HTMLElement;
                const todoItemElement: HTMLElement | null = targetElement.closest(".todo-item");
                if (todoItemElement) {
                    switch (obj.action) {
                        case "ChangeStatus":
                        case "Check":
                            try{
                                const statusTodoOfTodoItemImg = todoItemElement.querySelector(".status-todo-of-todo-item-img") as HTMLImageElement;
                                const statusDoneOfTodoItemImg = todoItemElement.querySelector(".status-done-of-todo-item-img") as HTMLImageElement;
                                obj.button?.addEventListener('click', ()=>{
                                    obj.button?.classList.toggle('checked');
                                    statusTodoOfTodoItemImg.classList.toggle('hidden');
                                    statusDoneOfTodoItemImg.classList.toggle('hidden');
                                    //TODO: flytta ner/upp todo-item i listan ?
                                });    
                            }
                            catch(error:any){
                                console.log("Error in eventlistener for todo-item status-btn", error);
                            }
                            break;
                        case "Edit":
                            try {
                                const todoItemDescriptionP = todoItemElement.querySelector('.todo-item-description-p') as HTMLElement;
                                obj.button?.addEventListener('click', () => {
                                    const isEditable = todoItemDescriptionP?.getAttribute('contenteditable') === 'true';
                        
                                    if (isEditable) {
                                        todoItemDescriptionP?.setAttribute('contenteditable', 'false');
                                        obj.button.innerHTML = `<img class="todo-item-img icon"  src="/icons/pencil-svgrepo-com.svg" title="Edit description of the todo item" alt="edit-icon of the todo item">`;
                                    } else {
                                        todoItemDescriptionP?.setAttribute('contenteditable', 'true');
                                        obj.button.innerText = 'Save';
                                    }
                                });
                            } catch (error) {
                                console.error('An error occurred while accessing elements:', error);
                            }
                            break; 
                        case "Delete":
                            try {
                                obj.button?.addEventListener('click', () => {
                                    todoItemElement.remove();
                                });
                            } catch (error) {
                                console.error('An error occurred while accessing elements:', error);
                            }
                            break; 
                        default:
                            console.log("Error in eventListeners in renderTodoItem function");
                    }    
                } else {
                    throw new Error("Parent todo-item not found in renderTodoItem function.");
                }
            } catch (error:any) {
                console.error("An error occurred:", error);
            }
        });
    });
};

function addDragAndDropEventListenerToTheTodoItem(){
    
};


/* function addEventListenerToEveryButtonOnEachTodoItem(){

    const buttonGroups = [
        { buttons: document.querySelectorAll<HTMLButtonElement>(".edit-todo-item-btn"), action: "Edit" },
        { buttons: document.querySelectorAll<HTMLButtonElement>(".check-todo-item-btn"), action: "Check" },
        { buttons: document.querySelectorAll<HTMLButtonElement>(".delete-todo-item-btn"), action: "Delete" }
   ];
    
    buttonGroups.forEach(group => {
        group.buttons.forEach((button: HTMLButtonElement) => {
            button.addEventListener("click", (event: MouseEvent) => {
                try {
                    const targetElement = event.target as HTMLElement;
                    const todoItem: HTMLElement | null = targetElement.closest(".todo-item");
                    if (todoItem) {
                        console.log(`${group.action} operation for todo item:`, todoItem);
                        
                        if(group.action === "Edit"){
                            //TODO:
                        } else if(group.action === "Check"){
                            //TODO:
                        } else if(group.action === "Delete"){
                            //TODO:        
                        }

                    } else {
                        throw new Error("Parent todo-item not found.");
                    }
                } catch (error) {
                console.error("An error occurred:", error);
                }
            });
        });
    });
}; */
    



