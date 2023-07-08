import { userId } from '../pages/index.js';

export default class Section {
    constructor({items, renderer, rendererForOwn}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._rendererForOwn = rendererForOwn;
        this._container = document.querySelector(containerSelector);
    }
    
    renderItems(items) {
        items.forEach(item => {
            let card;
            if (item.owner._id === userId) {  
                card = this._rendererForOwn(item)
            } else {
                card = this._renderer(item)
            }
            this._addItem(card);
        });
    }

    renderItem(item) {
        const card = this._rendererForOwn(item);
    }

    _addItem(card) {
        this._container.append(card)
        setTimeout(() => {
            card.classList.add('card_visible')
        }, 1)
    }
}
    