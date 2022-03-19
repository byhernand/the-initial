const addBtn = document.getElementById('addBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
let mainList = [];

function addItem() {
  const input = document.getElementById('inputItems');
  const orderedList = document.getElementById('myList');
  const newItem = document.createElement('li');
  const text = document.createTextNode(input.value);

  newItem.appendChild(text);
  orderedList.appendChild(newItem);

  mainList.push(input.value);
  input.value = '';
}

function shuffleList () {
  const randomList = [];
  const intialLength = mainList.length;
  const printedItems = document.querySelectorAll('ol li');

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

// Helper
function random(min, max) {
  let result;
  result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

addBtn.addEventListener('click', addItem);
shuffleBtn.addEventListener('click', shuffleList);