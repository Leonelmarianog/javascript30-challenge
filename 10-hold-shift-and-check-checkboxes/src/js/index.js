const init = () => {
  let $lastCheckbox = null;

  /**
   * @param {MouseEvent} e
   */
  const handleClick = (e) => {
    const $currentCheckbox = e.target.closest('input');

    if (!$currentCheckbox) {
      return;
    }

    if ($lastCheckbox && e.shiftKey === true) {
      const $checkboxes = Array.from(document.querySelectorAll('input'));
      const lastCheckboxIndex = $checkboxes.indexOf($lastCheckbox);
      const currentCheckboxIndex = $checkboxes.indexOf($currentCheckbox);
      const minIndex = Math.min(lastCheckboxIndex, currentCheckboxIndex);
      const maxIndex = Math.max(lastCheckboxIndex, currentCheckboxIndex);

      $checkboxes
        .slice(minIndex, maxIndex + 1)
        .forEach(($checkbox) => ($checkbox.checked = e.target.checked));
    }

    $lastCheckbox = $currentCheckbox;
  };

  document.querySelector('form').addEventListener('click', handleClick);
};

init();
