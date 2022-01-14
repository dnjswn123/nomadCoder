const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
// = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list");
// 이전에 했듯 form 태그는 submit 이벤트를 가진다.

const TODOS_KEY = "todos";
// 같은 문자열 여러번 써야하면 오타가 발생할 수 있으므로 아예 변수로 만들어놓기

//newTodo 생길때마다 toDos라는 배열에 push하고싶은상황
let toDos = [];

//toDos 라는 배열의 내용을 localStorage에 넣기 위한 함수
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  // JSON.stringify 로 array처럼 생긴 string으로 변환해준다.
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  // 여기서 인자인 toDo 는 데이터베이스의 요소 중 하나
  // return문의 뜻: 클릭한 li.id와 다른 toDo는 남겨두고 싶다
  saveToDos();
}

// deleteToDo와 paintToDo에 같은 이름의 변수(li) 가 있지만
// 각자 안에 선언되었기 때문에 공유X

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  // 당연하지만 변수의 이름은 아무거나해도됨.
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  //   발생한 사건을 함수의 첫번째 인자로 줌.
  const newTodo = toDoInput.value;
  //   input의 value를 비우기전의 값
  toDoInput.value = "";
  //   newTodo라는 변수와 아래의 toDoInput.value는 무관함.
  //   newTodo는 input의 현재 value를 복사한 것이고
  //   그다음 input에 뭘하든 newTodo와는 무관한 것.
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  //   newTodo에 담은 값을 호출하는 함수
  saveToDos(newTodo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);

// greetings에서 만든 savedUsername과 비슷
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  // null을 쓴 이유 : localStorage에 아무값도 없을 조건
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;

  parsedToDos.forEach(paintToDo);
}
