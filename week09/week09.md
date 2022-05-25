# 자바스크립트의 비동기 처리

## 키워드 복습
> 자바스크립트는 싱글스레드로 하나의 실행흐름을 가진다. 단, 자바스크립트 런타임은 싱글스레드가 아니다 <br>
> 비동기 처리 문제를 해결하는 방법 callback 과 Promise

<br><hr>

## async 와 await
> promise를 좀 더 편하게 사용할 수 있는 문법

<br>

## async
> async의 위치는 function 앞에 위치

```
async function func(){
    return 1;
}
```

- async가 붙은 function은 항상 promise를 반환
    > promise : 자바스크립트 비동기 처리에 사용되는 객체
- promise가 아닌 값을 반환하더라도 이행 상태의 promise (resolved promise)로 값을 감싸 반환

<br>

```
async function func(){
    return 1;
}

func().then(console.log);
```

<br>

- 명시적으로 promise를 반환하는 것 역시 가능하며, 결과는 동일
```
async function func(){
    return Promise.resolve(1);
}

func().then(console.log);
```

<br>

## await

- await 키워드는 async 함수 안에서만 작동
- 자바스크립트는 await 키워드를 만나면 promise가 처리될 때까지 기다리고, 처리된 후 결과를 반환

```
function func(){
    setTimeout( () => {
        console.log("2");
    }, 1000);
}

function say123(){
    console.log("1");
    func();
    console.log("3");
}
say123()
```

<br>

```
function func(){
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve("2");
        }, 1000);
    });
}

async function say123(){
    console.log("1");
    await func().then(console.log);
    console.log("3");
}
say123()
```

<br>

## async & await 예외 처리

- promise에서 예외처리를 위해 .catch()를 사용한 것처럼 async & await의 예외 처리도 try catch 문법을 이용

```
function func(){
    return new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve("2");
            // reject(new Error());
        }, 1000);
    });
}

async function say123(){
    try {
        console.log("1");
        await func().then(console.log);
        console.log("3");
    } catch (error) {
        console.log(error);
    }
}
say123()
```

<br>

## promise VS async & await

### 굳이 async & await을 쓰는 이유는 뭘까?<br>
> callback 방식에서 callback 지옥에 빠지는 것을 해결한 방식이 promise<br>
> promise의 처리는 .then()문법을 사용<br>
> 연속해서 처리를 해야한다면 promise 역시 then 지옥에 빠짐<br>

<br>

- 간결하고 가독성이 좋다
    > 코드 흐름을 이해하기 쉽다

```
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
```

<br>

- async & await은 에러 핸들링에 유리


```
function func() {
    return dataFunc()
        .then(data => return data)
        .then(data2 => return data2)
        .then(data3 => return data3)
        .catch( (err) => {  // 어디서 일어난 에러일까?
            ...
        })
}
```
> .then 지옥에 빠진 경우 에러를 찾기가 쉽지 않음

<br>

```
acync function func() {
        try {
            const data1 = await dataFunc(); // 문제 발생시 data1이 유효하지 않음
            const data2 = await dataFunc(data1);
        } catch( (err) => {
            ...
        })
}
```

> 반면 async & await의 try catch 문은 에러를 찾기가 쉽다