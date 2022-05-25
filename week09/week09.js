// async function func(){
//     return 1;
// }

// func().then(console.log);

// async function func(){
//     return Promise.resolve(1);
// }

// func().then(console.log);

// function func(){
//     setTimeout( () => {
//         console.log("2");
//     }, 1000);
// }

// function say123(){
//     console.log("1");
//     func();
//     console.log("3");
// }
// say123()

// function func(){
//     return new Promise((resolve, reject) => {
//         setTimeout( () => {
//             resolve("2");
//         }, 1000);
//     });
// }

// async function say123(){
//     console.log("1");
//     await func().then(console.log);
//     console.log("3");
// }
// say123()

// function func(){
//     return new Promise((resolve, reject) => {
//         setTimeout( () => {
//             resolve("2");
//             //reject(new Error());
//         }, 1000);
//     });
// }

// async function say123(){
//     try {
//         console.log("1");
//         await func().then(console.log);
//         console.log("3");
//     } catch (error) {
//         console.log(error);
//     }
// }
// say123()

function increaseNum(n) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            const num = n + 1;
            if(num === 5){
                const error = new Error();
                reject(error);
                return;
            }
            resolve(num);
        }, 1000);
    });
}

async function func() {
    try{
        let tmp = 0;
        while(tmp < 5){
            tmp = await increaseNum(tmp);
            console.log(tmp);
        }
    } catch (error) {
        console.log(error);
    }
}
func();