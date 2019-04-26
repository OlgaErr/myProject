const tasks = JSON.parse(localStorage.getItem('tasks'));

const toDo = document.getElementById('toDo');
const inProgress = document.getElementById('inProgress');
const done = document.getElementById('done');

for (let i=0; i < tasks.length; i++) {
    const section = createTaskSection(tasks[i]);
    switch(tasks[i].status) {
        case 'toDo':
            toDo.appendChild(section);
            break;
        
        case 'inProgress':
            inProgress.appendChild(section);
            break;
        case 'done':
            done.appendChild(section);
        break;

        default:
            toDo.appendChild(section);
    }
}

function createTaskSection({
    title,
    type,
    priority,
    estimate,
    label,
    date,
    myId,
    id,
    dayCounter
}) {

const section = selectBackgroundColor(type);
section.id = id;

const myIdValue = document.createElement('a');
myIdValue.dataset.id = id;
myIdValue.classList = 'myId';
myIdValue.onclick = openModalWindow;
myIdValue.insertAdjacentText('afterBegin', myId || '...');

const priorityValue = document.createElement('span');
priorityValue.classList = 'priorityValue';
priorityValue.insertAdjacentText('afterBegin', priority);

const dateValue = document.createElement('span');
dateValue.classList = 'date';
dateValue.insertAdjacentText('afterBegin', dayCounter);

const estimateValue = document.createElement('span');
estimateValue.classList = 'estimate';
estimateValue.insertAdjacentText('afterBegin', 'estimate: ' + estimate);

const taskName = document.createElement('span');
taskName.classList = 'taskName';
const string = title.length;

if (title.length < 40) {
    taskName.insertAdjacentText('afterBegin', title);
} else {
    taskName.insertAdjacentText('afterBegin', title.substring(0, 40) + '...');
}    

const labelValue = document.createElement('span');
labelValue.classList = 'label';
labelValue.insertAdjacentText('afterBegin', label);


const userImg = document.createElement("IMG");
userImg.src = "assets/img/user.ico";
userImg.classList = 'userImg';

section.appendChild(myIdValue);
section.appendChild(priorityValue);
section.appendChild(dateValue);
section.appendChild(estimateValue);
section.appendChild(taskName);
section.appendChild(labelValue);
section.appendChild(userImg);

return section;
}

function selectBackgroundColor (type) {
    const color = document.createElement('section');
    switch(type) {
        case 'feature':
             color.classList = 'colorFeatureBg';
            break;
        
        case 'bug':
            color.classList = 'colorBugBg';
            break;
        
            default:
            color.classList = 'colorFeatureBg';
    }
    return color;
}
 

function openModalWindow() {
    document.getElementById('myModal').style.display = 'block';
    const buttonToArchive = document.getElementById('toArchive');
    const id = this.dataset.id;
    const task = getTaskByIdFromLocalStorage(id, tasks);
    console.log(task.status);
    if (task.status == 'done') {
        buttonToArchive.style.display = 'inline-block';
    }
    writeDataToTheFormFromLocalStorage(task);
};

function getTaskByIdFromLocalStorage(id, tasks) {
    for ( var i=0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            return tasks[i];
        }
    }
}

function writeDataToTheFormFromLocalStorage(task) {
    document.getElementById('title').value = task.title;
    document.getElementById('type').value = task.type;
    document.getElementById('priority').value = task.priority;
    document.getElementById('estimate').value = task.estimate;
    document.getElementById('labels').value = task.label;
    document.getElementById('myId').value = task.myId;
    document.getElementById('description').value = task.description;
    document.getElementById('reporter').value = task.reporter;
    document.getElementById('date').value = task.date;
    document.getElementById('update').value = task.update;
    document.getElementById('id').value = task.id;
    document.getElementById('status').value = task.status;
}

function definitionIndexOfArray(id, tasks) {
    for ( var i=0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            return i;
        }
    }
}

function deleteTaskFromLocalStorage() {
    const id = document.getElementById('id').value;
    const taskSection = document.getElementById(id);
    taskSection.remove();
    
    const result = definitionIndexOfArray(id, tasks);
    tasks.splice(result, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    closeWindow ()
}

function save() {
    const today = new Date();  
    const id = document.getElementById('id').value;

    const section = document.getElementById(id);
    const dayCounter = section.getElementsByClassName('date')[0].innerText;
    let task = {
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        priority: document.getElementById('priority').value,
        estimate: document.getElementById('estimate').value,
        label: document.getElementById('labels').value,
        reporter: document.getElementById('reporter').value,
        myId: document.getElementById('myId').value,
        description: document.getElementById('description').value,
        id: document.getElementById('id').value,
        date: document.getElementById('date').value,
        update: today.toLocaleDateString(),
        dayCounter: dayCounter,
        status: document.getElementById('status').value
    }
    const result = definitionIndexOfArray(id, tasks);
    tasks.splice(result, 1, task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.location.reload();
    
    closeWindow();
  }

  function BackToBacklog() {
    const a = JSON.parse(localStorage.getItem('tasks'));
    const id = document.getElementById('id').value;
    const task = getTaskByIdFromLocalStorage(id, a);
    let tasks = JSON.parse(localStorage.getItem('backlog')) || [];
    task.status = "";
    tasks.push(task);
    localStorage.setItem('backlog', JSON.stringify(tasks));

    deleteTaskFromLocalStorage();
}

function archive() {
    const id = document.getElementById('id').value;
    const task = getTaskByIdFromLocalStorage(id, tasks);
    let archive = JSON.parse(localStorage.getItem('archive')) || [];
    archive.push(task);
    localStorage.setItem('archive', JSON.stringify(tasks));

    deleteTaskFromLocalStorage();
}