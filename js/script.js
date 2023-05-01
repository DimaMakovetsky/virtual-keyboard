/* eslint linebreak-style: ['error', 'windows'] */
/* eslint no-param-reassign: "off" */

const englishButtons = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter', 'LShift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'RShift', 'LCtrl', 'Win', 'LAlt', 'Space', 'RAlt', '←', '↓', '→', 'RCtrl'];
const englishButtonsShift = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 'LShift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'RShift', 'LCtrl', 'Win', 'LAlt', 'Space', 'RAlt', '←', '↓', '→', 'RCtrl'];
const englishButtonsCaps = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 'LShift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'RShift', 'LCtrl', 'Win', 'LAlt', 'Space', 'RAlt', '←', '↓', '→', 'RCtrl'];
const keyNames = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
let isCapslock = false;
function fillKeyboard(buttonsArray) {
  let index = 0;
  const allButtons = document.querySelectorAll('.button');
  allButtons.forEach((el) => {
    const buttonText = buttonsArray[index];
    el.classList.add(keyNames[index]);
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

createEverything();

function getCursorPos(input) {
  if ('selectionStart' in input && document.activeElement === input) {
    return {
      start: input.selectionStart,
      end: input.selectionEnd,
    };
  }
  return -1;
}
function setCursorPos(input, start, end) {
  if (arguments.length < 3) end = start;
  if ('selectionStart' in input) {
    setTimeout(() => {
      input.selectionStart = start;
      input.selectionEnd = end;
    }, 1);
  } else if (input.createTextRange) {
    const rng = input.createTextRange();
    rng.moveStart('character', start);
    rng.collapse();
    rng.moveEnd('character', end - start);
    rng.select();
  }
}
function typeKey(eventKey, textarea) {
  const cursorPos = getCursorPos(textarea);
  const textareaValue = textarea.value;
  let output;
  if (cursorPos.start !== undefined) {
    output = [textareaValue.slice(0, cursorPos.start), eventKey, textareaValue.slice(cursorPos.start)].join('');
    textarea.value = output;
    setCursorPos(textarea, cursorPos.start + 1, cursorPos.end + 1);
  } else {
    textarea.value += eventKey;
  }
}
function deleteKey(textarea, isDelete) {
  const cursorPos = getCursorPos(textarea);
  const textareaValue = textarea.value;
  let output;
  if (cursorPos.start !== undefined) {
    if (isDelete) {
      if (cursorPos.start !== 0) {
        output = [textareaValue.slice(0, cursorPos.start), textareaValue.slice(cursorPos.start + 1)].join('');
        textarea.value = output;
        setCursorPos(textarea, cursorPos.start, cursorPos.end);
      }
    } else {
      output = [textareaValue.slice(0, cursorPos.start - 1), textareaValue.slice(cursorPos.start)].join('');
      textarea.value = output;
      setCursorPos(textarea, cursorPos.start - 1, cursorPos.end - 1);
    }
  } else if (!isDelete) {
    textarea.value = textarea.value.slice(0, -1);
  }
}
document.addEventListener('keydown', (event) => {
  const keyboardKey = document.querySelector(`.${event.code}`);
  if (keyboardKey) {
    keyboardKey.classList.add('hover');
    const textArea = document.querySelector('.textarea');
    if (document.activeElement === textArea) {
      event.preventDefault();
    }
    if (!keyboardKey.classList.contains('control-button')) {
      switch (event.key) {
        case 'ArrowLeft':
          typeKey('←', textArea);
          break;
        case 'ArrowDown':
          typeKey('↓', textArea);
          break;
        case 'ArrowRight':
          typeKey('→', textArea);
          break;
        case 'ArrowUp':
          typeKey('↑', textArea);
          break;
        default:
          typeKey(event.key, textArea);
          break;
      }
    } else {
      switch (event.code) {
        case 'Space':
          typeKey(' ', textArea);
          break;
        case 'Enter':
          typeKey('\n', textArea);
          break;
        case 'Tab':
          typeKey('\t', textArea);
          break;
        case 'Backspace':
          deleteKey(textArea, false);
          break;
        case 'Delete':
          deleteKey(textArea, true);
          break;
        case 'ShiftRight':
        case 'ShiftLeft':
          fillKeyboard(englishButtonsShift);
          break;
        default:
          break;
      }
    }
  }
});
document.addEventListener('keyup', (event) => {
  const keyboardKey = document.querySelector(`.${event.code}`);
  if (keyboardKey) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      if (isCapslock) {
        fillKeyboard(englishButtonsCaps);
      } else {
        fillKeyboard(englishButtons);
      }
    } else if (event.code === 'CapsLock') {
      isCapslock = !isCapslock;
      if (isCapslock) {
        fillKeyboard(englishButtonsCaps);
      } else {
        fillKeyboard(englishButtons);
      }
    }
    keyboardKey.classList.remove('hover');
  }
});
