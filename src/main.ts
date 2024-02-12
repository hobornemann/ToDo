import { v4 as uuidv4 } from 'uuid';
import { TodoItem, TodoList } from './types/todo';



// Generate a UUID
const myUUID: string = uuidv4();
console.log(myUUID);





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

}





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









