
const tasks = JSON.parse(localStorage.getItem('backlog'));
const div = document.getElementById('backlog');
for (let i=0; i < tasks.length; i++) {
    const section = createTaskSection(tasks[i]);
    div.appendChild(section);
}

const modal = document.getElementById('myModal');
const closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = closeWindow;

function openModalWindow() {
  modal.style.display = 'block';
  const id = this.dataset.id;
  const task = getTaskByIdFromLocalStorage(id, tasks);
  writeDataToTheFormFromLocalStorage(task);
};

function closeWindow () {
  modal.style.display = 'none';
};

function createTaskSection({
    title,
    type,
    priority,
    estimate,
    label,
    date,
    myId,
    id
}) {

const section = document.createElement('section');
section.id = id;

const typeValue = selectTaskType(type);
section.appendChild(typeValue);

const priorityValue = selectTaskPriority(priority);
section.appendChild(priorityValue);

const myIdValue = document.createElement('a');
myIdValue.dataset.id = id;
myIdValue.classList = 'myId';
myIdValue.onclick = openModalWindow;
myIdValue.insertAdjacentText('afterBegin', myId);
section.appendChild(myIdValue);

const taskName = document.createElement('span');
taskName.classList = 'taskName';
taskName.insertAdjacentText('afterBegin', title);
section.appendChild(taskName);

const dateValue = document.createElement('span');
dateValue.classList = 'date';
dateValue.insertAdjacentText('afterBegin', date);
section.appendChild(dateValue);

const div = document.createElement('div');
const estimateValue = document.createElement('span');
div.classList = 'estimate';
estimateValue.classList = 'est';
estimateValue.insertAdjacentText('afterBegin', estimate);
div.appendChild(estimateValue);
section.appendChild(div);

const wrapper = document.createElement('div');
const labelValue = document.createElement('span');
wrapper.classList = 'label';
labelValue.classList = 'lb';
labelValue.insertAdjacentText('afterBegin', label);
wrapper.appendChild(labelValue);
section.appendChild(wrapper);

return section;
}

function selectTaskType (type) {
    const icon = document.createElement('div');
    switch(type) {
        case 'feature':
            icon.classList = 'iconFeature icon';
            break;
        
        case 'bug':
            icon.classList = 'iconBug icon';
            break;
        default:
            icon.classList = 'iconFeature icon';
    }
    return icon;
}

function selectTaskPriority(priority) {
    const letter = document.createElement('span');
    switch(priority) {
        case 'medium':
            letter.insertAdjacentText('afterBegin', "M");
            letter.classList = 'letterM';
            break;
        
        case 'high':
            letter.insertAdjacentText('afterBegin', "H");
            letter.classList = 'letterH';
            break;
        case 'low':
            letter.insertAdjacentText('afterBegin', "L");
            letter.classList = 'letterL';
            break;
        default:
            letter.insertAdjacentText('afterBegin', "M");
            letter.classList = 'letterM';
    }
    return letter;
}

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
    document.getElementById('labels').value = task.labels;
    document.getElementById('myId').value = task.myId;
    document.getElementById('description').value = task.description;
    document.getElementById('reporter').value = task.reporter;
    document.getElementById('date').value = task.date;
    document.getElementById('update').value = task.update;
    document.getElementById('id').value = task.id;
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
    localStorage.setItem('backlog', JSON.stringify(tasks));
    closeWindow ()
}

function save() {
    const today = new Date();  
    const id = document.getElementById('id').value;
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
    };

    console.log(task);

    
    const result = definitionIndexOfArray(id, tasks);
    console.log(result);
    tasks.splice(result, 1, task);
    console.log(tasks);   
    localStorage.setItem('backlog', JSON.stringify(tasks));
    rewrite();

    closeWindow();
  }

  function rewrite() {
    const id = document.getElementById('id').value;
    const taskSection = document.getElementById(id);
    const task = getTaskByIdFromLocalStorage(id, tasks);
    taskSection.getElementsByClassName('myId')[0].innerHTML = task.myId;
    taskSection.getElementsByClassName('taskName')[0].innerHTML = task.title;
    taskSection.getElementsByClassName('lb')[0].innerHTML = task.label;
    const a = task.type;
    function selectTaskType(a) {
        const icon = document.createElement('div');
        switch(type) {
            case 'feature':
                icon.classList = 'iconFeature icon';
                break;
            
            case 'bug':
                icon.classList = 'iconBug icon';
                break;
            default:
                icon.classList = 'iconFeature icon';
        }
        return icon.classList;
    }
    const b = taskSection.getElementsByClassName('icon')[0];
    b.classList = selectTaskType(a);

    document.location.reload();
}
  