
function showMenu() {
    let menu = document.getElementsByClassName('menu')[0];
    let content = document.getElementsByClassName('content')[0];
    let btn = document.getElementsByClassName('menuBtn')[0];
    menu.classList.toggle('menu_active');
    content.classList.toggle('content_active');
    btn.classList.toggle('menuBtn_active');
}
function save() {
    const today = new Date(); 
    let task = {
        title: document.getElementById('title').value,
        type: document.getElementById('type').value,
        priority: document.getElementById('priority').value,
        estimate: document.getElementById('estimate').value,
        label: document.getElementById('labels').value,
        reporter: document.getElementById('reporter').value,
        myId: document.getElementById('myId').value,
        description: document.getElementById('description').value,
        id: Date.now(),
        date: today.toLocaleDateString()
    };
    let backlog = JSON.parse(localStorage.getItem('backlog')) || [];
    backlog.push(task);
    localStorage.setItem('backlog', JSON.stringify(backlog));
}