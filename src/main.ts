import { v4 as uuidv4 } from 'uuid';
import { TodoItem, TodoList } from './types/todo';



// Generate a UUID
const myUUID: string = uuidv4();
console.log(myUUID);

let todoItemId = 1;  //TODO:



//------------------------------------------------------------
// DOM CONTENT LOADED
//------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    
    renderTodoListExclTodoItems();
    renderTodoItems();
    addEventListenerToEveryButtonOnEachTodoItem();
    addDragAndDropEventListenersToEachTodoItem();

});








//------------------------------------------------------------
// STORAGE Functionality
//------------------------------------------------------------

function getTodoListFromLocalStorage(): void {

}


//------------------------------------------------------------
// TODO LIST (excl todo item)
//------------------------------------------------------------

function renderTodoListExclTodoItems(){
    renderTodoListEditButtonFunctionality();
    renderTodoListInfoButtonFunctionality();
    renderTodoListDeleteButtonFunctionality();

}

function renderTodoListEditButtonFunctionality(){
    try {
        const editTodoListHeadingBtn = document.querySelector('.edit-todo-list-heading-btn') as HTMLElement;
        const todoListHeading = document.querySelector('.todo-list-heading') as HTMLElement;

        editTodoListHeadingBtn?.addEventListener('click', () => {
            const isEditable = todoListHeading?.getAttribute('contenteditable') === 'true';

            if (isEditable) {
                todoListHeading?.setAttribute('contenteditable', 'false');
                editTodoListHeadingBtn.innerHTML = `<img class="todo-item-img icon" src="/icons/pencil-svgrepo-com.svg" title="Change the name of the todo list" alt="edit-icon: Change the name of the todo list">`;
            } else {
                todoListHeading?.setAttribute('contenteditable', 'true');
                editTodoListHeadingBtn.innerText = 'Save';
            }
        });
    } catch (error) {
        console.error('An error occurred while accessing elements:', error);
    }
};

function renderTodoListInfoButtonFunctionality(){
    
    const infoButtons = document.querySelectorAll('.info-about-todo-list-btn');
    const infoDialogs = document.querySelectorAll('.info-dialog');
    const closeInfoDialogButtons = document.querySelectorAll('.close-info-dialog-btn');
    const infoDialogOverlays = document.querySelectorAll('.info-dialog-overlay');
    
    infoButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            (infoDialogs[index] as HTMLElement).style.display = 'block';
            (infoDialogOverlays[index] as HTMLElement).style.display = 'block';
        });
    });
    
    closeInfoDialogButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            (infoDialogs[index] as HTMLElement).style.display = 'none';
            (infoDialogOverlays[index] as HTMLElement).style.display = 'none';
        });
    });
};

function renderTodoListDeleteButtonFunctionality(){
    try {
        const deleteAllTodoItemsButton = document.querySelector(".delete-all-todo-items-btn") as HTMLButtonElement;
        deleteAllTodoItemsButton?.addEventListener('click', () => {
            const todoItems: NodeListOf<HTMLElement> = document.querySelectorAll('.todo-item') as NodeListOf<HTMLElement>;
            todoItems.forEach(todoItem => {
                todoItem.remove();
            });
        });
    } catch (error) {
        console.error('An error occurred while accessing elements:', error);
    }
};


//------------------------------------------------------------
// TODO ITEM 
//------------------------------------------------------------

function renderTodoItems(){


};


function renderTodoItem(todoItem: TodoItem){
    
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



    const buttonObjects = [
        { button: todoItemElement.querySelector(".status-of-todo-item-btn") as HTMLButtonElement, action: "Status"}, 
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
                        case "Status":
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









//------------------------------------------



function addEventListenerToEveryButtonOnEachTodoItem(){

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
};
    



function addDragAndDropEventListenersToEachTodoItem(){
    const todoListMain: HTMLElement | null = document.querySelector(".todo-list-main");
    console.log("todoListMain",todoListMain)
    try {
        if (todoListMain) {
        // Add event listeners for drag events on todo-list-main
        todoListMain.addEventListener("dragstart", handleDragStart);
        todoListMain.addEventListener("dragover", handleDragOver);
        todoListMain.addEventListener("drop", handleDrop);
        } else {
        throw new Error("Todo list main element not found.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};



// Drag and Drop functions

function handleDragStart(event: DragEvent) {
    try {
        const target: HTMLElement = event.target as HTMLElement;
        if (target.classList.contains("todo-item")) {
            event.dataTransfer?.setData("text/plain", target.id);
        }
    } catch (error) {
        console.error("An error occurred in handleDragStart function:", error);
    }
}


function handleDragOver(event: DragEvent) {
    try {
        event.preventDefault();
    } catch (error) {
        console.error("An error occurred in handleDragOver function:", error);
    }
}


function handleDrop(event: DragEvent): void {
    try {
        event.preventDefault();
        const data = event.dataTransfer?.getData("text/plain");
        const draggedElement = document.getElementById(data!);
        const dropTarget = event.target as HTMLElement;
        const todoItem = dropTarget.closest(".todo-item");
        if (draggedElement && todoItem) {
            todoItem.parentNode?.insertBefore(draggedElement, todoItem);
        }
    } catch (error: any) {
        console.error("An error occurred in the handleDrop function:", error);
    }
}



const addTodoItemBtn: HTMLButtonElement = document.querySelector(".add-todo-item-btn") as HTMLButtonElement;
addTodoItemBtn?.addEventListener('click', function() {
    try{
        const addTodoItemDescriptionInput: HTMLInputElement = document.querySelector(".add-todo-item-description-input") as HTMLInputElement;
        const myUUID: string = uuidv4();
        let todoItem: TodoItem = {
            id: "todo-item-"+ myUUID,
            description: addTodoItemDescriptionInput.innerText,
            isDone: false
        } 

        renderTodoItem(todoItem);
        
    }
    catch(error){

    }
});




/* const statusOfTodoItemBtn = todoItemElement.querySelector(".status-of-todo-item-btn") as HTMLButtonElement;
const statusTodoOfTodoItemImg = todoItemElement.querySelector(".status-todo-of-todo-item-img") as HTMLImageElement;
const statusDoneOfTodoItemImg = todoItemElement.querySelector(".status-done-of-todo-item-img") as HTMLImageElement;
statusOfTodoItemBtn?.addEventListener('click', ()=>{
    statusOfTodoItemBtn.classList.toggle('checked');
    statusTodoOfTodoItemImg.classList.toggle('hidden');
    statusDoneOfTodoItemImg.classList.toggle('hidden');
    //: flytta ner/upp todo-item i listan ?
}); */



/* 
if(obj.action === "Status"){
    obj.button?.addEventListener('click', ()=>{
        obj.button?.classList.toggle('checked');
        const statusTodoOfTodoItemImg = todoItemElement.querySelector(".status-todo-of-todo-item-img") as HTMLImageElement;
        const statusDoneOfTodoItemImg = todoItemElement.querySelector(".status-done-of-todo-item-img") as HTMLImageElement;
        statusTodoOfTodoItemImg.classList.toggle('hidden');
        statusDoneOfTodoItemImg.classList.toggle('hidden');
        // flytta ner/upp todo-item i listan ?
} else if (obj.action === "Edit"){
    //
} else if(obj.action === "Check"){
    //
} else if(obj.action === "Delete"){
    //       
}
 */