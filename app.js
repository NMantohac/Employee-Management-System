const inquirer = require('inquirer');

const employeeController = require('./controllers/employeeController');
const mysqlConnection = require('./config/connection');

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
                  'Exit',
                ],
      },
    );

    console.log(search);

    switch (search) {
      case 'View All Employees':
        employeeController.viewEmployees();
        break;
      case 'View All Employees By Department':
        employeeController.viewEmployeesByDepartment();
        break;
      case 'View All Employees By Manager':
        employeeController.viewEmployeesByManager();
        break;
      case 'Add Employee':
        employeeController.addEmployee();
        break;
      case 'Remove Employee':
        employeeController.removeEmployee();
        break;
      case 'Update Employee Role':
        employeeController.updateEmployeeRole();
        break;
      case 'Update Employee Manager':
        employeeController.updateEmployeeManager();
        break;
      case 'View All Roles':
        employeeController.viewRoles();
        break;
      case 'Add Role':
        employeeController.addRole();
        break;
      case 'Remove Role':
        employeeController.removeRole();
        break;
      case 'View All Departments':
        employeeController.viewDepartments();
        break;
      case 'Add Department':
        employeeController.addDepartment();
        break;
      case 'Remove Department':
        employeeController.removeDepartment();
        break;
      case 'View Total Utilized Budget by Department':
        employeeController.viewBudgetByDepartment();
        break;
      case 'Exit':
        mysqlConnection.end();
        break;
      default:
        mysqlConnection.end();
    }
  } catch (err) {
    throw err;
  }
};

initialize();
