//importing and requiring mysql
const mysql = require('mysql2');

//connection to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'',
        database:'company_db'
    },
    console.log('Connected to the company_db database')
);

//----importing inquirer----//
const inquirer = require('inquirer');

//----inquierer prompts-----//
function init () {
    inquirer 
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employee role",
                "delete employee",
                "update employee manager",
                "DONE"
            ]
        },
    ]).then((response) => {
        switch (response.choice) {
            case "View all departments":
                viewDepartments();
                break;

            case "View all roles":
                viewRoles();
                break;
            
            case "View all employees":
                viewEmployees();
                break;

            case "add a department":
                addDepartment();
                break;

            case "add a role":
                addRole();
                break;
            
            case "add an employee":
                addEmployee();
                break;

            case "update an employee role":
                updateRole();
                break;

            case "delete employee":
                deleteEmployee();
                break;
            
            case "update employee manager":
                updateManager();
                break;

            case "DONE":
                console.log("Thanks for visiting the Employee Tracker! Come check in with us again :)");
                process.done();
            
        }
    })
    .catch(err => {
        console.error(err);
    });
}

init();

// ----functions for prompts----//
viewRoles = () => {
    console.log("Showing departments:");
    const sql = "Select department.id AS id, department.name AS department FROM department";

    db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: rows
        });
      });
    };

    viewRoles = () => {
        console.log("Showing roles:");
        const sql = "Select role.id AS id, department.name AS department FROM department";
    
        db.query(sql, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: rows
            });
          });
        };

    viewEmployees = () => {
        console.log("Showing employees:");
        const sql = "Select department.id AS id, department.name AS department FROM department";
    
        db.query(sql, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({
              message: 'success',
              data: rows
            });
          });
    }

    addDepartment = () => {

    }

    addRole = () => {

    }

    addEmployee = () => {

    }

    updateRole = () => {

    }

    deleteEmployee = () => {

    }

    updateManager = () => {

    }

    done = () => {

    }



    
    

//---------setting up server PORT-------------//
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
