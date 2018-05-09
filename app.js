


//grab Weather UI
let locationCityUi = document.querySelector('#w-locationCity');
let locationCountryUi = document.querySelector('#w-locationCountry');
let tempUi = document.querySelector('#w-temp');
let iconUi = document.querySelector('#w-icon');




document.addEventListener('DOMContentLoaded', getIp2);

function getIp2(){
const xhr = new XMLHttpRequest();
xhr.open('GET',"http://api.wunderground.com/api/62c8ef183d5af120/geolookup/q/autoip.json", true);
  xhr.onload = function(){
    if(this.status === 200){
      const response = JSON.parse(this.response);
      console.log(response);
locationByAutoIp += response.location.l;




    }
  }
  xhr.send();
}




let locationByAutoIp = 'zmw:00000.938.12566';
//Make Weather API connection
document.addEventListener('DOMContentLoaded', getWeather);



function getWeather(){
const xhr = new XMLHttpRequest();
xhr.open('GET',`http://api.wunderground.com/api/62c8ef183d5af120/conditions/q/${locationByAutoIp}.json`, true);
  xhr.onload = function(){
    if(this.status === 200){
      const response = JSON.parse(this.responseText);

locationCityUi.innerHTML = response.current_observation.display_location.city;
locationCountryUi.innerHTML = `, ${response.current_observation.display_location.country}`;
tempUi.textContent = response.current_observation.temp_c;
iconUi.setAttribute('src',response.current_observation.icon_url);
    }
  }
  xhr.send();
}


//UI TodoList
const form = document.querySelector('#task-form');
const taskInput= document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//Events TodoList
loadEventListener();

function loadEventListener(){
form.addEventListener('submit',addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTasks);
filter.addEventListener('keyup',filterTasks);
}

function addTask(e){
if(taskInput.value ===''){
  alert ('Add a Task');
} else {
const li = document.createElement('li');
li.className = 'collection-item';
li.appendChild(document.createTextNode(taskInput.value));
const link = document.createElement('a');
link.className = 'delete-item secondary-content';
link.innerHTML = '<i class= "fa fa-remove"></i>';
li.appendChild(link);
taskList.appendChild(li);
taskInput.value = '';
}
e.preventDefault();
}

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
  }

}
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}
function filterTasks(e){
const text = e.target.value.toLocaleLowerCase();

document.querySelectorAll('.collection-item').forEach(function(task){
  const item = task.firstChild.textContent;
  if (item.toLowerCase().indexOf(text) != -1){
    task.style.display = 'block';
  } else {
    task.style.display = 'none';
  }
})

}
