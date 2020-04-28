// Require inquirer dependency and other javascript files
const inquirer = require('inquirer');

const employeeController = require('./controllers/employeeController');
const connection = require('./config/connection');

// Initialize function for main inquirer prompts
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
                  'View Total Utilized Budget By Department',
                  'Exit',
                ],
      },
    );

    // Switch statements to invoke certain functions depending on inquirer prompt choice
    switch (search) {
      case 'View All Employees':
        employeeController.viewEmployees(() => {
          initialize();
        });
        break;
      case 'View All Employees By Department':
        employeeController.viewEmployeesByDepartment(() => {
          initialize();
        });
        break;
      case 'View All Employees By Manager':
        employeeController.viewEmployeesByManager(() => {
          initialize();
        });
        break;
      case 'Add Employee':
        employeeController.addEmployee(() => {
          initialize();
        });
        break;
      case 'Remove Employee':
        employeeController.removeEmployee(() => {
          initialize();
        });
        break;
      case 'Update Employee Role':
        employeeController.updateEmployeeRole(() => {
          initialize();
        });
        break;
      case 'Update Employee Manager':
        employeeController.updateEmployeeManager(() => {
          initialize();
        });
        break;
      case 'View All Roles':
        employeeController.viewRoles(() => {
          initialize();
        });
        break;
      case 'Add Role':
        employeeController.addRole(() => {
          initialize();
        });
        break;
      case 'Remove Role':
        employeeController.removeRole(() => {
          initialize();
        });
        break;
      case 'View All Departments':
        employeeController.viewDepartments(() => {
          initialize();
        });
        break;
      case 'Add Department':
        employeeController.addDepartment(() => {
          initialize();
        });
        break;
      case 'Remove Department':
        employeeController.removeDepartment(() => {
          initialize();
        });
        break;
      case 'View Total Utilized Budget By Department':
        employeeController.viewBudgetByDepartment(() => {
          initialize();
        });
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
};

initialize();
