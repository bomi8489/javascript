# 자바스크립트의 비동기 처리

## 스코프와 객체, ajax
> 스코프의 종류<br>
> 참조에 의한 객체 복사 (shallow, deep+shallow, deep copy)<br>
> ajax를 통한 db통신과 비동기에 대해

<br><hr>

## 자바스크립트의 동작 방식

- 자바스크립트는 자체만으로 Single Thread 언어
    > Thread : 프로세스안의 실행 흐름. 즉, 자바스크립트는 하나의 실행흐름

- 싱글 스레드로 어떻게 한꺼번에 여러 요청을 처리할까?
    > 비동기 작업을 통해 여러 요청들을 처리

- 자바스크립트 언어 자체는 싱글 스레드이지만, 런타임은 싱글 스레드가 아니다

- 자바스크립트 비동기 런타임 과정

    - call stack : 자바스크립트에서 수행해야 할 함수들을 순차적으로 스택에 담아 처리<br>

    - web api : 웹 브라우저에서 제공하는 api로 ajax나 timeout등의 비동기 작업을 실행<br>

    - task queue : callback queue라고도 하며 web api에서 넘겨받은 callback 함수를 전달<br>


    ```
    console.log("start");

    setTimeout(function timer() {
        console.log("execute 5seconds later");
    }, 5000);

    console.log("end");
    ```

<br><hr>

## callback과 Promise

- 숫자 n을 파라미터로 받아와서 두 번에 걸쳐 1초마다 1씩 더하여 출력하는 작업을 구현해보자

    ```
    function increaseNum(n){
        setTimeout( () => {
            const num = n + 1;
            console.log(num);
        }, 1000);
    }

    increaseNum(0);
    increaseNum(0);
    ```

    > 정상적으로 원하는 결과를 얻을 수 있을까?? <br>
    > increaseNum(0)을 두번 실행하면 두 번 다 파라미터로 0이 들어가기 때문

<br>

- 함수의 리턴값을 다음 함수의 인자로 넣기위해서는 비동기 처리에서 발생하는 문제를 해결해야함
    > 콜백 함수

    ```
    function increaseNum(n, callback){
        setTimeout( () => {
            const num = n + 1;
            console.log(num);
            if(callback){
                callback(num);
            }
        }, 1000);
    }

    increaseNum(0, n => {
        increaseNum(n, n => {
            console.log("end");
        })
    })
    ```

<br>

- 만약 두 번이 아니라 10번이라면?

    ```
    increaseNum(0, n => {
        increaseNum(0, n => {
            increaseNum(0, n => {
                increaseNum(0, n => {
                    increaseNum(0, n => {
                        increaseNum(0, n => {
                            increaseNum(0, n => {
                                increaseNum(0, n => {
                                    increaseNum(0, n => {
                                        increaseNum(0, n => {
                                            console.log("end");
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
    ```
    > 이런 상황을 콜백지옥에 빠졌다고 한다 

<br>

- Promise를 사용하면 코드가 복잡해지는 현상을 방지할 수 있다
    > Promise란? : 자바스크립트 비동기 처리에 사용되는 객체<br>

- Promise의 상태 3가지
    - Pending(대기) : 비동기 처리 로직이 완료되지 않은 상태

    - Fulfilled(이행) : 비동기 처리가 완료되어 Promise가 결과 값을 반환해준 상태

    - Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

    <br>

    ```
    const testPromise = new Promise((resolve, reject) => {
        //
    })
    ```

- 인자로 callback 함수 resolve와 reject를 사용가능
    > resolve 함수가 실행되면 Fulfilled 상태 <br>
    > reject 함수가 실행되면 Rejected 상태

- resolve를 호출할 때 특정 값을 파라미터로 넣어주면, 이 값을 작업이 끝나고 나서 사용 할 수 있다
- 작업이 끝나고 또 다른 작업을 해야 할 때는 `.then(...)`을 붙여서 사용하면 된다

    ```
    const testPromise = new Promise((resolve, reject) => {
        setTimeout( () => {
            resolve(1);
        }, 1000);
    });

    testPromise.then(n => {
        console.log(n);
    });
    ```

- 실패의 상황에서는 reject를 호출하고 `.catch()`를 통해 실패했을 때의 수행 작업을 지정해 줄 수 있다

    ```
    const testPromise = new Promise((resolve, reject) => {
        setTimeout( () => {
            reject(new Error());
        }, 1000);
    });

    testPromise
        .then(n => {
            console.log(n);
        })
        .catch(error => {
            console.log(error);
        });
    ```

- Promise의 속성 중 then 내부에 넣은 함수에서 또 Promise를 리턴하게 되면 연달아서 사용할 수 있다

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
                console.log(num);
                resolve(num);
            }, 1000);
        });
    }

    increaseNum(0)
        .then(n => {
            return increaseNum(n);
        })
        .then(n => {
            return increaseNum(n);
        })
        .then(n => {
            return increaseNum(n);
        })
        .then(n => {
            return increaseNum(n);
        })
        .catch(e => {
            console.log(e);
        })
    ```

    > 좀더 정리해보자

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
    ```

<br><hr>

> 자바스크립트는 싱글스레드로 하나의 실행흐름을 가진다. 단, 자바스크립트 런타임은 싱글스레드가 아니다 <br>
> 비동기 처리 문제를 해결하는 방법 callback 과 Promise