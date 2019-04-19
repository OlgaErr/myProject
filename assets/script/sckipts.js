function showMenu() {
    let menu = document.getElementsByClassName('menu')[0];
    let content = document.getElementsByClassName('content')[0];
    let btn = document.getElementsByClassName('menuBtn')[0];
    menu.classList.toggle('menu_active');
    content.classList.toggle('content_active');
    btn.classList.toggle('menuBtn_active');
}