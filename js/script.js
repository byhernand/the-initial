const orderedList = document.getElementById('myList');
const shuffleBtn = document.getElementById('shuffleBtn');
const input = document.getElementById('inputItems');
const addBtn = document.getElementById('addBtn');
const secondaryBtn = document.getElementById('secondaryBtn');
const nameList = [];


function addItem() {
  const newItem = document.createElement('li');
  const text = document.createTextNode(input.value);
  const deleteBtn = document.createElement('span');
  deleteBtn.addEventListener('click', deleteItem);

  if (input.value) {
    newItem.appendChild(text);
    newItem.appendChild(deleteBtn);
    orderedList.appendChild(newItem);

    nameList.push(input.value);

    input.focus();
    input.value = '';

    (nameList.length >= 3)
      ? shuffleBtn.classList.add('is-active')
      : shuffleBtn.classList.remove('is-active');
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


function shuffleList() {
  const shuffleBtnIsActive = shuffleBtn.classList.contains('is-active');
  if (!shuffleBtnIsActive) return null;

  const nameListCopy = nameList.map(item => item);
  const printedList = document.querySelectorAll('ol li');
  const printedItems = Array.from(printedList);
  const initialValues = printedItems.map(item => item.innerText);
  const inputContainer = input.parentElement;
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
  orderedList.classList.add('is-random')
  shuffleBtn.lastElementChild.innerText = 'Rerun';
  inputContainer.classList.add('is-hide');
  secondaryBtn.classList.add('is-active');
  secondaryBtn.addEventListener('click', checklistMode);

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

  (input.value)
    ? addBtn.classList.add('is-active')
    : addBtn.classList.remove('is-active')
}


function deleteItem(event) {
  const listItem = event.target.parentNode;
  const listItemIndex = nameList.indexOf(listItem.innerText);

  nameList.splice(listItemIndex, 1);
  listItem.remove();

  if (nameList.length < 3) {
    shuffleBtn.classList.remove('is-active');
  }
}


shuffleBtn.addEventListener('click', shuffleList);
input.addEventListener('keypress', keys);
input.addEventListener('keyup', keys);
addBtn.addEventListener('click', addItem);
addBtn.addEventListener('click', keys);