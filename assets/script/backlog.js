function addTask({
    title,
    type,
    priority,
    estimate,
    label,
    reporter,
    id
}) {
const li = document.createElement('li');

const a = document.createElement('span');
a.classList = 'title';
a.insertAdjacentText('afterBegin', title);
li.appendChild(a);

const b = document.createElement('span');
b.classList = 'type';
b.insertAdjacentText('afterBegin', type);
li.appendChild(b);

const c = document.createElement('span');
c.classList = 'priority';
c.insertAdjacentText('afterBegin', priority);
li.appendChild(c);

const d = document.createElement('span');
d.classList = 'estimate';
d.insertAdjacentText('afterBegin', estimate);
li.appendChild(d);

const e = document.createElement('span');
e.classList = 'label';
e.insertAdjacentText('afterBegin', label);
li.appendChild(e);

const f = document.createElement('span');
f.classList = 'reporter';
f.insertAdjacentText('afterBegin', reporter);
li.appendChild(f);

const j = document.createElement('span');
j.classList = 'id';
j.insertAdjacentText('afterBegin', id);
li.appendChild(j);

const date = document.createElement('span');
date.classList = 'date';
date.insertAdjacentText('afterBegin', new Date());
li.appendChild(date);

return li;

}



const tasks = JSON.parse(localStorage.getItem('tasks'));
const ul = document.getElementById('backlog');
for (let i=0; i <= tasks.length; i++) {
    const li = addTask(tasks[i]);
    ul.appendChild(li);
}
