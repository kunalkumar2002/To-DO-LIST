const tasks = [];
const taskList = document.getElementById('list');
const addinput = document.getElementById('add');
const taskcounter = document.getElementById('tasks-counter');
//const taskList = document.getElementById('list');

function addTaskToDom(task){
    const li = document.createElement('li');
    li.innerHTML= `
    <input type="checkbox" id="${task.id}" ${task.done?'checked':''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="icons8-trash-can-50.png" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

// Render on task  ---------------------------------------------------------------------------

function renderList(){
    taskList.innerHTML = '';

    for(let i = 0 ; i < tasks.length ; i++){
        addTaskToDom(tasks[i]);
    }
    taskcounter.innerHTML = tasks.length;
}

// Marking task is camleted ---------------------------------------------------------------


function markTaskcomplite(taskId){
    const task  = tasks.filter(function(task){
        return task.id === taskId;
    })
    if(task.length >0){
        const currtask = task[0];
        currtask.done = !currtask.done;
        renderList();
        showNotification('task toggledd successfully');
        return ;
    }
    showNotification('somthing went wrong');
}

// Delete Task------------------------------------------------------------------------------

function deleteTask(taskId){
    const newtask = tasks.filter(function(task){
        return task.id !== taskId;
    });
    tasks.length = 0;
    for(let i in newtask){
        tasks.push(newtask[i]);
    }
    renderList();
    showNotification('task deletad successfully');

}

// Add Task ----------------------------------------------------------------------------------

function addTask(task){
    if(task){
        tasks.push(task);
        renderList();
        showNotification('task added successfully');
        return ;
    }
    showNotification('task is not added try again');
}

// showing notification-----------------------------------------------------------------

function showNotification(text){
    alert(text);
}


// handling keyup event-------------------------------------------------------------------


function handleInputKey(e){
    if(e.key === 'Enter'){
        const text = e.target.value;
        console.log('kunal');
        if(!text){
           showNotification('text can not be empty');
           console.log('kumar');
            return ;
        }

        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }
        e.target.value = '';
        addTask(task);
    }

}

// Handling Clickevent-----------------------------------------------------------------------

function handleClick(e){
    const target = e.target;
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return ;
    }
    else if(target.className === 'custom-checkbox'){
        const taskId = target.id;
        markTaskcomplite(taskId);
        return ;

    }
}

function initilizeApp(){
    addinput.addEventListener('keyup' , handleInputKey);
    document.addEventListener('click',handleClick);
}
initilizeApp();  

    
