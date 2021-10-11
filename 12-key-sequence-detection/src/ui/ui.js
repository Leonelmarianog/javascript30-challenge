const $secretCode = document.querySelector('#secretcode');
const $sequence = document.querySelector('#sequence');

export const updateSecretCodeText = (text) => {
  $secretCode.textContent = text;
};

export const updateSequenceTextColor = (color) => {
  $sequence.style.color = color;
};

export const displayNewKey = (key) => {
  const $key = document.createElement('span');
  $key.textContent = key;
  $key.className = 'key';
  $sequence.append($key);
};

export const updateKeys = () => {
  $sequence.children[0].remove();
};
