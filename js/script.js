const myList = document.getElementById('myList');
const input = document.getElementById('inputItems');
const addBtn = document.getElementById('addBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const checklistBtn = document.getElementById('checklistBtn');
const nameList = [];


function addItem() {
  if (input.value.trim().length === 0) return null;

  const newItem = document.createElement('li');
  const text = document.createTextNode(input.value);
  const deleteBtn = document.createElement('span');
  deleteBtn.addEventListener('click', deleteItem);

  if (input.value) {
    newItem.appendChild(text);
    newItem.appendChild(deleteBtn);
    myList.appendChild(newItem);

    nameList.push(input.value);

    input.focus();
    input.value = '';

    addBtn.classList.toggle('is-active');

    if (nameList.length >= 3) {
      addBtn.classList.add('is-hide');
      shuffleBtn.classList.add('is-active');
    }
  }
  else {
    input.focus();
  }
}


function random(min, max) {
  const initialCalc = Math.random() * (max - min + 1);
  const result = Math.floor(initialCalc) + min;
  return result;
}


function shuffleList(event) {
  const nameListCopy = nameList.map(item => item);
  const printedList = document.querySelectorAll('ol li');
  const printedItems = Array.from(printedList);
  const initialValues = printedItems.map(item => item.innerText);
  const inputContainer = input.parentElement;
  const form = document.querySelector('.main-form');
  const loader = document.querySelector('.loader');

  // Randomizing list
  printedItems.forEach(item => {
    const randomNum = random(0, nameListCopy.length - 1);
    const randomItem = nameListCopy.splice(randomNum, 1);
    item.innerText = randomItem;
  });

  const finalValues = printedItems.map(item => item.innerText);
  const isSameValues = initialValues.every(item => {
    const index = initialValues.indexOf(item);
    return initialValues[index] === finalValues[index];
  })

  if (isSameValues) shuffleList();

  // Appling styles
  myList.classList.add('random-mode');
  shuffleBtn.classList.add('rerun-mode');
  shuffleBtn.lastElementChild.innerText = 'Rerun';
  inputContainer.classList.add('is-hide');
  checklistBtn.classList.add('is-active');``
  checklistBtn.addEventListener('click', checklistMode);
  form.classList.add('random-mode')

  loader.classList.add('is-active');
  setTimeout( () => {
    loader.classList.remove('is-active');
  }, 400);
}


function keys(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addItem();
  }

  if (input.value && nameList.length < 3) {
    addBtn.classList.add('is-active')
  }

  if (!input.value && nameList.length < 3) {
    addBtn.classList.remove('is-active');
  }

  if (input.value && nameList.length >= 3) {
    shuffleBtn.classList.remove('is-active');
    addBtn.classList.remove('is-hide');
    addBtn.classList.add('is-active');
  }

  if (!input.value && nameList.length >= 3) {
    shuffleBtn.classList.add('is-active');
    addBtn.classList.add('is-hide');
  }
}


function deleteItem(event) {
  const listItem = event.target.parentNode;
  const listItemIndex = nameList.indexOf(listItem.innerText);

  nameList.splice(listItemIndex, 1);
  listItem.remove();

  if (nameList.length < 3) {
    shuffleBtn.classList.remove('is-active');
    addBtn.classList.remove('is-hide');
  }
}


addBtn.addEventListener('click', addItem);
shuffleBtn.addEventListener('click', shuffleList);
input.addEventListener('keypress', keys);
input.addEventListener('keyup', keys);