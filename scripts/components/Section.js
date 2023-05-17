export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this.renderer = renderer;
  }

  addCardByArray() {
    this._items.forEach((element) => {
      this.addItem(this.renderer(element));
    });
  }

  addItem(domElement) {
    this._container.prepend(domElement);
  }
}
