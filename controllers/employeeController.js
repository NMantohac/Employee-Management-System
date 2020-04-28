// Require inquirer dependency and other javascript files
const inquirer = require('inquirer');
const connection = require('../config/connection');
const employeeQueries = require('../models/employeeTracker/employeeQueries');

// View All Employees
const viewEmployees = async (init) => {
  try {
      const [employees] = await connection.query(employeeQueries.findAllEmployees);
      const newTableArr = [];

      // Set manager full name if there's a manager id and it matches with the employee id for each employee, otherwise set it to null
      for (let i = 0; i < employees.length; i++) {
        let managerName = '';
        if (employees[i].manager_id !== null) {
          for (let j = 0; j < employees.length; j++) {
            if (employees[j].id === employees[i].manager_id) {
              managerName = `${employees[j].first_name} ${employees[j].last_name}`;
            }
          }
        } else {
          managerName = null;
        }

        // Creates a new table to display, so the manager column displays the full name rather than the manager id
        const newTable = {
          id: employees[i].id,
          first_name: employees[i].first_name,
          last_name: employees[i].last_name,
          title: employees[i].title,
          department: employees[i].department,
          salary: employees[i].salary,
          manager: managerName,
        };
        newTableArr.push(newTable);
      }
      console.table(newTableArr);
      init();
  } catch (err) {
    throw err;
  }
};

// View All Employees By Department
const viewEmployeesByDepartment = async (init) => {
  try {
    const [departments] = await connection.query(employeeQueries.findAllDepartments);
    const deptArr = [];

    // Adds each department name into the department array
    for (let i = 0; i < departments.length; i++) {
      deptArr.push(departments[i].name);
    }

    const { employeesByDep } = await inquirer.prompt(
      {
        type: 'list',
        name: 'employeesByDep',
        message: 'Which department do you want to see the list of employees for that selected department?',
        choices: deptArr,
      },
    );

    const [employeesByDepRes] = await connection.query(employeeQueries.findAllEmployeesByDep, employeesByDep);
    console.table(employeesByDepRes);
    init();
  } catch (err) {
    throw err;
  }
};

// View All Employees By Manager
const viewEmployeesByManager = async (init) => {
  try {
    const [employees] = await connection.query(employeeQueries.findAllEmployeesRegular);
    const managerArr = [];

    // Adds the full name of each employee into the manager array
    for (let i = 0; i < employees.length; i++) {
      const fullName = {
        name: `${employees[i].first_name} ${employees[i].last_name}`,
      };
      managerArr.push(fullName.name);
    }

    const { employeesByNoId } = await inquirer.prompt(
      {
        type: 'list',
        name: 'employeesByNoId',
        message: 'Do you want to see the list of employees with no managers?',
        choices: ['Yes', 'No'],
      },
    );

    // Views all employees with no manager, otherwise view all employees under a certain manager
    if (employeesByNoId === 'Yes') {
      const [employeesByNoIdRes] = await connection.query(employeeQueries.findAllEmployeesByNoId);
      console.table(employeesByNoIdRes);
      init();
    } else {
      const { employeeByManager } = await inquirer.prompt(
        {
          type: 'list',
          name: 'employeeByManager',
          message: 'Which manager do you want to see the list of employees for that selected manager?',
          choices: managerArr,
        },
      );

      const managerId = employees[managerArr.indexOf(employeeByManager)].id;
      const [employeesByManagerRes] = await connection.query(employeeQueries.findAllEmployeesByManagerId, managerId);

      // Views all employees under a manager depending if that manager does have employees under them
      if (employeesByManagerRes.length === 0) {
        console.log('Failed to view employees because that employee isn\'t a manager since there are no employees under that person!');
        init();
      } else {
        console.table(employeesByManagerRes);
        init();
      }
    }
  } catch (err) {
    throw err;
  }
};

// Add Employee
const addEmployee = async (init) => {
  try {
    const [roles] = await connection.query(employeeQueries.findAllRoles);
    const roleArr = [];

    // Adds each role title into the role array
    for (let i = 0; i < roles.length; i++) {
      roleArr.push(roles[i].title);
    }

    const [employees] = await connection.query(employeeQueries.findAllEmployeesRegular);
    const managerArr = [];

    // Adds the full name of each employee into the manager array
    for (let i = 0; i < employees.length; i++) {
      const fullName = {
        name: `${employees[i].first_name} ${employees[i].last_name}`,
      };
      managerArr.push(fullName.name);
    }

    managerArr.push('None');

    const { firstName, lastName, role, manager } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'What is the employee\'s first name?',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is the employee\'s last name?',
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the employee\'s role?',
        choices: roleArr,
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is the employee\'s manager?',
        choices: managerArr,
      },
    ]);

    const roleId = roles[roleArr.indexOf(role)].id;

    // Adds the new employee with or without a manager depending on if the 'None' option was selected
    if (manager === 'None') {
      await connection.query(employeeQueries.addEmployee, [firstName, lastName, roleId, null]);
      console.log('New employee with no manager successfully added!');
      init();
    } else {
      const managerId = employees[managerArr.indexOf(manager)].id;
      await connection.query(employeeQueries.addEmployee, [firstName, lastName, roleId, managerId]);
      console.log('New employee with a manager successfully added!');
      init();
    }
  } catch (err) {
    throw err;
  }
};

// Remove Employee
const removeEmployee = async (init) => {
  try {
    const [employees] = await connection.query(employeeQueries.findAllEmployeesRegular);
    const employeeArr = [];

    // Adds the full name of each employee into the employee array
    for (let i = 0; i < employees.length; i++) {
      const fullName = {
        name: `${employees[i].first_name} ${employees[i].last_name}`,
      };
      employeeArr.push(fullName.name);
    }

    const { employeeName } = await inquirer.prompt(
      {
        type: 'list',
        name: 'employeeName',
        message: 'Which employee do you want to remove?',
        choices: employeeArr,
      },
    );

    const employeeId = employees[employeeArr.indexOf(employeeName)].id;

    await connection.query(employeeQueries.removeEmployee, employeeId);
    console.log('Employee successfully removed!');
    init();
  } catch (err) {
    throw err;
  }
};

// Update Employee Role
const updateEmployeeRole = async (init) => {
  try {
    const [employees] = await connection.query(employeeQueries.findAllEmployeesRegular);
    const employeeArr = [];

    // Adds the full name of each employee into the employee array
    for (let i = 0; i < employees.length; i++) {
      const fullName = {
        name: `${employees[i].first_name} ${employees[i].last_name}`,
      };
      employeeArr.push(fullName.name);
    }

    // Adds each role title into the role array
    const [roles] = await connection.query(employeeQueries.findAllRoles);
    const roleArr = [];

    for (let i = 0; i < roles.length; i++) {
      roleArr.push(roles[i].title);
    }

    const { employee, role } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update their role?',
        choices: employeeArr,
      },
      {
        type: 'list',
        name: 'role',
        message: 'Which new role do you want to set for the selected employee?',
        choices: roleArr,
      },
    ]);

      const employeeId = employees[employeeArr.indexOf(employee)].id;
      const roleId = roles[roleArr.indexOf(role)].id;

      await connection.query(employeeQueries.updateEmployeeRole, [roleId, employeeId]);
      console.log('Employee role successfully updated!');
      init();
  } catch (err) {
    throw err;
  }
};

// Update Employee Manager
const updateEmployeeManager = async (init) => {
  try {
    const [employees] = await connection.query(employeeQueries.findAllEmployeesRegular);
    const employeeArr = [];

    // Adds the full name of each employee into the employee array
    for (let i = 0; i < employees.length; i++) {
      const fullName = {
        name: `${employees[i].first_name} ${employees[i].last_name}`,
      };
      employeeArr.push(fullName.name);
    }

    const [managers] = await connection.query(employeeQueries.findAllEmployeesRegular);
    const managerArr = [];

    // Adds the full name of each employee into the manager array
    for (let i = 0; i < managers.length; i++) {
      const fullName = {
        name: `${managers[i].first_name} ${managers[i].last_name}`,
      };
      managerArr.push(fullName.name);
    }

    managerArr.push('None');

    const { employee, manager } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update their manager?',
        choices: employeeArr,
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Which employee do you want to set as manager for the selected employee?',
        choices: managerArr,
      },
    ]);

      // Updates the employee's manager if the employee and manager aren't the same person
      if (employee === manager) {
        console.log('Failed to update employee manager because you can\'t assign a manager to the same employee!');
        init();
      } else {
        const employeeId = employees[employeeArr.indexOf(employee)].id;

        // Updates the employee's manager to another manager or to none depending if the 'None' option was selected
        if (manager === 'None') {
          await connection.query(employeeQueries.updateEmployeeManager, [null, employeeId]);
          console.log('Employee manager set to no manager successfully updated!');
          init();
        } else {
          const managerId = managers[employeeArr.indexOf(manager)].id;
          await connection.query(employeeQueries.updateEmployeeManager, [managerId, employeeId]);
          console.log('Employee manager successfully updated!');
          init();
        }
      }
  } catch (err) {
    throw err;
  }
};

// View All Roles
const viewRoles = async (init) => {
  try {
    const [roles] = await connection.query(employeeQueries.findAllRoles);
    console.table(roles);
    init();
  } catch (err) {
  throw err;
  }
};

// Add Role
const addRole = async (init) => {
  try {
    const [roles] = await connection.query(employeeQueries.findAllRoles);
    const roleArr = [];

    // Adds each role title into the role array
    for (let i = 0; i < roles.length; i++) {
      roleArr.push(roles[i].title);
    }

    const [departments] = await connection.query(employeeQueries.findAllDepartments);
    const deptArr = [];

    // Adds each department name into the department array
    for (let j = 0; j < departments.length; j++) {
      deptArr.push(departments[j].name);
    }

    const { title, salary, department } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the role that you want to add?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the annual salary for that role?',
      },
      {
        type: 'list',
        name: 'department',
        message: 'Which department do you want to add the role to?',
        choices: deptArr,
      },
    ]);

    const departmentId = departments[deptArr.indexOf(department)].id;

    // Adds the new role if that role doesn't already exist in the database
    if (roleArr.includes(title)) {
      console.log('Failed to add new role because that role already exists!');
      init();
    } else {
      await connection.query(employeeQueries.addRole, [title, salary, departmentId]);
      console.log('New role successfully added!');
      init();
    }
  } catch (err) {
    throw err;
  }
};

// Remove Role
const removeRole = async (init) => {
  try {
    const [roles] = await connection.query(employeeQueries.findAllRoles);
    const roleArr = [];

    // Adds each role title into the role array
    for (let i = 0; i < roles.length; i++) {
      roleArr.push(roles[i].title);
    }

    const { role } = await inquirer.prompt(
      {
        type: 'list',
        name: 'role',
        message: 'Which role do you want to remove?',
        choices: roleArr,
      },
    );

    const roleId = roles[roleArr.indexOf(role)].id;

    await connection.query(employeeQueries.removeRole, roleId);
    console.log('Role successfully removed!');
    init();
  } catch (err) {
    throw err;
  }
};

// View All Departments
const viewDepartments = async (init) => {
  try {
    const [departments] = await connection.query(employeeQueries.findAllDepartments);
    console.table(departments);
    init();
  } catch (err) {
  throw err;
  }
};

// Add Department
const addDepartment = async (init) => {
  try {
    const [departments] = await connection.query(employeeQueries.findAllDepartments);
    const deptArr = [];

    // Adds each department name into the department array
    for (let i = 0; i < departments.length; i++) {
      deptArr.push(departments[i].name);
    }

    const { department } = await inquirer.prompt(
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department that you want to add?',
      },
    );

    // Adds the new department if that department doesn't already exist in the database
    if (deptArr.includes(department)) {
      console.log('Failed to add new department because that department already exists!');
      init();
    } else {
      await connection.query(employeeQueries.addDepartment, department);
      console.log('New department successfully added!');
      init();
    }
  } catch (err) {
    throw err;
  }
};

// Remove Department
const removeDepartment = async (init) => {
  try {
    const [departments] = await connection.query(employeeQueries.findAllDepartments);
    const deptArr = [];

    // Adds each department name into the department array
    for (let i = 0; i < departments.length; i++) {
      deptArr.push(departments[i].name);
    }

    const { department } = await inquirer.prompt(
      {
        type: 'list',
        name: 'department',
        message: 'Which department do you want to remove?',
        choices: deptArr,
      },
    );

    const departmentId = departments[deptArr.indexOf(department)].id;

    await connection.query(employeeQueries.removeDepartment, departmentId);
    console.log('Department successfully removed!');
    init();
  } catch (err) {
    throw err;
  }
};

// View Total Utilized Budget By Department
const viewBudgetByDepartment = async (init) => {
  try {
    const [departments] = await connection.query(employeeQueries.findAllDepartments);
    const deptArr = [];

    // Adds each department name into the department array
    for (let i = 0; i < departments.length; i++) {
      deptArr.push(departments[i].name);
    }

    const { department } = await inquirer.prompt(
      {
        type: 'list',
        name: 'department',
        message: 'Which department do you want to see the combined salaries of all their employees?',
        choices: deptArr,
      },
    );

    const departmentId = departments[deptArr.indexOf(department)].id;

    const [rolesByDepId] = await connection.query(employeeQueries.findAllRolesByDepId, departmentId);

    let utilizedBudget = 0;

    // Combines the salaries for all roles in the specific department
    for (let i = 0; i < rolesByDepId.length; i++) {
      const roleId = rolesByDepId[i].id;
      const roleSalary = rolesByDepId[i].salary;

      const [employeesByRoleId] = await connection.query(employeeQueries.findAllEmployeesByRoleId, roleId);

      utilizedBudget += employeesByRoleId.length * roleSalary;

      if (i === rolesByDepId.length - 1) {
        console.log(`${department} Department's Total Utilized Budget: ${utilizedBudget}`);
        init();
      }
    }
  } catch (err) {
    throw err;
  }
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
