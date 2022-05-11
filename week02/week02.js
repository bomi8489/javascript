// let user = {
//     name : "kim2",
//     age : 300
// }
// user.name = "lee";
// user.weight = 50;
// console.log(user.name);
// console.log(user.age);

// let english = {
//     a: "hi a",
//     b: "hi b",
//     c: "hi c"
// }
// console.log("a" in english)
// console.log(english.a);

// let user = {
//     name : "kim",
//     age : 20,
//     gender : "male"
// }

// let user = {
//     name : "kim",
//     body : {
//         height : 180,
//         weight : 70
//     }
// }
// console.log(user.body.height);

// for(let info in user) {
//     console.log(info);
//     console.log(user[info]);
// }

// let user1 = {
//     name : "kim"
// }
// let user2 = user1;
// user2.name = "kwon";
// console.log(user2.name);
// console.log(user1.name);

// let user1 = {
//     name : "kim",
//     age : 26,
//     family : {
//         father : "kim",
//         mother : "park"
//     }
// }
// let user2 = {};

// for (let key in user1){
//     user2[key] = user1[key];
// }
// user2.name = "kwon";
// user2.family.father = "park";
// console.log(user1.name);
// console.log(user2.name);
// console.log(user1.family.father);
// console.log(user2.family.father);

// let user1 = {
//     name : "kim",
//     age : 26,
// }
// let user2 = {...user1};
// user2.name = "kwon";
// console.log(user1.name);
// console.log(user2.name);

// let user = {
//     name : "kim",
//     body : {
//         height : 180,
//         weight : 70
//     }
// }

// let user2 = {...user};
// user2.name = "kwon";
// user2.body.height = 170;
// user2.body.weight = 64;
// console.log(user.name);
// console.log(user.body.height);
// console.log(user.body.weight);

// let person = {
//     name : "kim",
//     age : 30
// };
// person.sayHi = () => {console.log("hello")}
// person.sayHi();

// let dog = {
//     name : "lala",
//     age : 2,
//     sound() {
//         console.log("wang!");
//     }
// }
// dog.sound();
