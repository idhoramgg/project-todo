
//select elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const timeELement = document.getElementById('time');
const list = document.getElementById('list');
const input = document.getElementById('input');

// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id;

//get item from localstorage
let data = localStorage.getItem('TODO');

//check if data isnt empty
if(data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

//load items to UI
function loadList(array){
  array.forEach(function(item){
    addTodo(item.name, item.id, item.done, item.trash);
  });
}
//del the localstorage
clear.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
});

// show todays date
const options = {weekday :"long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

//add todo functiion

function addTodo(toDo, id, done, trash) {
  if(trash){return;}

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH: '';

  const text = `<li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}"> ${toDo}</p>
        <i class="fa fa-trash alt delete" job="delete" id="${id}"></i>
                </li>`;
        
  const position = 'beforeend';

  list.insertAdjacentHTML(position, text);
}

//add item to the lsit user the enter key
document.addEventListener('keyup', function(event){
  if(event.keyCode == 13){
    const toDo = input.value;
    
    if(toDo){
      addTodo(toDo, id, false, false);

      LIST.push({
        name : toDo,
        id : id,
        done : false,
        trash : false
      });

        //add item to localstorage (array updates)
      localStorage.setItem('TODO', JSON.stringify(LIST));

      id++;
      }
      input.value = "";
    }
});

//complete todo
function completeTodo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remoce todo
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}
// target the items created dynamically
list.addEventListener('click', function(event){
  const element = event.target; //return the clicked element isndie list
  const elementJob = element.attributes.job.value; //complete or delete

  if(elementJob == 'complete'){
    completeTodo(element);
  } else if(elementJob == 'delete'){
    removeToDo(element);
  }

  localStorage.setItem('TODO', JSON.stringify(LIST));
});
