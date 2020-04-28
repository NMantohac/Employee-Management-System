DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    name VARCHAR(30)
);

CREATE TABLE role (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary INTEGER,
    department_id INTEGER
);

CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER NULL
);

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 130000, 2),
	   ("Account Manager", 120000, 3), ("Accountant", 90000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)     
VALUES ("John", "Marston", 1, 3), ("Lara", "Croft", 2, 1), ("Cloud", "Strife", 3, null), ("Duke", "Nukem", 4, 3), ("Max", "Payne", 5, null),
	   ("Marcus", "Fenix", 6, 5), ("Sarah", "Kerrigan", 7, null), ("Samus", "Aran", 8, 7);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;