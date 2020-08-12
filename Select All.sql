USE employee_tracker;
select department.id, first_name, last_name, title, department_id, salary, manager_id
from department
left join role on department.id = role.department_id
left join employee on role.id = employee.role_id