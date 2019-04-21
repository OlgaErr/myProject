const tasks = JSON.parse(localStorage.getItem('backlog'));
const div = document.getElementById('backlog');
for (let i=0; i < tasks.length; i++) {
    const section = createTaskSection(tasks[i]);
    div.appendChild(section);
}

const modal = document.getElementById('myModal');
const closeButton = document.getElementsByClassName("close")[0];

function openWindow() {
  modal.style.display = 'block';
};
function closeWindow () {
  modal.style.display = 'none';
};

closeButton.onclick = closeWindow;

function createTaskSection({
    title,
    type,
    priority,
    estimate,
    label,
    date,
    myId
}) {

const section = document.createElement('section');
const task = document.createElement('div');
const buttonBlock = document.createElement('div');

const typeValue = selectTaskType(type);
task.appendChild(typeValue);

const priorityValue = selectTaskPriority(priority);
task.appendChild(priorityValue);

const myIdValue = document.createElement('a');
myIdValue.classList = 'myId';
myIdValue.onclick = openWindow;
myIdValue.insertAdjacentText('afterBegin', myId);
task.appendChild(myIdValue);

const taskName = document.createElement('span');
taskName.classList = 'taskName';
taskName.insertAdjacentText('afterBegin', title);
task.appendChild(taskName);

const dateValue = document.createElement('span');
dateValue.classList = 'date';
dateValue.insertAdjacentText('afterBegin', date);
task.appendChild(dateValue);

const div = document.createElement('div');
const estimateValue = document.createElement('span');
div.classList = 'estimate';
estimateValue.insertAdjacentText('afterBegin', estimate);
div.appendChild(estimateValue);
task.appendChild(div);

const wrapper = document.createElement('div');
const labelValue = document.createElement('span');
wrapper.classList = 'label';
labelValue.insertAdjacentText('afterBegin', label);
wrapper.appendChild(labelValue);
task.appendChild(wrapper);


section.appendChild(task);
section.appendChild(buttonBlock);
return section;
}

function selectTaskType (type) {
    const icon = document.createElement('div');
    switch(type) {
        case 'feature':
            icon.classList = 'iconFeature';
            break;
        
        case 'bug':
            icon.classList = 'iconBug';
            break;
        default:
            icon.classList = 'iconFeature';
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