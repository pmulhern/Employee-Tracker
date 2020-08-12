USE employee_tracker;

INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal"),
("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", "80000","1"),
("Sales Lead", "100000","1"),
("Lead Engineer", "150000","2"),
("Software Engineer", "120000","2"),
("Accountant", "125000","3"),
("Legal Team Lead", "250000","4"),
("Lawyer", "190000","4"),
("Compensation Analyst", "85000","5");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe","2", "3"),
("Mike", "Chan","1", "1"),
("Ashley", "Rodriguez","2", NULL),
("Kevin", "Tupik","4", "3"),
("Malia", "Brown","5", NULL),
("Sarah", "Lourd","6", NULL),
("Tom", "Allen","7", "6"),
("Christian", "Eckenrode","8", "2");



-- INSERT INTO manager (id, first_name, last_name)
-- VALUES ("1","John", "Doe"),
-- ("3", "Mike", "Chan"),
-- ("4", "Ashley", "Rodriguez"),
-- ("7", "Sarah", "Lourd")
