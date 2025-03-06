export const classes = () => {
    class Person {
        constructor(name, age) {
            this.name = name
            this.age = age
        }
        getName() {
            return this.name
        }
        setName(name) {
            this.name = name
        }
    }

    class Employee extends Person {
        constructor(name, age, salary) {
            super(name, age)
            this.salary = salary
        }
    }

    class Manager extends Employee {
        constructor(name, age, salary, department) {
            super(name, age, salary)
            this.department = department
        }
    }

    class Developer extends Employee {
        constructor(name, age, salary, language) {
            super(name, age, salary)
            this.language = language
        }
    }

    const manager = new Manager('John', 25, 50000, 'IT')
    const developer = new Developer('John', 25, 50000, 'JavaScript')

    console.log(manager, developer)

}
