const input= document.getElementById("taskInput");
const addBtn =document.getElementById("addBtn");
const list = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    list.innerHTML="";


    for(let i=0; i < tasks.length;i++)
    {
        let task = tasks[i];
        
        // create Card
        let card = document.createElement('div');
        card.className="card";

        // create text
        let text = document.createElement("div");
        text.className="card-text";
        text.innerText= task.text;

        if(task.completed)
        {
            text.classList.add("completed");
        }

        text.onclick = function()
        {
            toggleTask(task.id);
        };

        // Edit button 
        let actions = document.createElement("div");
        actions.className="card-actions";

        let editBtn = document.createElement("button");
        editBtn.innerText="✏️";
        editBtn.onclick = function( )
        {
            editTask(task.id);
        };

        // Delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.onclick = function () {
        deleteTask(task.id);

        };

        // Append buttons

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        card.append(text);
        card.append(actions);

        list.appendChild(card);
    }
}

    // Save to localStorage

    function saveTasks() 
    {
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    // Add Task

    addBtn.onclick=function()
    {
        let value=input.value.trim();

        if(value=="") return;

        let newTask={
            id : Date.now(),
            text : value,
            completed :false
        }

        tasks.push(newTask);
        

        input.value="";
        saveTasks();
        renderTasks();

    };

    // toggle complete

    function toggleTask(id)
    {
        for(let i=0;i<tasks.length;i++)
        {
            if(tasks[i].id === id){
                tasks[i].completed != tasks[i].completed;
            }
        }

        saveTasks();
        renderTasks();
    }

    // delete task

    function deleteTask(id)
    {
        let newTasks =[];

        for(let i=0; i< tasks.length;i++)
        {
            if(tasks[i].id !==id)
            {
                newTasks.push(tasks[i]);
            }
        }
        
        tasks = newTasks;

        saveTasks();
        renderTasks();
        
    }

    // Edit task

    function editTask(id)
    {
        let newText = prompt("Edit task:");
        if(!newText) return;

        for(let i=0;i < tasks.length;i++)
        {
            if(tasks[i].id===id)
            tasks[i].text= newText;
        }

        saveTasks();
        renderTasks();

    }


    renderTasks();
