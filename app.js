const mysql = require('mysql');
const inquirer = require('inquirer');

const sqlQuery = require('./sql-query');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected!');
  initialize();
})

const initialize = async () => {
  try {
    const { search } = await inquirer.prompt(
      {
        type: 'list',
        name: 'search',
        message: 'What would you like to do?',
        choices: ['View All Employees', 
                  'View All Employees By Department', 
                  'View All Employees By Manager', 
                  'Add Employee',
                  'Remove Employee',
                  'Update Employee Role',
                  'Update Employee Manager',
                  'View All Roles',
                  'Add Role',
                  'Remove Role',
                  'View All Departments',
                  'Add Department',
                  'Remove Department',
                  'View Total Utilized Budget by Department',
                  'Exit'
                ]
      }
    )
  
    console.log(search);
    
    switch (search) {
      case 'View All Employees':
        sqlQuery.viewEmployees();
        break;
      case 'View All Employees By Department':
        sqlQuery.viewEmployeesByDepartment();
        break;
      case 'View All Employees By Manager':
        sqlQuery.viewEmployeesByManager();
        break;
      case 'Add Employee':
        sqlQuery.addEmployee();
        break;
      case 'Remove Employee':
        sqlQuery.removeEmployee();
        break;
      case 'Update Employee Role':
        sqlQuery.updateEmployeeRole();
        break;
      case 'Update Employee Manager':
        sqlQuery.updateEmployeeManager();
        break;
      case 'View All Roles':
        sqlQuery.viewRoles();
        break;
      case 'Add Role':
        sqlQuery.addRole();
        break;
      case 'Remove Role':
        sqlQuery.removeRole();
        break;
      case 'View All Departments':
        sqlQuery.viewDepartments();
        break;
      case 'Add Department':
        sqlQuery.addDepartment();
        break;
      case 'Remove Department':
        sqlQuery.removeDepartment();
        break;
      case 'View Total Utilized Budget by Department':
        sqlQuery.viewBudgetByDepartment();
        break;
      case 'Exit':
        connection.end();
        break;
      default:
        connection.end();
    }
  } catch (err) {
    throw err;
  }
}