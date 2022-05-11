// querySelector : html 에서 class나 id를 찾아 매핑해주는 역할
// createElement : createElement("div") 와 같은 방식으로 태그생성 가능
// appendChild : 지정한 태그의 자식 태그로 넣어줌
// removeChild : 지정한 태그의 자식 태그를 모두 삭제

const containerBox = document.querySelector("#containerBox"),
    contents = containerBox.querySelector("#contents"),
    list = contents.querySelector("#list"),
    inputList = document.querySelector(".inputlist"),
    listForm = inputList.querySelector("#listForm"),
    input = listForm.querySelector("input");


let todos = [];

function createList(text) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const delbtn = document.createElement("button");
  const todoListId = todos.length+1;

  div.innerText = text;
  delbtn.innerText = "삭제";
  
  list.appendChild(li);     // list(ul태그)에 li태그 추가
  li.appendChild(div);      // li태그에 div 자식추가
  li.appendChild(delbtn);   // li태그에 belbtn 자식추가
  delbtn.addEventListener("click", deleteList);
  
  li.id = todoListId;   // 삭제를 위해 리스트에 고유 id 생성
  const todoList={
    text : text,
    id : todoListId
  }

  todos.push(todoList);
  saveList();
}

function submitList(e) {  
  e.preventDefault();   // 새로고침을 안함
  const currentValue = input.value; // 입력창에 현재 입력된 값을 저장
  createList(currentValue); // 저장된 텍스트를 리스트의 함수 인자로 보냄
  input.value = ""; // 입력창 빈칸으로 초기화
}

function deleteList(event) {
  list.removeChild(event.target.parentNode);
  todos = todos.filter( (todos) => {
    return todos.id !== parseInt(event.target.parentNode.id);
  });
  saveList();
}

function saveList() { // 리스트 저장함수
  localStorage.setItem("todo", JSON.stringify(todos));
}

function loadList() { // 리스트 로드함수
  const loadedList = localStorage.getItem("todo");   // 로컬 스토리지에서 키가 "todos"인 값들을 객체로 가져옴
  if(loadedList !== null){
      const parsedData = JSON.parse(loadedList);
      parsedData.forEach(function(toDo){
        createList(toDo.text);
      });
  }
}

function init() {
  loadList();
  listForm.addEventListener("submit", submitList);
}
init();