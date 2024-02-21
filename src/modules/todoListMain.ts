//============================================================
// TODO-LIST-MAIN 
//============================================================

import { TodoItem, TodoList } from '../types/todo'
import { v4 as uuidv4 } from 'uuid';
import { getTodoListFromLocalStorage, updateTodoListInLocalStorage } from '../main'


//-----------------------------------------
// INITIALISE - FROM LOCAL STORAGE
//-----------------------------------------

export function renderTodoListMainElement(todoList: TodoList, todoListMainElement: HTMLElement):void {

    try{
        if(todoListMainElement){
            let html: string = "";
            //console.log("todoList::",todoList);
            if(todoList.todoItems){
                todoList.todoItems.forEach(todoItem => {
                    html += createHtmlForNewTodoItemElement(todoItem)  
                })
            } 
            todoListMainElement.innerHTML = html;
        } else {
            const errorMessage = "The HTML element 'todo-list-main' (todoListMainElement) cannot be found.";
            console.error(errorMessage);
            throw new Error(errorMessage);   
        }

    }
    catch(error){
        console.error("Error: ", error);
        throw error; 
    }
};


export function addEventListenersToTodoListMainElement(todoListMainElement: HTMLElement): void {
    try {
        if (todoListMainElement) {
            addDragAndDropEventListenerToTodoListMainElement(todoListMainElement)
            addEventListenerToAllButtonOnAllTodoItemElements(todoListMainElement);
        } else {
            const errorMessage = "The HTML element 'todo-list-main' cannot be found.";
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error; 
    }
};


function  addEventListenerToAllButtonOnAllTodoItemElements(todoListMainElement: HTMLElement){
    try{
        const todoItemElements: NodeListOf<HTMLElement>  = todoListMainElement.querySelectorAll(".todo-item");
        todoItemElements.forEach(todoItemElement => {
            addEventListenerToStatusButtonOnTodoItemElement(todoItemElement);
            addEventListenerToEditButtonOnTodoItemElement(todoItemElement);
            addEventListenerToCheckButtonOnTodoItemElement(todoItemElement);
            addEventListenerToDeleteButtonOnTodoItemElement(todoItemElement);
        })
    }
    catch(error){
        
    }

};


function createHtmlForNewTodoItemElement(todoItem: TodoItem): string{
    try{
        if(todoItem){
            let emptyCircle: string;
            let checkMark: string;
            if(todoItem.isDone){
                emptyCircle = "hidden"; 
                checkMark = ""; 
            } else {
                emptyCircle = "";
                checkMark = "hidden";
            }
            //console.log("emptyCircle",emptyCircle);
            //console.log("checkMark",checkMark);
            
            let html = `
                <li class="todo-item" id="${todoItem.id}" draggable="true">
                    <button class="status-of-todo-item-btn button">
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
                </li>  
            `; 
            return html;
        } else {
            const errorMessage = "The input parameter todoItem is null.";
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }   
    catch(error){
        console.error("Error:", error);
        throw error; 
    }
};


//----------------------------------------------------------------
// INITIALISE - NEW TODO-ITEM  (render, add eventlisteners etc) 
//----------------------------------------------------------------

export function initialiseNewTodoItemAndElement(todoList: TodoList, todoListMainElement: HTMLElement, description: string){
    // TS-object & localStorage
    const todoItem: TodoItem = createTodoItem(description);
    console.log("HALLO todoItem1",todoItem);


    const updatedTodoList = addNewTodoItemAtStartOfTodoList(todoItem, todoList);
    console.log("updatedTodoList1",updatedTodoList);
    updateTodoListInLocalStorage(updatedTodoList);
    // update HTML/DOM
    const todoItemElement = createNewTodoItemElement(todoItem);
    addNewTodoItemElementAtStartOfTodoListMainElement(todoItemElement, todoListMainElement)
    // add eventListeners
    addEventListenerToStatusButtonOnTodoItemElement(todoItemElement);
    addEventListenerToEditButtonOnTodoItemElement(todoItemElement);
    addEventListenerToCheckButtonOnTodoItemElement(todoItemElement);
    addEventListenerToDeleteButtonOnTodoItemElement(todoItemElement);
};


function createNewTodoItemElement(todoItem: TodoItem){
    const todoItemElement = document.createElement('li');
    todoItemElement.className = 'todo-item';
    todoItemElement.id = `${todoItem.id}`;
    todoItemElement.draggable = true;
    let html = `
        <button class="status-of-todo-item-btn button">
            <img class="status-todo-of-todo-item-img icon" src="/icons/circle-svgrepo-com.svg" alt="Status 'todo' of the to-do item">
            <img class="status-done-of-todo-item-img icon hidden" src="/icons/check-mark-button-svgrepo-com.svg" alt="Status 'todo' of the to-do item">
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
    todoItemElement.innerHTML = html;
    return todoItemElement
}

function addNewTodoItemAtStartOfTodoList(todoItem: TodoItem, todoList: TodoList) {
    try {
        const updatedTodoList = { ...todoList };
        if (todoItem) {
          
            if (updatedTodoList.todoItems === null) {
                updatedTodoList.todoItems = [todoItem];
            } else {
                updatedTodoList.todoItems.unshift(todoItem);
            }
            console.log("todoList after unshift:", updatedTodoList);
        }
        return updatedTodoList;
    } catch (error) {
        console.error("Error: ", error);
        throw error;
    }
}


function addNewTodoItemElementAtStartOfTodoListMainElement(todoItemElement: HTMLElement, todoListMainElement: HTMLElement){
    try{
        todoListMainElement.prepend(todoItemElement)
    }
    catch(error){
        const errorMsg = "Error: Either todoItemLiElement or todoListUlElement is null."
        console.error(errorMsg, error);
        throw new Error(errorMsg)
    }
};



//-----------------------------------------
// ADD EVENT-LISTENERS - BUTTONS  
//-----------------------------------------

function addEventListenerToStatusButtonOnTodoItemElement(todoItemElement: HTMLElement){
    toggleStatusButtonOnTodoItemElement(todoItemElement);
};

function addEventListenerToEditButtonOnTodoItemElement(todoItemElement: HTMLElement){
    try {
        const editButtonOnTodoItemElement = todoItemElement.querySelector(".edit-todo-item-btn") as HTMLButtonElement
        const todoItemDescriptionPElement = todoItemElement.querySelector('.todo-item-description-p') as HTMLElement;
        let description: string | null = todoItemDescriptionPElement.textContent;
        //console.log("",description);
        editButtonOnTodoItemElement.addEventListener('click', () => {
            const isEditable = todoItemDescriptionPElement?.getAttribute('contenteditable') === 'true';
            if (isEditable && todoItemDescriptionPElement) {
                todoItemDescriptionPElement.setAttribute('contenteditable', 'false');
                editButtonOnTodoItemElement.innerHTML = `<img class="todo-item-img icon"  src="/icons/pencil-svgrepo-com.svg" title="Edit description of the todo item" alt="edit-icon of the todo item">`;
                description = todoItemDescriptionPElement.textContent;
                //console.log("",description);
                let todoItemId = todoItemElement.id;
                let todoList = getTodoListFromLocalStorage()
                if(todoList){
                    let updatedTodoList = updateTodoItemDescriptionInTsObject(todoList, todoItemId, description);
                    updateTodoListInLocalStorage(updatedTodoList);
                }        
            } else {
                todoItemDescriptionPElement?.setAttribute('contenteditable', 'true');
                editButtonOnTodoItemElement.innerText = 'Save';
            }    
        });

    }
    catch(error:any){
        console.log("Error in event-listener for edit-todo-item-btn.", error);
        throw error;
    }
};

function addEventListenerToCheckButtonOnTodoItemElement(todoItemElement: HTMLElement){
    toggleStatusButtonOnTodoItemElement(todoItemElement);
};

function addEventListenerToDeleteButtonOnTodoItemElement(todoItemElement: HTMLElement){
    const deleteButtonOnTodoItemElement = todoItemElement.querySelector(".delete-todo-item-btn") as HTMLButtonElement
    try {
        deleteButtonOnTodoItemElement.addEventListener('click', () => {
            todoItemElement.remove();
            let todoItemId = todoItemElement.id;
            let todoList = getTodoListFromLocalStorage()
            if(todoList){
                let updatedTodoList = deleteTodoItemFromTsObject(todoList, todoItemId);
                updateTodoListInLocalStorage(updatedTodoList);
            }
        });
    } catch (error) {
        console.error('An error occurred while accessing elements:', error);
        throw error;
    }
};

function toggleStatusButtonOnTodoItemElement(todoItemElement: HTMLElement){
    const statusButtonOnTodoItemElement = todoItemElement.querySelector(".status-of-todo-item-btn") as HTMLButtonElement;
    try{
        const statusTodoOfTodoItemImg = todoItemElement.querySelector(".status-todo-of-todo-item-img") as HTMLImageElement;
        const statusDoneOfTodoItemImg = todoItemElement.querySelector(".status-done-of-todo-item-img") as HTMLImageElement;
        statusButtonOnTodoItemElement.addEventListener('click', ()=>{
            todoItemElement.classList.toggle('checked');
            statusTodoOfTodoItemImg.classList.toggle('hidden');
            statusDoneOfTodoItemImg.classList.toggle('hidden');
            //TODO: flytta ner/upp todo-item i listan ?
        });    
    }
    catch(error:any){
        console.log("Error in eventlistener for todo-item status button", error);
        throw error;
    }
}


function updateTodoItemDescriptionInTsObject(todoList: TodoList, todoItemId: string, newDescription: string | null): TodoList {
    if (!todoList.todoItems) {
        return todoList; 
    }

    const indexOfTodoItemToUpdate = todoList.todoItems.findIndex(item => item.id === todoItemId);
    if (indexOfTodoItemToUpdate === -1) {
        return todoList; 
    }

    const updatedTodoItems = todoList.todoItems.map(item => {
        if (item.id === todoItemId) {
            return {
                ...item,
                description: newDescription
            };
        }
        return item;
    });

    return {
        ...todoList,
        todoItems: updatedTodoItems
    };
  }



function deleteTodoItemFromTsObject(todoList: TodoList, todoItemId: string): TodoList {
    if (!todoList.todoItems) {
      return todoList; 
    }
    const indexOfTodoItemToDelete = todoList.todoItems.findIndex(item => item.id === todoItemId);
    if (indexOfTodoItemToDelete === -1) {
      return todoList; 
    }
    const updatedTodoItems = todoList.todoItems.filter(item => item.id !== todoItemId);

    return {
      ...todoList,
      todoItems: updatedTodoItems.length > 0 ? updatedTodoItems : null
    };
  }
  

//----------------------------------------------------
// TS-OBJECT - CREATE, GET(READ), UPDATE, DELETE, ADD  
//----------------------------------------------------

export function createTodoItem(description: string = ''): TodoItem {
    const todoItem: TodoItem = {
        id: uuidv4(),
        isDone: false,
        description: description,
    };
    return todoItem;
}

/* export function getTodoItemById(id: string): TodoItem | undefined {} */  // ROADMAP

/* function updateTodoItemById(id: string): void {
//TODO:
}

function deleteTodoItemById(id: string): void {
//TODO:
};

function deleteAllTodoItemElementsOfTodoList(){
//TODO:
};

function addTodoItemToTodoList(todoItem: TodoItem){
//TODO:
}; */



//-------------------------------------------------------------
// HTML/DOM ELEMENT - CREATE, GET (READ), UPDATE, DELETE, ADD 
//-------------------------------------------------------------

// TODO:
/* export function initialiseTodoItems(todoItems:TodoItem[]):void{

    todoItems.forEach(todoItem => {
        const todoItemElement = createTodoItemElement(todoItem);
        addEventListenerToEveryButtonOnTheTodoItem(todoItemElement);
    });
    addDragAndDropEventListenerToTodoListMain();
};
 */




//------------------------------------------------------------
// ADD EVENT-LISTENER - DRAG & DROP
//------------------------------------------------------------

export function addDragAndDropEventListenerToTodoListMainElement(todoListMainElement:HTMLElement ){
    try {
        if (todoListMainElement) {
            todoListMainElement.addEventListener("dragstart", handleDragStart);
            todoListMainElement.addEventListener("dragover", handleDragOver);
            todoListMainElement.addEventListener("drop", handleDrop);
        } else {
            const errorMsg = "The element 'todo-list-main' cannot be found.";
            console.error(errorMsg)
            throw new Error(errorMsg);
        }
    } catch (error) {
        console.error("An error occurred:", error);
        throw error
    }
};


//------------------------------------------------------------
// DRAG & DROP - FUNCTIONS: DRAG-START, DRAG-OVER, DRAG-DROP
//------------------------------------------------------------

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
            // TODO: Get sort-order from todoListMain and implement the order in localStorage
        }
    } catch (error: any) {
        console.error("An error occurred in the handleDrop function:", error);
    }
}





//----------------------------------------------------------------
// OLD CODE
//----------------------------------------------------------------


/* 
function addEventListenerToAllButtonsOnTheTodoItem(todoItemElement: HTMLElement){

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
 */