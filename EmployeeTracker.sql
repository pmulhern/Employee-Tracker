CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
id int auto_increment primary key,
name VARCHAR(30)
);

CREATE TABLE role (
id int auto_increment primary key,
title VARCHAR(30),
salary DECIMAL,
department_id INT references department(id)
);

CREATE TABLE employee (
id int auto_increment primary key,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id int references role (id),
manager_id int auto_increment
);




  
