DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
id int primary key auto_increment,
name VARCHAR(30)
);

CREATE TABLE role (
id int primary key auto_increment,
title VARCHAR(30),
salary DECIMAL,
department_id INT references department(id),
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
id int primary key auto_increment,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id int references role (id),
manager_id int REFERENCES employee(id)
);
