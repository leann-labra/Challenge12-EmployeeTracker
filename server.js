//importing and requiring mysql 
const mysql = require('mysql2');

//----importing inquirer----//
const inquirer = require('inquirer');

//---importing console.table package---//
const conTab = require('console.table');

//connection to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password:'root',
        database:'company_db'
    },
    console.log('Connected to the company_db database')
);

db.connect(function (err) {
    if (err) throw err
    console.log("MySQL connected");
    init();
})

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
                db.done();
            
        }
    })
    .catch(err => {
        console.error(err);
    });
}

//----functions for prompts----//
    viewDepartments = () => {
        console.log("Showing departments:");
        const query = "SELECT * FROM department";

        db.query(query, (err, res) => {
        if (err) throw err 
        console.table(res)
        init()
            });
        };

    viewRoles = () => {
        console.log("Showing roles:");
        const query = "SELECT * FROM roles";
    
        db.query(query, (err, res) => {
            if (err) throw err 
            console.table(res)
            init()
        });
    }

    viewEmployees = () => {
        console.log("Showing employees:");
        const query = "SELECT * FROM employee";
        
        db.query(query, (err, res) => {
            if (err) throw err 
            console.table(res)
            init()
          });
    };

    addDepartment = () => {
        inquirer 
            .prompt([
                {
                    type:'input',
                    name:'deptName',
                    message:'Which department?'
                }
            ]).then(response => {
                const query = 'INSERT INTO department SET?'
                db.query(
                    query, {
                        department_name: response.deptName
                    }
                )
                console.log(`Added ${response.deptName} to the database`);
                init()
            });
        }

    addRole = () => {
        inquirer
            .prompt([
                {
                    type:'input',
                    name:'roleName',
                    message:'Which role?'
                },
                {
                    type:'input',
                    name:'salary',
                    message:"Role's salary?"
                },
                {
                    type:'input',
                    name:'roleDepartment',
                    message:'Which department is this role in?'
                }
            ]).then(response => {
                const query = `INSERT INTO roles SET ?`
                db.query(
                    query, {
                        title: response.roleName,
                        salary: response.salary,
                        department_id: response.roleDepartment
                    }
                )
                console.log(`added ${response.roleName} to the database`);
                init();
            })
        };

    addEmployee = () => {
        inquirer
            .prompt([
                {
                    type:'input',
                    name:'firstName',
                    message:"What is the employee's first name?"
                },
                {
                    type:'input',
                    name:'lastName',
                    message: "what is employee's last name?"
                },
                {
                    type:'input',
                    name:'employeeRole',
                    message: "what is the employee's role id?"
                },
                {
                    type:'input',
                    name:'manager',
                    message:"What is the employee's manager id?"
                },
            ]).then(response => {
                const query = 'INSERT INTO employee SET ?'
                db.query(
                    query, {
                        first_name: response.firstNaene,
                        last_name: response.lastName,
                        role_id: response.employeeRole,
                        manager_id: response.manager
                    }
                )
                console.log(`added ${response.firstName} ${response.lastName} to the database`);
                init()
            })

    }

    updateRole = () => {
        const empSql = 'SELECT * FROM employee';
        db.query(empSql, (err, data) => {
            if (err) throw err;

            // --- importing list of employees from database --- //
            const employees = data.map(({ id, first_name, last_name}) => (
                {name: first_name + " " + last_name, value: id}
                ));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'name',
                        message: "Which one of your employees would you like to update?",
                        choices: employees
                    }
                ]).then(employeeChoice => {
                    const employee =employeeChoice.name;
                    const params = [];
                    params.push(employee);

                    const roleSql = 'SELECT * FROM roles';

                    db.query(roleSql, (err, data) => {
                        if (err) throw err;

                        //importing employee roles
                        const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                        inquirer
                        .prompt([
                            {
                                type:'list',
                                name: 'role',
                                message: 'What is the employee role?',
                                choices: roles
                            }
                        ]).then(roleChoice => {
                            const role = roleChoice.role;
                            params.push(role);

                            let employee = params[0]
                            params[0] = role
                            params[1] = employee 

                            const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';

                            db.query(sql, params, (err, result) => {
                                if (err) throw err;
                                console.log("OK! Your employee has been updated!");

                                init();
                            });
                        });
                    });
                });
        });

    };

    

    done = () => {
        const exitSql = 'exit';
        db.query(exitSql, (err, res) => {
        if (err) throw err;
        console.log( "bye!")
    });
    };



    
    


