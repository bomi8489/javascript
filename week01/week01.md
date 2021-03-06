# JavaScript란
- 자바스크립트는 '웹페이지에 생동감을 불어넣기 위해' 만들어진 프로그래밍 언어
- HTML/CSS와 완전히 통합할 수 있음
- 간단한 일은 간단하게 처리할 수 있게 해줌
- 모든 주요 브라우저에서 지원하고, 기본 언어로 사용됨

## 변수와 상수
> 변수(variable)는 데이터를 저장할 때 쓰이는 '이름이 붙은 저장소'

- JS에서 `var` or `let` 키워드를 사용해 생성할 수 있다.
- 변수명에는 오직 문자와 숫자, 기호 $와 _만 들어갈 수 있다.
- 첫 글자는 숫자가 될 수 없다.

```
var hello;
hello = 'hi';

console.log(hello);
```

> 상수(constant)는 데이터를 저장할 때 변하지 않는 값을 뜻함

- `let`이나 `var`와는 다르게 `const`를 사용하고 지정한 값에 변경이 불가능

```
const my_name = "KWON";
console.log(my_name);
```

## 자료형
> 자바스크립트에는 여덟 가지 기본 자료형이 있다. 객체와 심볼형을 제외한 6가지 타입에 대해 알아보자.

- 숫자형 : 정수, 부동 소수점 숫자 등의 숫자를 나타낼 때 사용한다.
- bigint : 길이 제약 없이 정수를 나타낼 수 있다.
- boolean : true, false를 나타낼 때 사용한다.
- null : null 값만을 위한 독립 자료형이다. null은 알 수 없는 값을 나타낸다.
- undefined : undefined 값만을 위한 독립 자료형이다. undefined는 할당되지 않은 값을 나타낸다.

```
let numberType = 1;
let bigIntType = 12222222222222222222222222222222222222222n;
let stringType = "Hello";
let boolType = true;
let nullType = null;
let undefinedType;

console.log(typeof bigIntType)
```

## 비교연산자
- JS에서 사용되는 기본적인 비교 연산은 아래와 같다
    - 100은 10보다 크다 `100 > 10`
    - 100은 101보다 크거나 같다 `100 >= 101` , `100 >== 101`
    - 100은 100이랑 같다 `100 == 100`, `100 === 100`
- 또한 console.log(a>b)를 출력해보면 true, false와 같은 boolean형으로 나오게 된다.
- 문자열을 비교할 경우 사전순으로 비교한다. (정확히는 유니코드 순)
- number와 string을 비교할 경우 string을 number로 바꿀 수 있다면 바꿔서 연산한다.
- '==='연산자는 '=='와 다르게 데이터 타입까지 일치해야한다

```
console.log(2 > 3);         // false
console.log('Z' > 'C');     // true
console.log('5' > 2);       // true
console.log('33' == 33);    // true
console.log('33' === 33);   // false
```

이런 비교는 어떨까?

```
console.log(0 == []);
console.log(0 == "0");
console.log("0" == []);

console.log(null == undefined);
console.log(null === undefined);
```

## 함수
- 코딩을 하다보면 비슷한 동작을 하는 코드가 반복 되는 경우가 있다.
- 함수를 사용하면 자주 반복되는 동작을 함수로 만들어 필요할 때마다 호출해서 사용가능하다.

## 함수 선언
- 함수 선언 방식을 이용하면 함수를 만들 수 있다(함수 선언 방식은 함수 선언문이라고 부르기도 한다)
- 함수는 기본적인 `function`이라는 것을 통해 선언하고 `함수이름` 그리고 `()` 안의 `매개 변수`를 삽입해 구현한다.

```
function 함수이름(매개 변수) {
    // 코드
}

function hello(str) {
    console.log(`hello ${str}`);
}
hello("world");

function hi() {
    console.log('hi world');
}
hi();
```

- 함수 내부에서 선언한 변수는 지역 변수라고 불리며 함수 안에서만 사용이 가능하다.
- 함수 외부에서 선언한 변수는 접근이 가능하다.

```
let world = "";
function hi() {
    let hello = "hello";   // 지역 변수
    world = " world";
    console.log(hello + world);
}
console.log(hello);
```

- 또한 함수를 사용해 호출한 곳에 값을 전달해 줄 수 있다.
- 함수에서 반환을 하지 않았다면 `undefined`가 값으로 들어가게 된다.

```
function hi(){}
let test = hi();
console.log(test);
```

## 함수 표현식
- 윗 글을 통해 함수 선언을 해보았다
- 자바스크립트에서 함수는 특별한 종류의 값으로 취급한다.
- 함수 표현식을 사용해서 함수를 표현해보자.

```
let hi = function() {
    console.log("hello");
}
hi();
```

- 함수를 생성하고 변수에 값을 할당하는 것처럼 함수가 변수에 할당되었다.
- 함수 선언문을 가지고 똑같이 진행해보자
```
function hi() {
    console.log("hello");
}

let hi2 = hi;

hi2();
hi();
```

## 함수 선언문 vs 함수 표현식
- 함수 선언문 : 함수는 주요 코드 흐름 중간에 독자적인 구문 형태로 존재
- 함수 표현식 : 함수는 표현식이 내부에 생성된다.

```
function sum1(a, b){
    return a + b;
}

let sum2 = function(a, b){
    return a + b;
}
```

- 가장 큰 차이는 자바스크립트 엔진이 언제 함수를 생성하는지의 차이
- 함수 표현식은 실제 실행 흐름이 해당 함수에 도달했을 때 함수를 생성, 따라서 실행 흐름이 함수에 도달했을 때부터 해당 함수를 사용할 수 있다.
- 하지만 함수 선언문은 함수 선언이 정의되기 전에도 호출할 수 있다. (전역으로 사용 가능)
- 그 외의 차이는 `scope`의 차이

## Scope란
- 스코프는 참조 대상 식별자를 찾아내기 위한 규칙이다. (쉽게 말해 변수가 어디를 참조해서 값을 가져오는지)

### 스코프의 종류
> 전역 스코프 : 코드 어디에서든지 참조 가능<br>
> 지역 스코프 : 함수 단위로 자신과 하위 함수에서만 참조할 수 있다    
- 쉽게 전역 변수와 지역 변수의 개념으로 받아 들이면 편함
- 자바스크립트는 타 언어의 `블록 레벨 스코프`가 아닌 `함수 레벨 스코프`를 참조한다 (let, const 는 `블록 레벨 스코프`)

```
var num = 1;
function number(){
    var num = 2;
    console.log(num);
}
number();
console.log(num);
```

- 변수 num 이 중복 선언
- num을 참조할 때, 함수 number() 내부에서 중복이 된 두 개의 변수 중 어느걸 참조했는지 생각하는게 핵심

- 다음 코드의 결과값을 예상해보자
```
var num = 1;

function one() {
    var num = 10;
    two();
}

function two() {
    console.log(num);
}

one();
two();
```

- js에서는 호출된 기준이 아닌 선언이 된 기준으로 판단하기 때문에 two()가 선언되었을때의 num의 값이 1이다.


## 화살표 함수
- 함수 표현식 보다 단순하고 간결한 문법인 화살표 함수에 대해 알아보자

```
// 함수 표현식
let func = function() {
    return "test";
}

// 화살표 함수
let func = () => "test"
```