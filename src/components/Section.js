export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    
    renderItems(items) {
        items.forEach(item => {
            const card = this._renderer(item);
            this.addItem(card);
        });
    }
    
    addItem(card) {
        this._container.prepend(card);
    }
}
    