function A() {
  this.a = 123
}

A.prototype.AA = function () {}

function B() {
  this.b = 123
}

B.prototype = new A()
B.prototype.BB = function () {}

function C() {
  this.c = 123
}

C.prototype = new B()
C.prototype.CC = function () {}

let ccc = new C()
console.log(ccc)
console.log(Object.keys(ccc))