const inquirer = require('inquirer');
const connection = require('../config/connection');
const employeeQueries = require('../models/employeeTracker/employeeQueries');
// const app = require('../app');

const viewEmployees = async () => {
  try {
      const [employees] = await connection.query(employeeQueries.findAllEmployees);
        console.table(employees);
        // app.initialize();
  } catch (err) {
    throw err;
  }
};

const viewEmployeesByDepartment = async () => {
  try {
    const { employeesByDep } = await inquirer.prompt(
      {
        type: 'input',
        name: 'employeesByDep',
        message: 'Which department do you want to see the list of employees for that selected department?',
      },
    );
    const [employees] = await connection.query(employeeQueries.findAllEmployeesByDep, employeesByDep);
    console.table(employees);
} catch (err) {
  throw err;
}
};

const viewEmployeesByManager = async () => {
  try {
    const { employeesByNoId } = await inquirer.prompt(
      {
        type: 'list',
        name: 'employeesByNoId',
        message: 'Do you want to see the list of employees with no managers?',
        choices: ['Yes', 'No'],
      },
    );

    if (employeesByNoId === 'Yes') {
      const [employees] = await connection.query(employeeQueries.findAllEmployeesByNoId);
      console.table(employees);
    } else {
      const { employeesByManagerId } = await inquirer.prompt(
        {
          type: 'input',
          name: 'employeesByManagerId',
          message: 'Which manager\'s id do you want to see the list of employees for that selected manager?',
        },
      );
      const [employees] = await connection.query(employeeQueries.findAllEmployeesByManagerId, employeesByManagerId);
      console.table(employees);
    }
} catch (err) {
  throw err;
}
};

const addEmployee = () => {
  console.log('d');
};

const removeEmployee = () => {
  console.log('e');
};

const updateEmployeeRole = () => {
  console.log('f');
};

const updateEmployeeManager = () => {
  console.log('g');
};

const viewRoles = async () => {
  try {
    const [roles] = await connection.query(employeeQueries.findAllRoles);
      console.table(roles);
} catch (err) {
  throw err;
}
};

const addRole = () => {
  console.log('i');
};

const removeRole = () => {
  console.log('j');
};

const viewDepartments = async () => {
  try {
    const [departments] = await connection.query(employeeQueries.findAllDepartments);
      console.table(departments);
} catch (err) {
  throw err;
}
};

const addDepartment = () => {
  console.log('l');
};

const removeDepartment = () => {
  console.log('m');
};

const viewBudgetByDepartment = () => {
  console.log('n');
};

module.exports = {
  viewEmployees,
  viewEmployeesByDepartment,
  viewEmployeesByManager,
  addEmployee,
  removeEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewRoles,
  addRole,
  removeRole,
  viewDepartments,
  addDepartment,
  removeDepartment,
  viewBudgetByDepartment,
};
