function checklistMode() {
  const checkBtn = document.querySelector('.check-item');
  const checkBtnInput = checkBtn.lastElementChild;

  checkBtn.classList.add('is-active');
  shuffleBtn.classList.add('is-hide');
  checklistBtn.classList.add('reset-mode');
  checklistBtn.lastElementChild.innerText = 'Reset List';
  checklistBtn.addEventListener('click', () => location.reload());

  checkBtnInput.addEventListener('click', () => {
    const printedItems = document.querySelectorAll('ol li');

    if (printedItems.length >= 2) {
      printedItems[0].remove();
      nameList.unshift();
    } else {
      location.reload();
    }
  });
}