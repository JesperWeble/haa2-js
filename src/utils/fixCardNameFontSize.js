const fixCardNameFontSize = (container) => {
  container.classList.add('customElement')
  const nameContainer = container.querySelector('.name');
  if (!nameContainer) return;

  const nameClone = nameContainer.cloneNode(true);
  nameClone.style.opacity = 0;
  nameClone.style.whiteSpace = 'nowrap';
  nameClone.style.width = 'fit-content';
  nameClone.style.minWidth = '90%';
  nameContainer.parentElement.append(nameClone);
  let fontSize =
    parseFloat(window.getComputedStyle(nameContainer).getPropertyValue('font-size'));
  while ((nameContainer.clientWidth < nameClone.clientWidth || nameContainer.clientHeight > nameClone.clientHeight) && fontSize >= 1) {
    fontSize -= 1;
    nameClone.style.fontSize = fontSize + 'px';
    nameContainer.style.fontSize = fontSize + 'px';
  }
  nameClone.remove();
}

export default fixCardNameFontSize;