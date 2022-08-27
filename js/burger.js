const header = document.querySelector('header');
const btn = document.getElementById('burger-btn');

function openClose() {
  (btn.checked)
    ? header.classList.add('full-screen')
    : header.classList.remove('full-screen');
}

btn.addEventListener('click', openClose);