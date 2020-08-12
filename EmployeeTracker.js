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
      "View all Emplyees by Department", 
      "View all Employees by Manager",
      "Add Employee",
      "Remove Employee",
      "Update Employee Role",
      "Update Employee Manager",
      "End Session"
      ]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.userAction === "View all Employees") {
        viewAll();
      }
              else if(answer.userAction === "View all Emplyees by Department") {
        viewByDept();
      }       else if(answer.userAction === "View all Employees by Manager") {
        viewByMgr();
      }       else if(answer.userAction === "Add Employee") {
        addEmployee();
      }       else if(answer.userAction === "Remove Employee") {
        removeEmployee();
      }       else if(answer.userAction === "Update Employee Role") {
        updateEmployee();
      }       else if(answer.userAction === "Update Employee Manager") {
        updateMgr();
      } 
              else{
        connection.end();
      }
    });
}

function viewAll() {
  connection.query(`SELECT e.id, e.first_name, e.last_name, title, dt.name, salary, m.first_name as "manager" FROM department dt left join role on dt.id = role.department_id left join employee e on role.id = e.role_id left join employee m on m.id = e.manager_id ORDER BY e.id ASC;`, function(err, results) {
    if (err) throw err;
    console.table(results);
    start();
  })}

  function viewByDept() {
    inquirer
    .prompt({
      name: "department",
      type: "list",
      message: "What department would you like to view?",
      choices: [
      "Engineering", 
      "Finance", 
      "Human Resources",
      "Legal",
      "Sales"
      ]
    })
    .then(function(answer) {

    connection.query(`SELECT dt.name as "department", e.first_name as "first name", e.last_name as "last name", e.id as "id", title, salary, m.first_name as "manager" FROM department dt left join role on dt.id = role.department_id left join employee e on role.id = e.role_id left join employee m on m.id = e.manager_id WHERE dt.name = '${answer.department}';`, function(err, results) {
      if (err) throw err;
      console.table(results);
      start();

    })}
    )}

    function viewByMgr() {
      inquirer
      .prompt({
        name: "manager",
        type: "list",
        message: "What manager would you like to view?",
        choices: [
        "Ashley Rodriguez", 
        "John Doe", 
        "Mike Chan",
        "Sarah Lourd"
        ]
      })
      .then(function(answer) {
  
      connection.query(`SELECT department.name as "department", employee.first_name, employee.last_name, employee.id as "id", title, salary, manager.first_name as "manager" FROM department left join role on department.id = role.department_id left join employee on role.id = employee.role_id left join manager on employee.id = manager.id WHERE department.name = '${answer.manager}';`, function(err, results) {
        if (err) throw err;
        console.table(results);
        start();
  
      })}
      )}
