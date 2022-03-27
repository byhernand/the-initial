const header = document.querySelector('header');
const btn = document.getElementById('checkbox');

function openClose() {
  (btn.checked)
    ? header.classList.add('is-active')
    : header.classList.remove('is-active')
}

btn.addEventListener('click', openClose);