// function increaseNum(n, callback){
//     setTimeout( () => {
//         const num = n + 1;
//         console.log(num);
//         if(callback){
//             callback(num);
//         }
//     }, 1000);
// }

// increaseNum(0, n => {
//     increaseNum(n, n => {
//         increaseNum(n, n => {
//             console.log("end");
//         })
//     })
// })

// const testPromise = new Promise((resolve, reject) => {
//     setTimeout( () => {
//         resolve(1);
//     }, 1000);
// });

// testPromise.then(n => {
//     console.log(n);
// });

function increaseNum(n) {
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            const num = n + 1;
            if(num === 5){
                const error = new Error();
                reject(error);
                return;
            }
            console.log(num);
            resolve(num);
        }, 1000);
    });
}

increaseNum(0)
    .then(increaseNum)
    .then(increaseNum)
    .then(increaseNum)
    .then(increaseNum)
    .catch(e => {
        console.log(e);
    })