const allTasks = JSON.parse(localStorage.getItem('backlog'));
const div = document.getElementById('backlog');
for (let i = 0; i < allTasks.length; i++) {
  const section = createTaskSection(allTasks[i]);
  div.appendChild(section);
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
}) {

  const section = document.createElement('section');
  section.id = id;

  const typeValue = selectTaskType(type);

  const priorityValue = selectTaskPriority(priority);

  const myIdValue = document.createElement('a');
  myIdValue.dataset.id = id;
  myIdValue.classList = 'myId';
  myIdValue.onclick = openModalWindow;
  myIdValue.insertAdjacentText('afterBegin', myId || '...');

  const taskName = document.createElement('span');
  taskName.classList = 'taskName';
  taskName.insertAdjacentText('afterBegin', title);

  const dateValue = document.createElement('span');
  dateValue.classList = 'date';
  dateValue.insertAdjacentText('afterBegin', date);

  const estimateV = document.createElement('span');
  estimateV.classList = 'estimate';
  estimateV.insertAdjacentText('afterBegin', estimate);

  section.appendChild(typeValue);
  section.appendChild(priorityValue);
  section.appendChild(myIdValue);
  section.appendChild(taskName);
  section.appendChild(dateValue);
  section.appendChild(estimateV);

  
  if (label) {
    const labelValue = document.createElement('span');
    labelValue.classList = 'label';
    labelValue.insertAdjacentText('afterBegin', label);
    section.appendChild(labelValue);
  }
  

  return section;

}

function selectTaskType(type) {
  const icon = document.createElement('div');
  switch (type) {
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
  switch (priority) {
    case 'medium':
      letter.insertAdjacentText('afterBegin', 'M');
      letter.classList = 'letterM';
      break;

    case 'high':
      letter.insertAdjacentText('afterBegin', 'H');
      letter.classList = 'letterH';
      break;
    case 'low':
      letter.insertAdjacentText('afterBegin', 'L');
      letter.classList = 'letterL';
      break;
    default:
      letter.insertAdjacentText('afterBegin', 'M');
      letter.classList = 'letterM';
  }
  return letter;
}

function openModalWindow() {
  document.getElementById('myModal').style.display = 'block';
  const {id} = this.dataset;
  const task = getTaskByIdFromLocalStorage(id, allTasks);
  writeDataToTheFormFromLocalStorage(task);
}

function getTaskByIdFromLocalStorage(id, allTasks) {
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id == id) {
      return allTasks[i];
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
}

function definitionIndexOfArray(id, allTasks) {
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id == id) {
      return i;
    }
  }
}

function deleteTaskFromLocalStorage() {
  const id = document.getElementById('id').value;
  const taskSection = document.getElementById(id);
  taskSection.remove();


  const result = definitionIndexOfArray(id, allTasks);
  allTasks.splice(result, 1);
  localStorage.setItem('backlog', JSON.stringify(allTasks));
  closeWindow();
}

function save() {
  const today = new Date();
  const id = document.getElementById('id').value;
  const task = {
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

  const result = definitionIndexOfArray(id, allTasks);
  allTasks.splice(result, 1, task);
  localStorage.setItem('backlog', JSON.stringify(allTasks));
  document.location.reload();
  closeWindow();
}

function moveToWork() {
  const id = document.getElementById('id').value;
  const task = getTaskByIdFromLocalStorage(id, allTasks);
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  task.status = 'toDo';
  task.update = new Date().toLocaleDateString();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  deleteTaskFromLocalStorage();
}
