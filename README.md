# Homework_12_Employee_Management_System

URL Links:
  1) https://github.com/NMantohac/Homework_12_Employee_Management_System
  2) Overall Function: 
  
## Description:
  - An employee management system that displays data or does a certain function based on the user's choice out of a list in 
    the main prompt, which utilizes Inquirer (npm). The user should first copy/paste the data in seed.sql to a local database 
    in MySQL Workbench and run it, before selecting any of the choices in the main prompt. The main prompt with a list of all 
    choices will show up after the user clones/downloads this repo, and runs **npm install** and **node app.js** in VS Code's terminal.
    In general, the app does a variety of things according to the main prompt choices: View All Employees/Roles/Department,
    Add Employee/Role/Department, Remove Employee/Role/Department, and Update Employee Role/Manager. In addition, the user can 
    View All Employees By Department/Manager, as well as View Total Utilized Budget By Department. 
  - The employee management system is done through Javascript code in Visual Studio Code, and it contains several Javascript files 
    that are separated in different folders, as a standard for a back-end application. Overall, the Javascript files are written in
    vanilla Javascript and they contain variables (const/let), async & await and callback functions, try/catch blocks, arrays/objects, 
    import/exports, if-else/switch statements, for-loops, destructuring variables and queries. The necessary data in the local 
    MySQL database are in the seed.sql file, which are for running initial queries. In addition, npm installation was used in order 
    to install Inquirer for the prompts, MySQL2 to connect with the local MySQL database and to run queries as promises, and ESLint as
    a dev dependency to encourage good code syntax/standards. 
  
## Technologies:
  - Visual Studio Code
  - Javascript
  - MySQL Local Database (MySQL Workbench)
  - npm - Inquirer
  - npm - MySQL2
  - npm (Dev) - ESLint
  
## Challenges:
  - This homework was definitely quite challenging compared to the previous homeworks mainly because of the amount of code I had to
    write, and on top of ESLint showing errors very often. It was difficult to write the initial logic for several of the functions, 
    but over time it became a lot easier since the syntax were similar. Overall, this was a good experience and practice for writing 
    queries, and displaying certain data/running certain functions according to it.
  - The main two difficulties I had was accurately displaying the manager names, and getting some of the functions to work 
    the way I want them to. I spent a long and frustrating amount of time displaying the full names of the employees under the manager
    column, rather than the manager_id in MySQL Workbench. I gave up even after reading through a lot of stack overflow 
    questions/answers and MySQL documentation, so I decided to just create a new table and write the logic for it in Javascript. 
    Writing the logic behind the first few functions I started with was another issue, especially getting an array of 
    employees/roles/departments for prompts that had a list as a type, rather than an input. 
  - I felt like I learned a lot of stuff from this homework that I can definitely apply for future homeworks/projects 
    regarding MySQL queries. I was able to learn to write certain logic for functions that I wasn't able to before due to 
    spending a lot of time doing trial & error, and ESLint for practically forcing me to not write bad code. 
  - I was able to solve each of my problem through use of office hours, persistent effort, time management, patience, and 
    using my online resources!
    
## Screenshot(s):
  
  Employee Management System - Main Prompts 1:
  ![Employee Management System - Main Prompts 1:](https://puu.sh/FDoqR/909b661af1.png)
  
  Employee Management System - Main Prompts 2:
  ![Employee Management System - Main Prompts 2:](https://puu.sh/FDorf/a96502eccb.png)
  
  Employee Management System - Example (View All Employees/Roles/Departments):
  ![Employee Management System - Example (View All Employees/Roles/Departments)](https://puu.sh/FDopL/99325166cc.png)
