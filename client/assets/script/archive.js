const archive = JSON.parse(localStorage.getItem('archive'));
const div = document.getElementById('backlog');
for (let i = 0; i < archive.length; i++) {
  const section = createTaskSection(archive[i]);
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

  const leftBlock = document.createElement('div');
  const typeValue = selectTaskType(type);

  const priorityValue = selectTaskPriority(priority);
  leftBlock.appendChild(priorityValue);

  const myIdValue = document.createElement('a');
  myIdValue.dataset.id = id;
  myIdValue.classList = 'myId';
  myIdValue.onclick = openModalWindow;
  myIdValue.insertAdjacentText('afterBegin', myId || '...');
  leftBlock.appendChild(myIdValue);

  const taskName = document.createElement('span');
  taskName.classList = 'taskName';
  taskName.insertAdjacentText('afterBegin', title);
  leftBlock.appendChild(taskName);

  const rightBlock = document.createElement('div');
  rightBlock.classList = 'rightBlock';

  if (label) {
    const labelValue = document.createElement('div');
    labelValue.classList = 'label';
    labelValue.insertAdjacentText('afterBegin', label);
    rightBlock.appendChild(labelValue);
  }

  const dateValue = document.createElement('span');
  dateValue.classList = 'date';
  dateValue.insertAdjacentText('afterBegin', date);
  rightBlock.appendChild(dateValue);

  const estimateV = document.createElement('span');
  estimateV.classList = 'estimate';
  estimateV.insertAdjacentText('afterBegin', estimate);
  rightBlock.appendChild(estimateV);

  section.appendChild(leftBlock);
  section.appendChild(rightBlock);

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
  const task = getTaskByIdFromLocalStorage(id, archive);
  writeDataToTheFormFromLocalStorage(task);
}

function getTaskByIdFromLocalStorage(id, archive) {
  for (let i = 0; i < archive.length; i++) {
    if (archive[i].id == id) {
      return archive[i];
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

function deleteTaskFromLocalStorage() {
  const id = document.getElementById('id').value;
  const taskSection = document.getElementById(id);
  taskSection.remove();

  closeWindow();
}

function taskDelete() {
  const result = confirm("Do you want to delete the task?");
  if (result) {
    deleteTaskFromLocalStorage();
  }
}

function deleteTaskFromLocalStorage() {
  const id = document.getElementById('id').value;
  const taskSection = document.getElementById(id);
  taskSection.remove();

  const result = definitionIndexOfArray(id, archive);
  archive.splice(result, 1);
  localStorage.setItem('archive', JSON.stringify(archive));
  closeWindow();
}

function definitionIndexOfArray(id, archive) {
  for (let i = 0; i < archive.length; i++) {
    if (archive[i].id == id) {
      return i;
    }
  }
}

function BackToBacklog() {
  const a = JSON.parse(localStorage.getItem('archive'));
  const id = document.getElementById('id').value;
  const task = getTaskByIdFromLocalStorage(id, a);
  const tasks = JSON.parse(localStorage.getItem('backlog')) || [];
  task.status = '';
  tasks.push(task);
  localStorage.setItem('backlog', JSON.stringify(tasks));
  deleteTaskFromLocalStorage();
}
