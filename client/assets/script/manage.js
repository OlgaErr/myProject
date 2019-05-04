function createTask() {
  const today = new Date();
  const task = {
    title: document.getElementById('title').value,
    type: document.getElementById('type').value,
    priority: document.getElementById('priority').value,
    estimate: document.getElementById('estimate').value,
    label: document.getElementById('labels').value,
    reporter: document.getElementById('reporter').value,
    myId: document.getElementById('myId').value,
    description: document.getElementById('description').value,
    id: `${Date.now()}`,
    date: today.toLocaleDateString(),
    update: '',
    status: '',
  };
  const backlog = JSON.parse(localStorage.getItem('backlog')) || [];
  backlog.push(task);
  localStorage.setItem('backlog', JSON.stringify(backlog));

  clearForm();
  showMessage();
  setTimeout(hideMessage, 5000);
}

function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('labels').value = '';
  document.getElementById('reporter').value = '';
  document.getElementById('myId').value = '';
  document.getElementById('description').value = '';
}

function showMessage() {
  document.getElementById('message').style.display = 'block';
}

function hideMessage() {
  document.getElementById('message').style.display = 'none';
}
