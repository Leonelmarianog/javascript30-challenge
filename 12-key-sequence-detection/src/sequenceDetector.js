import {
  displayNewKey,
  updateKeys,
  updateSecretCodeText,
  updateSequenceTextColor,
} from './ui/ui.js';

const isMatch = (sequence, secretCode) => {
  return sequence.join('').includes(secretCode.join(''));
};

const addNewKeyToSequence = (key, sequence) => {
  return sequence.concat(key);
};

const updateSequence = (sequence, secretCode) => {
  const copySequence = sequence.slice();
  copySequence.splice(-secretCode.length - 1, sequence.length - secretCode.length);
  return copySequence;
};

export const sequenceDetector = (sequenceToDetect) => {
  const secretCode = sequenceToDetect;
  let sequence = [];

  const handleKeyUp = (e) => {
    displayNewKey(e.key);

    sequence = addNewKeyToSequence(e.key, sequence);

    if (sequence.length > 6) {
      updateKeys();
    }

    sequence = updateSequence(sequence, secretCode);

    if (isMatch(sequence, secretCode)) {
      updateSequenceTextColor('#0f0');
      return;
    }

    updateSequenceTextColor('#f00');
  };

  updateSecretCodeText(secretCode.join(''));

  document.addEventListener('keyup', handleKeyUp);
};
