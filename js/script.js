/* eslint linebreak-style: ['error', 'windows'] */
const englishButtons = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter', 'LShift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'RShift', 'LCtrl', 'Win', 'LAlt', 'Space', 'RAlt', '←', '↓', '→', 'RCtrl'];
const keyNames = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
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

function typeKey(eventKey, textarea) {
  const cursorPos = getCursorPos(textarea);
  console.log(cursorPos);
  const textareaValue = textarea.value;
  let output;
  if (cursorPos.start != undefined) {
    output = [textareaValue.slice(0, cursorPos.start), eventKey, textareaValue.slice(cursorPos.start)].join('');
    textarea.value = output;
    setCursorPos(textarea, cursorPos.start+1, cursorPos.end+1);
  }
  else {
    textarea.value += eventKey;
  }
}
function getCursorPos(input) {
  if ("selectionStart" in input && document.activeElement == input) {
    return {
      start: input.selectionStart,
      end: input.selectionEnd
    };
  }
  else if (input.createTextRange) {
  let sel = document.selection.createRange();
    if (sel.parentElement() === input) {
      let rng = input.createTextRange();
      rng.moveToBookmark(sel.getBookmark());
      for (var len = 0; rng.compareEndPoints("EndToStart", rng) > 0; rng.moveEnd("character", -1)) {
        len++;
      }
      rng.setEndPoint("StartToStart", input.createTextRange());
      for (let pos = { start: 0, end: len };  rng.compareEndPoints("EndToStart", rng) > 0; rng.moveEnd("character", -1)) {
      pos.start++;
      pos.end++;
      }
      return pos;
    }
  }
  return -1;
}
function setCursorPos(input, start, end) {
    if (arguments.length < 3) end = start;
    if ("selectionStart" in input) {
        setTimeout(function() {
            input.selectionStart = start;
            input.selectionEnd = end;
        }, 1);
    }
    else if (input.createTextRange) {
        var rng = input.createTextRange();
        rng.moveStart("character", start);
        rng.collapse();
        rng.moveEnd("character", end - start);
        rng.select();
    }
}
document.addEventListener('keydown', (event) => {
  const keyboardKey = document.querySelector(`.${event.code}`);
  if (keyboardKey) {  
      // console.log(event);
    keyboardKey.classList.add('hover');
    setTimeout(() => {
      keyboardKey.classList.remove('hover');
    }, 500);
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
    }
  }
});
