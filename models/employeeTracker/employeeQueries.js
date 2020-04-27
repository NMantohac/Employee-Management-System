// const connection = require('../../config/connection');

let findAllEmployees = 'SELECT employee.id AS id, first_name, last_name, title, name AS department, salary, manager_id';
      findAllEmployees += ' FROM employee';
      findAllEmployees += ' LEFT JOIN role ON employee.role_id = role.id';
      findAllEmployees += ' LEFT JOIN department ON role.department_id = department.id;';

const findAllEmployeesRegular = 'SELECT * FROM employee;';

let findAllEmployeesByDep = 'SELECT employee.id AS id, first_name, last_name, title, name AS department, salary, manager_id';
      findAllEmployeesByDep += ' FROM employee';
      findAllEmployeesByDep += ' LEFT JOIN role ON employee.role_id = role.id';
      findAllEmployeesByDep += ' LEFT JOIN department ON role.department_id = department.id';
      findAllEmployeesByDep += ' WHERE department.name = ?;';

let findAllEmployeesByManagerId = 'SELECT employee.id AS id, first_name, last_name, title, name AS department, salary, manager_id';
      findAllEmployeesByManagerId += ' FROM employee';
      findAllEmployeesByManagerId += ' LEFT JOIN role ON employee.role_id = role.id';
      findAllEmployeesByManagerId += ' LEFT JOIN department ON role.department_id = department.id';
      findAllEmployeesByManagerId += ' WHERE employee.manager_id = ?;';

let findAllEmployeesByNoId = 'SELECT employee.id AS id, first_name, last_name, title, name AS department, salary, manager_id';
      findAllEmployeesByNoId += ' FROM employee';
      findAllEmployeesByNoId += ' LEFT JOIN role ON employee.role_id = role.id';
      findAllEmployeesByNoId += ' LEFT JOIN department ON role.department_id = department.id';
      findAllEmployeesByNoId += ' WHERE employee.manager_id IS NULL;';

const addEmployee = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);';

const removeEmployee = 'DELETE FROM employee WHERE id = ?;';

const findAllRoles = 'SELECT * FROM role;';

const addRole = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);';

const removeRole = 'DELETE FROM role WHERE id = ?;';

const findAllDepartments = 'SELECT * FROM department;';

const addDepartment = 'INSERT INTO department (name) VALUES (?);';

const removeDepartment = 'DELETE FROM department WHERE id = ?;';

module.exports = {
  findAllEmployees,
  findAllEmployeesRegular,
  findAllEmployeesByDep,
  findAllEmployeesByManagerId,
  findAllEmployeesByNoId,
  addEmployee,
  removeEmployee,
  findAllRoles,
  addRole,
  removeRole,
  findAllDepartments,
  addDepartment,
  removeDepartment,
};
