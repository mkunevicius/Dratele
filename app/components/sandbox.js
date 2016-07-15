// function Person(name) {
//   this.name;
// }
//
// var person = new Person('Mindaugas');
//
// person.name;
//

function Person(name) {
  this.name = name;
}

Person.prototype.walk = function() {
  console.debug(this.name + ' is walking.')
}

var person = new Person('Donatas');

person.walk();




var recursive = function(n) {
    if(n <= 2) {
        return 1;
    } else {
        return this.recursive(n - 1) + this.recursive(n - 2);
    }
};
