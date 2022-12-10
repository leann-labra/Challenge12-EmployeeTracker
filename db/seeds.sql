-- DB SEEDS --
INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal"),

INSERT INTO role (department_id, title, salary)
VALUES  (2, "Salesperson", 80000),
        (3, "Lead Engineering", 150000),
        (4, "Software Engineer", 120000),
        (5, "Account Manager", 160000),
        (6, "Accountant", 125000),
        (7, "Legal Team Lead", 250000),
        (8, "Lawyer", 190000),

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES  (2, "Mike", "Chan", "John Doe"),
        (3,"Ashley", "Rodriguez", null),
        (4, "Kevin", "Tupik", "Ashley Rodriguez"),
        (5, "Kunal", "Singh", null),
        (6, "Malia", "Brown", "Kunal Singh"),
        (8, "Tom", "Allen", "Sarah Lourd"),

    

