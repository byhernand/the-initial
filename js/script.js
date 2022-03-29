const shuffleBtn = document.getElementById('shuffleBtn');
const input = document.getElementById('inputItems');
const addBtn = document.getElementById('addBtn');

let mainList = [];

function addItem() {
  const orderedList = document.getElementById('myList');
  const newItem = document.createElement('li');
  const text = document.createTextNode(input.value);
  const deleteBtn = document.createElement('span');

  deleteBtn.addEventListener('click', deleteItem);

  if (input.value) {
    newItem.appendChild(text);
    newItem.appendChild(deleteBtn);
    orderedList.appendChild(newItem);

    mainList.push(input.value);

    input.focus();
    input.value = '';

    (mainList.length >= 3)
      ? shuffleBtn.classList.add('is-active')
      : shuffleBtn.classList.remove('is-active');
  }
  else {
    input.focus();
  }
}

function shuffleList () {
  const randomList = [];
  const intialLength = mainList.length;
  const printedItems = document.querySelectorAll('ol li');

  if ( shuffleBtn.classList.contains('is-active') ) {
    // Randomize list
    for (let i = 0; i < intialLength; i++) {
      const randomIndex = random(0, mainList.length - 1);
      const newItem = mainList.splice(randomIndex, 1);
      randomList.push(newItem);
    }

    mainList = randomList.flat().map(i => i);

    // Print random items
    for (let i = 0; i < printedItems.length; i++) {
      printedItems[i].innerText = mainList[i];
    }
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
  const item = event.target.parentNode;
  const itemIndex = mainList.indexOf(item.innerText);

  mainList.splice(itemIndex, 1);
  item.remove();

  if (mainList.length < 3) {
    shuffleBtn.classList.remove('is-active');
  }
}

shuffleBtn.addEventListener('click', shuffleList);
input.addEventListener('keypress', keys);
input.addEventListener('keyup', keys);
addBtn.addEventListener('click', addItem);
addBtn.addEventListener('click', keys);