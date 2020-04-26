let findAllEmployees = 'SELECT employee.id AS id, first_name, last_name, title, name AS department, salary, manager_id';
      findAllEmployees += ' FROM employee';
      findAllEmployees += ' LEFT JOIN role ON employee.role_id = role.id';
      findAllEmployees += ' LEFT JOIN department ON role.department_id = department.id;';

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

const findAllRoles = 'SELECT * FROM role;';

const findAllDepartments = 'SELECT * FROM department;';


module.exports = {
  findAllEmployees,
  findAllEmployeesByDep,
  findAllEmployeesByManagerId,
  findAllEmployeesByNoId,
  findAllRoles,
  findAllDepartments,
};
