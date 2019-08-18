class A {
  constructor() {
    this.aaa = 'aaaa'
    this.abaa = [1234]
  }
  validateA() {
    console.log('validateA')
  }


  getAllMemebers() {
    // console.log(this instanceof C)
    // for(let key in this){
    //   console.log(key)
    // }

    // for(let key of this){
    //   console.log(key)
    // }
    return this.prototype
  }
}

class B extends A {
  constructor() {
    super()
    this.bbbb = 'bbbbb'
  }

  validateB() {
    console.log('validateB')
  }
}

class C extends B {
  constructor() {
    super()
    this.ccc = 'ccc'
  }
  validateC() {
    console.log('validateC')
  }
}

let members = new C().getAllMemebers()
// console.log(members)
// console.log(C.prototype)
// for (let key in C.prototype) {
//   console.log(key)
// }

function getAllMethodNames(obj) {
  let methods = new Set();
  while ((obj = Reflect.getPrototypeOf(obj))) {
    let keys = Reflect.ownKeys(obj);
    keys.forEach(k => {
      if (k.startsWith('validate')) {
        methods.add(k)
      }
    });
  }
  let keys = Array.from(methods.values());
  return keys
}

function getAllProperties(obj) {
  let vals = Object.keys(obj)
}

let cc = new C()
// console.log(Object.getOwnPropertyNames(cc))
// console.log(Object.keys(new C()))
// let cm = getAllMethodNames(cc)
// console.log(Object.keys(cc))

for (let t in new A()) {
  console.log(t)
}
console.log('------------------------')
console.log(Object.getOwnPropertyNames(new A()))
console.log(Object.getPrototypeOf(new A()))
console.log(Object.getOwnPropertySymbols(new A()))
console.log(Reflect.ownKeys(new A()))
console.log(Reflect.ownKeys(Object.getPrototypeOf(new A())))
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(new A())))

// cm.forEach(c => {
//   console.log(cc[c]())
// })
// // let keys = Reflect.ownKeys(cc);
// // keys.forEach(k => methods.add(k));
// // console.log(keys)
// // keys.forEach(k=> {
// //   console.log(k)
// // })