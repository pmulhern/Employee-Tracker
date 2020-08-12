-- USE employee_tracker;
-- select department.id, first_name, last_name, title, department_id, salary, manager_id
-- from department
-- left join role on department.id = role.department_id
-- left join employee on role.id = employee.role_id

-- USE employee_tracker;
-- SELECT employee.id, employee.first_name, employee.last_name, title, dt.name, salary, manager.first_name FROM department dt left join role on dt.id = role.department_id left join employee on role.id = employee.role_id left join manager on employee.id = manager.id ORDER BY employee.id ASC

-- USE employee_tracker;
-- SELECT employee.id, employee.first_name, employee.last_name, title, department.name, salary, manager.name
-- FROM department dt 

USE employee_tracker;
SELECT e.id, e.first_name, e.last_name, title, dt.name, salary, e.manager_id, m.first_name
FROM department dt 
left join role on dt.id = role.department_id 
left join employee e on role.id = e.role_id 
left join employee m on m.id = e.manager_id
ORDER BY e.id ASC





