export default class TextWrapper {
  constructor() {
    this.titleElements = document.querySelectorAll('.js-textSplit');
    this.wrapText = this.wrapText.bind(this);
    this.titleElements.forEach((titleElement) => {
      this.wrapText(titleElement);
    });
  }

  wrapText(node) {
    console.log('wraptext SET');
    if (node.nodeType === Node.TEXT_NODE) {
      const content = node.textContent;
      let formattedText = '';

      for (let i = 0; i < content.length; i++) {
        const char = content[i];

        if (char === ' ' || char === '\n') {
          formattedText += char;
        } else {
          const isAlphanumeric = /^[A-Za-z0-9&;]+$/.test(char);
          formattedText += `<span class="char${isAlphanumeric ? ' en' : ''}"><span class="char-inner">${char}</span></span>`;
        }
      }

      const tempElement = document.createElement('div');
      tempElement.innerHTML = formattedText;

      while (tempElement.firstChild) {
        node.parentNode.insertBefore(tempElement.firstChild, node);
      }

      node.parentNode.removeChild(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const childNodes = node.childNodes;

      for (let i = childNodes.length - 1; i >= 0; i--) {
        this.wrapText(childNodes[i]);
      }
    }
  }
}

