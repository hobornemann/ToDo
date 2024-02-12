import { v4 as uuidv4 } from 'uuid';



// Generate a UUID
const myUUID: string = uuidv4();
console.log(myUUID);





//------------------------------------------------------------
// EVENT-LISTENERS
//------------------------------------------------------------




document.addEventListener("DOMContentLoaded", () => {
    
    addEventListenerToEveryButtonOnEachTodoItem();
    addDragAndDropEventListenersToEachTodoItem();

});



//------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------



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









