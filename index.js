// CREATE MYSQL CONNECTION
var mysql = require("mysql");
var inquirer = require("inquirer");

// Establish Connection Info
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password  ***MAY NEED TO CHANGE***
  password: "yourRootPassword",
  database: "employee_tracker"
});
// Actual connection takes call back function
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});


// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "userAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
      "View all Employees", 
      "View all Departments",
      "View all Roles",
      "View Employees by Department", 
      "View Employees by Manager",
      "Add Employee",
      "Add Department",
      "Add Role",
      "Remove Employee",
      "Remove Department",
      "Remove Role",
      "Update Employee Role",
      "Update Employee Manager",
      "View Department Utilization",
      "End Session"
      ]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.userAction === "View all Employees") {
        viewAllEployees();
      }
      else if(answer.userAction === "View all Departments") {
        viewAllDept();
      }       
      else if(answer.userAction === "View all Roles") {
        viewAllRoles();
      }       
      else if(answer.userAction === "View Employees by Department") {
        viewByDept();
      }       
      else if(answer.userAction === "View Employees by Manager") {
        viewByMgr();
      }       
      else if(answer.userAction === "Add Employee") {
        addEmployee();
      }
      else if(answer.userAction === "Add Department") {
        addDept();
      }     
      else if(answer.userAction === "Add Role") {
        addRole();
      }   
      else if(answer.userAction === "Remove Employee") {
        removeEmployee();
      }  
      else if(answer.userAction === "Remove Department") {
        removeDept();
      } 
      else if(answer.userAction === "Remove Role") {
        removeRole();
      }      
      else if(answer.userAction === "Update Employee Role") {
        updateEmployee();
      }       
      else if(answer.userAction === "Update Employee Manager") {
        updateMgr();
      } 
      else if(answer.userAction === "View Department Utilization") {
        deptSum();
      }    
      else{
        connection.end();
      }
    });
}

// View all Employees
function viewAllEployees() {
  connection.query(`SELECT e.id as "ID", e.first_name as "First Name", e.last_name as "Last Name", title as "Role", dt.name as "Department Name", salary as "Salary", m.first_name as "Manager" FROM employee e left join role on role.id = e.role_id left join department dt on dt.id = role.department_id left join employee m on m.id = e.manager_id  ORDER BY e.id ASC;`, function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
  })}

// View all Departments
function viewAllDept() {
  connection.query(`SELECT distinct dt.id as "Dept ID", dt.name as "Department Name" FROM department dt ORDER BY dt.name ASC;`, function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
  })}

// View all Roles
function viewAllRoles() {
  connection.query(`SELECT distinct id as "Role ID", title as "Role", salary as "Salary" FROM role ORDER BY title;`, function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
  })}

// View Employees by Department
function viewByDept() {
    let departments = []
    // Pull roles from database first and push to array.  This makes the list dynamic and current.
connection.query(`SELECT distinct dt.name as "department" FROM department dt ORDER BY dt.name ASC;`, function(err, results) {
    if (err) throw err;
    // console.table(results)
    for (let i = 0; i < results.length; i++) {
        let tempDept = results[i].department;
        departments.push(tempDept);
    }
    // console.log(departments)

inquirer
.prompt({
  name: "department",
  type: "list",
  message: "What department would you like to view?",
  choices: departments
})
.then(function(answer) {

connection.query(`SELECT dt.name as "Department", e.first_name as "First Name", e.last_name as "Last Name", e.id as "ID", title as "Title", salary as "Salary", m.first_name as "Manager" FROM employee e left join role on role.id = e.role_id left join department dt on dt.id = role.department_id left join employee m on m.id = e.manager_id WHERE dt.name = '${answer.department}';`, function(err, results) {
  if (err) throw err;
  console.table(results);
  start();

})
})}
)}


// View employees by Manager function
function viewByMgr() {
    let managers = []
    // Pull roles from database first and push to array.  This makes the list dynamic and current.
connection.query(`SELECT DISTINCT m.first_name as "manager" FROM employee e left join employee m on m.id = e.manager_id WHERE m.first_name IS NOT NULL;`, function(err, results) {
    if (err) throw err;
    // console.table(results)
    
    for (let i = 0; i < results.length; i++) {
        let tempMgrs = results[i].manager;
        managers.push(tempMgrs);
    }
    // console.log(managers)

  inquirer
  .prompt({
    name: "manager",
    type: "list",
    message: "What manager would you like to view?",
    choices: managers
  })
  .then(function(answer) {

  connection.query(`SELECT m.first_name as "Manager", e.first_name as "First Name", e.last_name as "Last Name", e.id as "ID", title as "Title", salary as "Salary" FROM department dt left join role on dt.id = role.department_id left join employee e on role.id = e.role_id left join employee m on m.id = e.manager_id WHERE m.first_name = '${answer.manager}';`, function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
})
  })}
  )}

  // Add an employee function
function addEmployee() {
  inquirer
  .prompt([
  {
    name: "first",
    type: "input",
    message: "What is the employee's first name",
  },
  {
    name: "last",
    type: "input",
    message: "What is the employee's last name",
  }
])
  .then(function(answer) {

  connection.query("INSERT INTO employee SET ?",
  {
    first_name: answer.first,
    last_name: answer.last
  },
  function(err, results) {
    if (err) throw err;
    // console.table(results);
    start();

  })}
  )}

  // Add a department function
function addDept() {
  inquirer
  .prompt([
  {
    name: "NewDept",
    type: "input",
    message: "What is the new department's name",
  }
])
  .then(function(answer) {

  connection.query("INSERT INTO department SET ?",
  {
    name: answer.NewDept,
  },
  function(err, results) {
    if (err) throw err;
    // console.table(results);
    start();

  })}
  )}

  // Add a role function
function addRole() {
  inquirer
  .prompt([
  {
    name: "Title",
    type: "input",
    message:  "What is the new role's name",
  },
  {
    name: "Salary",
    type: "input",
    message:  "What is the new role's annual salary",
  },
  {
    name: "Role",
    type: "input",
    message:  "What is the new role's Department ID (can update later if unknown)",
  },
])
  .then(function(answer) {

  connection.query("INSERT INTO role SET ?",
  {
    title: answer.Title,
    salary: answer.Salary,
    department_id: answer.Role,
  },
  function(err, results) {
    if (err) throw err;
    // console.table(results);
    start();

  })}
  )}

  // Remove an employee function
  function removeEmployee() {
    let employees = []
    // Pull employees from database first and push to array.  This makes the list dynamic and current.
    connection.query(`SELECT DISTINCT first_name as "name" FROM employee e WHERE first_name IS NOT NULL;`, function(err, results) {
        if (err) throw err;
        console.table(results)
        
        for (let i = 0; i < results.length; i++) {
            let tempEmp = results[i].name;
            employees.push(tempEmp);
        }
        console.log(employees)

  inquirer
  .prompt([
  {
  name: "name",
  type: "list",
  message: "Please select employee to remove?",
  choices: employees
  }
  ])
  .then(function(answer) {

  connection.query("DELETE FROM employee WHERE ?",
  {
  first_name: answer.name,
  },
  function(err, results) {
  if (err) throw err;
  // console.table(results);
  start();
})
  })}
  )}

  // Remove a department function
  function removeDept() {

    let departments = []
    // Pull departments from database first and push to array.  This makes the list dynamic and current.
    connection.query(`SELECT distinct dt.name as "department" FROM department dt ORDER BY dt.name ASC;`, function(err, results) {
        if (err) throw err;
        console.table(results)
        
        for (let i = 0; i < results.length; i++) {
            let tempDept = results[i].department;
            departments.push(tempDept);
        }
        console.log(departments)

    inquirer
    .prompt([
    {
    name: "DeptName",
    type: "list",
    message: "Please select department to remove?",
    choices: departments
    }
    ])
    .then(function(answer) {
  
    connection.query("DELETE FROM department WHERE ?",
    {
    name: answer.DeptName,
    },
    function(err, results) {
    if (err) throw err;
    // console.table(results);
    start();
  })
    })}
    )}

    // Remove a role function
    function removeRole() {

        let roles = []
        // Pull roles from database first and push to array.  This makes the list dynamic and current.
        connection.query(`SELECT distinct title as "role" FROM role;`, function(err, results) {
            if (err) throw err;
            // console.table(results)
            
            for (let i = 0; i < results.length; i++) {
                let tempRole = results[i].role;
                roles.push(tempRole);
            }
            // console.log(roles)

      inquirer
      .prompt([
      {
      name: "RoleName",
      type: "list",
      message: "Please select role to remove?",
      choices: roles
      }
      ])
      .then(function(answer) {
    
      connection.query("DELETE FROM role WHERE ?",
      {
      title: answer.RoleName,
      },
      function(err, results) {
      if (err) throw err;
      // console.table(results);
      start();
    })
      })}
      )}  

// Update employee function
function updateEmployee() {
    let updateEmp = []
    // Pull employees from database first and push to array.  This makes the list dynamic and current.
    connection.query(`SELECT DISTINCT first_name as "name" FROM employee e WHERE first_name IS NOT NULL;`, function(err, results) {
        if (err) throw err;
        // console.table(results)
        
        for (let i = 0; i < results.length; i++) {
            let tempUEmp = results[i].name;
            updateEmp.push(tempUEmp);
        }
        // console.log(updateEmp)

    let updateRoles = []

    connection.query(`SELECT CONCAT(title," id- ",id) as "role" FROM role ORDER BY title;`, function(err, results) {
        if (err) throw err;
        // console.table(results)
        
        for (let i = 0; i < results.length; i++) {
            let tempURole = results[i].role;
            updateRoles.push(tempURole);
        }

        inquirer
        .prompt([
        {
        name: "name",
        type: "list",
        message: "Please select an employee?",
        choices: updateEmp
        },
        {
        name: "RoleID",
        type: "list",
        message: "Please select select a new role.",
        choices: updateRoles
        }
        
        ])
        .then(function(answer) {
      
        connection.query("UPDATE employee SET ? WHERE ?",
        [{
        role_id: answer.RoleID.slice(-1)
        },
        {
        first_name: answer.name
        }],
  function(err, res) {
    if (err) throw err;
    
  }
);

        start();
      })
        })}
        )}

// Update employee manager function
function updateMgr() {
    let updateEmp = []
    // Pull employees from database first and push to array.  This makes the list dynamic and current.
    connection.query(`SELECT e.first_name as "name", CONCAT(m.first_name," id- ",m.id) as "manager" FROM employee e left join role on role.id = e.role_id left join department dt on dt.id = role.department_id left join employee m on m.id = e.manager_id;`, function(err, results) {
        if (err) throw err;

        for (let i = 0; i < results.length; i++) {
            let tempUEmp = results[i].name;
            updateEmp.push(tempUEmp);

        }

    let updateMgr = []
    connection.query(`SELECT DISTINCT CONCAT(m.first_name," id- ",m.id) as "manager" FROM employee e left join role on role.id = e.role_id left join department dt on dt.id = role.department_id left join employee m on m.id = e.manager_id WHERE m.id Is Not Null;`, function(err, results) {
        if (err) throw err;
        console.table(results)
        
        for (let i = 0; i < results.length; i++) {
            let tempUMgr = results[i].manager;
            updateMgr.push(tempUMgr);
        }

        inquirer
        .prompt([
        {
        name: "name",
        type: "list",
        message: "Please select an employee?",
        choices: updateEmp
        },
        {
        name: "MgrID",
        type: "list",
        message: "Please select select a new manager.",
        choices: updateMgr
        }
        
        ])
        .then(function(answer) {
        
        connection.query("UPDATE employee SET ? WHERE ?",
        [{
        manager_id: answer.MgrID.slice(-1)
        },
        {
        first_name: answer.name
        }],
    function(err, res) {
    if (err) throw err;
    }
);

        start();
    })
})}
)}

  // Total utilized budget of a department
function deptSum() {
    let departments = []
    // Pull departments from database first and push to array.  This makes the list dynamic and current.
connection.query(`SELECT distinct dt.name as "department" FROM department dt ORDER BY dt.name ASC;`, function(err, results) {
    if (err) throw err;
    // console.table(results)
    for (let i = 0; i < results.length; i++) {
        let tempDept = results[i].department;
        departments.push(tempDept);
    }
    // console.log(departments)

inquirer
.prompt({
  name: "department",
  type: "list",
  message: "Choose department to view total utilized budget.",
  choices: departments
})
.then(function(answer) {

connection.query(`SELECT DISTINCT dt.name as "Department", SUM(salary) as "Total Department Salary" FROM employee e left join role on role.id = e.role_id left join department dt on dt.id = role.department_id left join employee m on m.id = e.manager_id WHERE dt.name = '${answer.department}';`, function(err, results) {
  if (err) throw err;
  console.table(results);
  start();

})
})}
)}

