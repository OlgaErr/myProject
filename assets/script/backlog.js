const tasks = JSON.parse(localStorage.getItem('backlog'));
const div = document.getElementById('backlog');
for (let i=0; i < tasks.length; i++) {
    const section = createTaskSection(tasks[i]);
    div.appendChild(section);
}

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

const typeValue = selectTaskType(type);
section.appendChild(typeValue);

const priorityValue = selectTaskPriority(priority);
section.appendChild(priorityValue);

const myIdValue = document.createElement('a');
myIdValue.classList = 'myId';
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
estimateValue.insertAdjacentText('afterBegin', estimate);
div.appendChild(estimateValue);
section.appendChild(div);

const wrapper = document.createElement('div');
const labelValue = document.createElement('span');
wrapper.classList = 'label';
labelValue.insertAdjacentText('afterBegin', label);
wrapper.appendChild(labelValue);
section.appendChild(wrapper);

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