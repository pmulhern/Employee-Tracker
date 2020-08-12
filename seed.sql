USE employee_tracker;

INSERT INTO department (id, name)
VALUES ("1","Sales"),("2","Engineering"),("3","Finance"),("4","Legal"),("5","Human Resources");

INSERT INTO role (id, title, salary, department_id)
VALUES ("1","Salesperson", "80000","1"),
("2","Sales Lead", "100000","1"),
("3","Lead Engineer", "150000","2"),
("4","Software Engineer", "120000","2"),
("5","Accountant", "125000","3"),
("6","Legal Team Lead", "250000","4"),
("7","Lawyer", "190000","4"),
("8","Compensation Analyst", "85000","5");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("1","John", "Doe","2", "4"),
("3", "Mike", "Chan","1", "1"),
("4", "Ashley", "Rodriguez","3", NULL),
("5", "Kevin", "Tupik","4", "4"),
("6", "Malia", "Brown","5", NULL),
("7", "Sarah", "Lourd","6", NULL),
("8", "Tom", "Allen","7", "7"),
("9", "Christian", "Eckenrode","8", "3");



INSERT INTO manager (id, first_name, last_name)
VALUES ("1","John", "Doe"),
("3", "Mike", "Chan"),
("4", "Ashley", "Rodriguez"),
("7", "Sarah", "Lourd")
