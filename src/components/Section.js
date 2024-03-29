export default class Section {
  constructor(renderer, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(dataCard) {
    dataCard.forEach((element) => {
      this._renderer(element);
    });
  }
  addItem(elementDom) {
    this._container.prepend(elementDom);
  }
}
