const tasks = JSON.parse(localStorage.getItem('backlog'));
const ul = document.getElementById('backlog');
for (let i=0; i < tasks.length; i++) {
    const li = addTask(tasks[i]);
    ul.appendChild(li);
}

function addTask({
    title,
    type,
    priority,
    estimate,
    label,
    date,
    myId
}) {
const li = document.createElement('section');

const typeValue = selectType(type);
li.appendChild(typeValue);

const priorityValue = selectPriority(priority);
li.appendChild(priorityValue);

const myIdValue = document.createElement('a');
myIdValue.classList = 'myId';
myIdValue.insertAdjacentText('afterBegin', myId);
li.appendChild(myIdValue);

const taskName = document.createElement('span');
taskName.classList = 'taskName';
taskName.insertAdjacentText('afterBegin', title);
li.appendChild(taskName);

const dateValue = document.createElement('span');
dateValue.classList = 'date';
dateValue.insertAdjacentText('afterBegin', date);
li.appendChild(dateValue);

const div = document.createElement('div');
const estimateValue = document.createElement('span');
div.classList = 'estimate';
estimateValue.insertAdjacentText('afterBegin', estimate);
div.appendChild(estimateValue);
li.appendChild(div);

const wraper = document.createElement('div');
const labelValue = document.createElement('span');
wraper.classList = 'label';
labelValue.insertAdjacentText('afterBegin', label);
wraper.appendChild(labelValue);
li.appendChild(wraper);

return li;
}

function selectType (type) {
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

function selectPriority(priority) {
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