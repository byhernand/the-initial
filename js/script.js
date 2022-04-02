const orderedList = document.getElementById('myList');
const shuffleBtn = document.getElementById('shuffleBtn');
const input = document.getElementById('inputItems');
const addBtn = document.getElementById('addBtn');
const secondaryBtn = document.getElementById('secondaryBtn');

let nameList = [];

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

function shuffleList() {
  const randomList = [];
  const intialLength = nameList.length;
  const printedItems = document.querySelectorAll('ol li');
  const inputContainer = input.parentElement;

  if ( shuffleBtn.classList.contains('is-active') ) {
    // Randomize list
    for (let i = 0; i < intialLength; i++) {
      const randomIndex = random(0, nameList.length - 1);
      const newItem = nameList.splice(randomIndex, 1);
      randomList.push(newItem);
    }

    nameList = randomList.flatMap(i => i);

    // Print random items
    for (let i = 0; i < printedItems.length; i++) {
      printedItems[i].innerText = nameList[i];
    }

    orderedList.classList.add('is-random')
    shuffleBtn.lastElementChild.innerText = 'Rerun';
    inputContainer.classList.add('is-hide');
    secondaryBtn.classList.add('is-active');
    secondaryBtn.addEventListener('click', checklistMode);
  }
}

// Helpers
function random(min, max) {
  let result;
  result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

function keys(event) {
  if (event.key == 'Enter') {
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