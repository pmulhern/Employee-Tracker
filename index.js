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
              else{
        connection.end();
      }
    });
}

// View all Employees
function viewAllEployees() {
  connection.query(`SELECT e.id, e.first_name, e.last_name, title, dt.name, salary, m.first_name as "manager" FROM employee e left join role on role.id = e.role_id left join department dt on dt.id = role.department_id left join employee m on m.id = e.manager_id  ORDER BY e.id ASC;`, function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
  })}

// View all Departments
function viewAllDept() {
  connection.query(`SELECT distinct dt.id as "Dept ID", dt.name as "department" FROM department dt ORDER BY dt.name ASC;`, function(err, results) {
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

connection.query(`SELECT dt.name as "department", e.first_name as "first name", e.last_name as "last name", e.id as "id", title, salary, m.first_name as "manager" FROM employee e left join role on role.id = e.role_id left join department dt on dt.id = role.department_id left join employee m on m.id = e.manager_id WHERE dt.name = '${answer.department}';`, function(err, results) {
  if (err) throw err;
  console.table(results);
  start();

})
})}
)}


function viewByMgr() {
    let managers = []
connection.query(`SELECT DISTINCT m.first_name as "manager" FROM employee e left join employee m on m.id = e.manager_id WHERE m.first_name IS NOT NULL;`, function(err, results) {
    if (err) throw err;
    console.table(results)
    
    for (let i = 0; i < results.length; i++) {
        let tempMgrs = results[i].manager;
        managers.push(tempMgrs);
    }
    console.log(managers)

  inquirer
  .prompt({
    name: "manager",
    type: "list",
    message: "What manager would you like to view?",
    choices: managers
  })
  .then(function(answer) {

  connection.query(`SELECT m.first_name as "manager", e.first_name as "first name", e.last_name as "last name", e.id as "id", title, salary FROM department dt left join role on dt.id = role.department_id left join employee e on role.id = e.role_id left join employee m on m.id = e.manager_id WHERE m.first_name = '${answer.manager}';`, function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
})
  })}
  )}


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

  
    
  function removeEmployee() {
    let employees = []
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

  function removeDept() {

    let departments = []
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

    function removeRole() {

        let roles = []
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

function updateEmployee() {
console.log("Updating all Rocky Road quantities...\n");
var query = connection.query(
  "UPDATE products SET ? WHERE ?",
  [
    {
      quantity: 100
    },
    {
      flavor: "Rocky Road"
    }
  ],
  function(err, res) {
    if (err) throw err;
    console.log(res.affectedRows + " products updated!\n");
  }
);

// logs the actual query being run
console.log(query.sql);
}


