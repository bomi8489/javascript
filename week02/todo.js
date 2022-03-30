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
}

function init() {
  listForm.addEventListener("submit", submitList);
}
init();