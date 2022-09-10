const myList = document.getElementById('myList');
const form = document.querySelector('.main-form');
const input = document.getElementById('inputItems');
const inputContainer = input.parentElement;
const addBtn = document.getElementById('addBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const checklistBtn = document.getElementById('checklistBtn');
const loader = document.querySelector('.loader');
const nameList = [];


function addItem() {
  const validInput = input.value.trim().length !== 0;

  if (validInput) {
    const newItem = document.createElement('li');
    const text = document.createTextNode(input.value);
    const deleteBtn = document.createElement('button');
    deleteBtn.addEventListener('click', deleteItem);

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
  } else {
    input.focus(); // Keeping mobile keyboard on focus
  }
}


function random(min, max) {
  const initialCalc = Math.random() * (max - min + 1);
  const result = Math.floor(initialCalc) + min;
  return result;
}


function shuffleList() {
  const nameListCopy = [...nameList];
  const myItems = Array.from(document.querySelectorAll('ol li'));
  const initialList = myItems.map(item => `<li>${item.innerText}</li>`);

  // Randomizing list
  const randomList = nameList.map(() => {
    const randomNum = random(0, nameListCopy.length - 1);
    const randomItem = nameListCopy.splice(randomNum, 1);
    return `<li>${randomItem}</li>`;
  });

  const sameList = randomList.every((item, index) => {
    return item === initialList[index];
  });

  (!sameList)
    ? myList.innerHTML = randomList.join('')
    : shuffleList();

  // Appling styles
  myList.classList.add('random-mode');
  form.classList.add('random-mode');
  inputContainer.classList.add('is-hide');

  shuffleBtn.classList.add('rerun-mode');
  shuffleBtn.lastElementChild.innerText = 'Rerun';
  checklistBtn.classList.add('is-active');
  checklistBtn.addEventListener('click', checklistMode);

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