
function toggleMenu() {
    let menu = document.getElementsByClassName('menu')[0];
    let content = document.getElementsByClassName('content')[0];
    let btn = document.getElementsByClassName('menuBtn')[0];
    menu.classList.toggle('menuActive');
    content.classList.toggle('contentActive');
    btn.classList.toggle('menuBtnActive');
};

function closeWindow () {
    document.getElementById('myModal').style.display = 'none';
};