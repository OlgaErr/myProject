/* eslint-disable no-undef */
const tasks = JSON.parse(localStorage.getItem('tasks'));

const toDo = document.getElementById('toDo');
const inProgress = document.getElementById('inProgress');
const done = document.getElementById('done');

for (let i = 0; i < tasks.length; i++) {
  const section = createTaskSection(tasks[i]);
  switch (tasks[i].status) {
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


function selectBackgroundColor(type) {
  const color = document.createElement('section');
  switch (type) {
    case 'feature':
      color.classList = 'task colorFeatureBg draggable';
      break;

    case 'bug':
      color.classList = 'task colorBugBg draggable';
      break;

    default:
      color.classList = 'task colorFeatureBg draggable';
  }
  return color;
}


function openModalWindow() {
  document.getElementById('myModal').style.display = 'block';
  const buttonToArchive = document.getElementById('toArchive');
  const { id } = this.dataset;
  const task = getTaskByIdFromLocalStorage(id, tasks);
  if (task.status == 'done') {
    buttonToArchive.style.display = 'inline-block';
  }
  writeDataToTheFormFromLocalStorage(task);
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
  const today = new Date();
  const then = new Date(Number(id));
  const result = Math.floor((today.getTime() - then.getTime()) / (1000*60*60*24)) + ' d.';
  dateValue.insertAdjacentText('afterBegin', result);

  const estimateValue = document.createElement('span');
  estimateValue.classList = 'estimate';
  estimateValue.insertAdjacentText('afterBegin', `estimate: ${estimate}`);

  const taskName = document.createElement('span');
  taskName.classList = 'taskName';
  const string = title.length;

  if (title.length < 40) {
    taskName.insertAdjacentText('afterBegin', title);
  } else {
    taskName.insertAdjacentText('afterBegin', `${title.substring(0, 40)}...`);
  }

  if (label) {
    const labelValue = document.createElement('span');
    labelValue.classList = 'label';
    labelValue.insertAdjacentText('afterBegin', label);
    section.appendChild(labelValue);
  }


  const userImg = document.createElement('IMG');
  userImg.src = 'assets/img/user.ico';
  userImg.classList = 'userImg';

  section.appendChild(myIdValue);
  section.appendChild(priorityValue);
  section.appendChild(dateValue);
  section.appendChild(estimateValue);
  section.appendChild(taskName);
  section.appendChild(userImg);
  return section;
}
function getTaskByIdFromLocalStorage(id, tasks) {
  for (let i = 0; i < tasks.length; i++) {
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
  for (let i = 0; i < tasks.length; i++) {
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
  closeWindow();
}

function save() {
  const today = new Date();
  const id = document.getElementById('id').value;

  const section = document.getElementById(id);
  const dayCounter = section.getElementsByClassName('date')[0].innerText;
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
    dayCounter,
    status: document.getElementById('status').value,
  };
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
  const tasks = JSON.parse(localStorage.getItem('backlog')) || [];
  task.status = '';
  tasks.push(task);
  localStorage.setItem('backlog', JSON.stringify(tasks));
  deleteTaskFromLocalStorage();
}

function archive() {
  const id = document.getElementById('id').value;
  const task = getTaskByIdFromLocalStorage(id, tasks);
  const archiveData = JSON.parse(localStorage.getItem('archive')) || [];
  archiveData.push(task);
  localStorage.setItem('archive', JSON.stringify(tasks));
  deleteTaskFromLocalStorage();
}

// move tascks between column
let dragObj = {};
let self = this;
document.onmousedown = function onmousedown(e) {
  if (e.which !== 1) return;
  const elem = e.target.closest('.draggable');
  if (!elem) return;

  const { width } = getComputedStyle(elem);
  elem.style.width = width;

  dragObj.elem = elem;
  dragObj.downX = e.pageX;
  dragObj.downY = e.pageY;
};

function createAvatar() {
  const avatar = dragObj.elem;
  avatar.style.pointerEvents = 'none';
  const old = {
    parent: avatar.parentNode,
    nextSibling: avatar.nextSibling,
    position: avatar.position || '',
    left: avatar.left || '',
    top: avatar.top || '',
    zIndex: avatar.zIndex || ''
  };

  avatar.rollback = function rollback() {
    old.parent.insertBefore(avatar, old.nextSibling);
    avatar.style.position = old.position;
    avatar.style.left = old.left;
    avatar.style.top = old.top;
    avatar.style.zIndex = old.zIndex;
    dragObj = {};
  };

  return avatar;
}

function startDrag() {
  const { avatar } = dragObj;

  document.body.appendChild(avatar);
  avatar.style.zIndex = 9999;
  avatar.style.position = 'absolute';
}

function getCoords(elem) { //разница box.top и dragObj.avatar.top!!!!!!!!!!!!!!!!
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

document.onmousemove = function onmousemove(e) {

  if (!dragObj.elem) return;

  if (!dragObj.avatar) {
    const moveX = e.pageX - dragObj.downX;
    const moveY = e.pageY - dragObj.downY;
    if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
      return;
    }
    
    dragObj.avatar = createAvatar();
    if (!dragObj.avatar) {
      dragObj = {};
      return;
    }

    const coords = getCoords(dragObj.avatar);
    dragObj.shiftX = dragObj.downX - coords.left;
    dragObj.shiftY = dragObj.downY - coords.top;

    startDrag(e);
  }

  dragObj.avatar.style.left = `${e.pageX - dragObj.shiftX}px`;
  dragObj.avatar.style.top = `${e.pageY - dragObj.shiftY}px`;

  return false;
};

function findDroppable(event) {

  const elem = document.elementFromPoint(event.clientX, event.clientY);

  if (elem == null) {
    return null;
  }
  return elem.closest('.droppable');
}
function updateStatus(dragObj, dropElem) {
  const idTask = dragObj.elem.id;
  const task = getTaskByIdFromLocalStorage(idTask, tasks);
  task.status = dropElem.id;
  task.update = new Date().toLocaleDateString();
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function finishDrag(e) {
  const dropElem = findDroppable(e);
  if (!dropElem) {
    dragObj.avatar.rollback();
  } else {
    dragObj.elem.removeAttribute('style');
    dropElem.appendChild(dragObj.elem);
    updateStatus(dragObj, dropElem);
  }
}

document.onmouseup = function onmouseup(e) {
  if (dragObj.avatar) {
    finishDrag(e);
  }

  dragObj = {};
}

