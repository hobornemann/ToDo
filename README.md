# Project TODO

## Table of Contents

1. About the Project
   - purpose
2. Built With
3. Getting Started
   - Prerequisites
   - Installation
4. Description and Usage
5. Roadmap
6. Contributing
7. Licences
8. Contact
9. Acknowledgements

## 1. About the Project

### Purpose

The purpose of this web application is to provide the user with an easy-to-use ToDo list.



## 2. Built With

HTML
CSS
Typescript
npm
Vite
GitHub
uuid


## 3. Getting Started

### Prerequisites

1. An IDE like e.g. VS Code or IntelliJ
2. Node.js, npm, Vite
3. Web browser, e.g. Google Chrome.
4. The HTML-documents requires links to the following style-sheet and javascript-file.
    <script type="module" src="/src/main.ts" defer></script>
    <link rel="stylesheet" href="/src/styles/main.css">
    <link rel="icon" href="/icons/check-mark-button-svgrepo-com.svg" type="image/svg">
5. Access to https://github.com/hobornemann/ToDo

### Installation

1. The project is public. 
2. Log in to GitHub and clone the project:
   https://github.com/hobornemann/ToDo
3. Make sure that any new html-pages include the following css-links and javascript-links:
    <script type="module" src="/src/main.ts" defer></script>
    <link rel="stylesheet" href="/src/styles/main.css">
    <link rel="icon" href="/icons/check-mark-button-svgrepo-com.svg" type="image/svg">
4. Launching the web application: In VS Code, standing in the Terminal window, you type: npm run dev
Ctrl+click on the link http://localhost:xxxx/
The application opens in your web browser.
If you try to open the application in the Live Server, it will not work. 
The package.json needs to include the following two dependencies (or later versions thereof): 

"devDependencies": {
    "@types/uuid": "^9.0.8",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  },
  "dependencies": {
    "uuid": "^9.0.1"
  },

## 4. Description and Usage

### Description

The web application is a single-page application that provides the user with an easy-to-use ToDo list. 

- Intro / User-info:  A quick intro provides the user with a quick understanding of how to use the web-app.

- Local Storage: The todo-items are stored in the local storage of the web-browser.

- Responsivity: The application is responsive and can be used on desktops, tablets and mobile phones.

- Offline functionality: Has not been added yet. This functionality is part of future roadmap.


### Usage

1. Type Safety / Potential Bugs:
- Since 100% of the code-base has been written in Typescript, I have minimised the number of potential problems that may arise. 

2. Intuitive Navigation and Interaction:

-  The usage of standard icons makes it easy for the user to understand how to handle the ToDo list. 

3. Information-icon:

-  Should the user not understand the meaning of an icon, the user can find the answer by clicking the information/help icon. 

4. Drag & drop:

-  The ToDo-items can be drag & dropped as the user wishes to prioritise the ToDo-items. The order of the items is not yet stored in local storage. This is part of the future roadmap.    




### Code

The code/mark-up/assets can be found in the following files / folder:

HTML:                               index.html
Style:                              style.css 
Types:                              todo.d.ts, index.d.ts
EventListeners:                     main.ts
Functions:                          todoListFooter.ts, todoListHeader.ts, todoListMain.ts
Local Storage:                      localStorage.ts
Files excluded from repo:           .gitignore
README:                             README.md
Icons:                              icons folder
Images:                             no app-specific images included
Dependencies:                       package.json
Package-lock:                       package-lock.json
Typescript Configuration:           tsconfig.json
Installed packages/modules          node_modules folder


### Code Review 

In this section, I will provide some comments on the project and code, i.e. what I perceive to be the strengths and weaknesses. 

1. Strengths

a) Typescript:
100% of the code base has been written and type-checked in Typescript. No outstanding errors.

b) Design and usability:
The clean design and the intuitive interaction functionality makes it easy for the user to understand and enjoy the the web application.

c) Accessibility:
> Alt-texts have been added to all icons and the contrasts between font and background are good. Font-size is nicely readable.


2. Improvement Potential

a) Offline capability:
The use of a service worker would improve the user experience quite a bit. This should be part of future roadmap.

b) Testing:
> The application has not been properly tested. The project lacks both unit tests and proper UI-test. 

c) Error handling:
> Although try-catch blocks have been added, error handling may still be a weakness of the project at this point.

d) Language
> The app is targeting a English speaking audience, but will probablly be understood by most people. 
 



## 5. Roadmap 

The outstanding things in this project are to:
a) store the order of todo-items in local storage, so that the user maintains the prioritisation that he/she chose by dragging and dropping  
b) implement a service worker to enable offline functionality
c) make it possible to create several ToDo-lists


## 6. Contributing

Any suggestions for improvements, further developments of the project or other contributions are more than welcome.

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 7. Licences

No licences are required for development or publication of this web application. 

## 8. Contact

Project assignment designed by:
Sandra Larsson
Sandra.Larsson@ChasAcademy.se

Project developed by:

Hans-Olov Bornemann
hans-olov.bornemann@chasacademy.se

Project-link:
https://github.com/hobornemann/ToDo

## 9. Acknowledgements

Many thanks to Sandra Larsson for providing the project specification, description of required functionality as well as the design guidelines of this application.

Thanks also to the following communities/organisations/companies for providing open source and/or free version of their services/products:

Developer.Mozilla.org
GitHub
Microsoft




