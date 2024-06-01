#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; ////initialize an empty array for courses
        this.balance = 100;
    }
    ///Method to enroll a students
    enroll_courses(course) {
        this.courses.push(course);
    }
    /////Method to view balance
    view_balance() {
        console.log(`\nBalance for ${this.name} : $${this.balance}`);
    }
    /////Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`\n$${amount} Fees paid successfully for ${this.name}`);
        console.log(`${this.name} remaining balance: $${this.balance}\n`);
    }
    //////Method to show status
    show_status() {
        console.log(`\nID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Course: ${this.courses}`);
        console.log(`Balance: $${this.balance}\n`);
    }
}
////Defining a student manager class to manage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new student
    add_student(Name) {
        let student = new Student(Name);
        this.students.push(student);
        console.log(`\nStudent ${Name} added successfully. Student ID:${student.id} `);
    }
    ///Method to enroll a student
    enroll_student(studentID, course) {
        let found_std = this.find_student(studentID);
        if (found_std) {
            found_std.enroll_courses(course);
            console.log(chalk.green(`\n${found_std.name} enrolled in ${course} successfully`));
        }
        else {
            console.log(chalk.red("\nStudent not found!Please enter correct student id"));
        }
    }
    ////Method to view student balance
    view_student_balance(student_id) {
        let found_std = this.find_student(student_id);
        if (found_std) {
            found_std.view_balance();
        }
        else {
            console.log(chalk.red("\nStudent not found!Please enter correct student id"));
        }
    }
    //////Method to pay student fees
    pay_student_fees(studentid, amount) {
        let found_std = this.find_student(studentid);
        if (found_std) {
            found_std.pay_fees(amount);
        }
        else {
            console.log(chalk.red("\nStudent not found!Please enter correct student id"));
        }
    }
    /////Method to display student status
    show_status(student_id) {
        let found_std = this.find_student(student_id);
        if (found_std) {
            found_std.show_status();
        }
    }
    //Method to find student
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
/////Main function to run the program
async function main() {
    console.log(chalk.blue("\n\t*****Welcome to Student Management System*****\t\n"));
    let studentManager = new Student_manager();
    ///While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: (chalk.yellowBright("Select an option:")),
                choices: ["Add student", "Enroll student", "View student balance", "Pay fees", "Show status", "Exit"]
            }
        ]);
        ////using switch case statement
        switch (choice.choice) {
            case "Add student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: (chalk.yellowBright("Enter student name:"))
                    }
                ]);
                studentManager.add_student(nameInput.name);
                break;
            case "Enroll student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentid",
                        type: "number",
                        message: (chalk.yellowBright("Enter a student ID:"))
                    },
                    {
                        name: "course",
                        type: "input",
                        message: (chalk.yellowBright("Enter a course name:"))
                    }
                ]);
                studentManager.enroll_student(courseInput.studentid, courseInput.course);
                break;
            case "View student balance":
                let viewBalance = await inquirer.prompt([
                    {
                        name: "studentID",
                        type: "number",
                        message: (chalk.yellowBright("Enter student ID:"))
                    }
                ]);
                studentManager.view_student_balance(viewBalance.studentID);
                break;
            case "Pay fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.yellowBright("Enter a student ID:"))
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: (chalk.yellowBright("Enter amount to pay"))
                    }
                ]);
                studentManager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "studentid",
                        type: "number",
                        message: (chalk.yellowBright("Enter a student ID:"))
                    }
                ]);
                studentManager.show_status(status_input.studentid);
                break;
            case "Exit":
                console.log(chalk.green("Exiting..."));
                process.exit();
        }
    }
}
///////calling main function
main();
