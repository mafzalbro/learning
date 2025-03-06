
export const functions = () => {

    function callMe() {
        console.log(callMe.name);
    }

    callMe()


    // factory function
    function createPerson(name, age) {
        return {
            name: name,
            age: age,
            getName: function () {
                return this.name
            }
        }
    }

    const person = createPerson("John", 30)

    console.log("----------Factory Function------------------");
    console.log(person);
    console.log("Factory Function", person.getName());


    // constructor function
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            this.getName = function () {
                return this.name;
            };
            this.setName = function (name) {
                return this.name = name;
            };
        }
    }

    const person1 = new Person("John 225", 30)

    console.log("---------Constructor Function--------------");

    console.log(Object.values(person1).toLocaleString()); // Object.entries(person1);
    console.log(person1.setName("Johny"));
    console.log(person1.getName());
}
