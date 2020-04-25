const inquirer = require('inquirer');
const mysqlConnection = require('../config/connection');
const employeeQueries = require('../models/employeeTracker/employeeQueries');

const viewEmployees = () => {
  console.log('a');
};

const viewEmployeesByDepartment = () => {
  console.log('b');
};

const viewEmployeesByManager = () => {
  console.log('c');
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

const viewRoles = () => {
  console.log('h');
};

const addRole = () => {
  console.log('i');
};

const removeRole = () => {
  console.log('j');
};

const viewDepartments = () => {
  console.log('k');
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
