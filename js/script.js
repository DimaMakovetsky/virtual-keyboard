/* eslint linebreak-style: ['error', 'windows'] */
const englishButtons = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter', 'LShift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'RShift', 'LCtrl', 'Win', 'LAlt', 'Space', 'RAlt', '←', '↓', '→', 'RCtrl'];
function fillKeyboard(buttonsArray) {
  let index = 0;
  const allButtons = document.querySelectorAll('.button');
  allButtons.forEach((el) => {
    const buttonText = buttonsArray[index];
    // el.classList.add(keyNames[index]);
    const span = el.querySelector('span');
    span.innerText = buttonText;
    if (buttonText === 'Backspace' || buttonText === 'RShift' || buttonText === 'Enter' || buttonText === 'RShift' || buttonText === 'LShift' || buttonText === 'CapsLock') {
      el.classList.add('big-button', 'control-button');
    }
    if (buttonText === 'Tab' || buttonText === 'Del' || buttonText === 'RCtrl' || buttonText === 'LCtrl' || buttonText === 'CapsLock' || buttonText === 'Win' || buttonText === 'LAlt' || buttonText === 'RAlt') {
      el.classList.add('control-button');
    }
    if (buttonText === 'Space') {
      el.classList.add('space', 'control-button');
    }
    index += 1;
  });
}
function createEverything() {
  const mainSection = document.createElement('section');
  mainSection.classList.add('main-section');
  document.body.append(mainSection);
  const textArea = document.createElement('textarea');
  textArea.setAttribute('rows', '10');
  textArea.setAttribute('cols', '75');
  textArea.classList.add('textarea');
  mainSection.append(textArea);
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  mainSection.append(keyboard);
  let index = 0;
  for (let i = 0; i < 5; i += 1) {
    const keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard__row');
    keyboard.append(keyboardRow);
    let lastKey = false;
    while (!lastKey) {
      const keyboardButton = document.createElement('div');
      keyboardRow.append(keyboardButton);
      keyboardButton.classList.add('button');
      const buttonValue = document.createElement('span');
      keyboardButton.append(buttonValue);
      if (englishButtons[index] === 'Backspace' || englishButtons[index] === 'Del' || englishButtons[index] === 'Enter' || englishButtons[index] === 'RShift' || englishButtons[index] === 'RCtrl') {
        lastKey = true;
      }
      index += 1;
    }
  }
  fillKeyboard(englishButtons);
}

(createEverything())();
