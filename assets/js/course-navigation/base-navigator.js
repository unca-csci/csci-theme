import DataManager from '../data-manager.js';

export default class BaseNavigator {
    constructor() {
        this.display = 'card-view';
        this.dm = window.dataManager = new DataManager();
    }

    toggleDisplay (e) {
        e.preventDefault();
        document.querySelectorAll('.buttons a').forEach(elem => {
            elem.classList.toggle('selected');
        });
        this.display = e.currentTarget.id;
        this.render();
    }

    appendToolbar(parent) {
        parent.insertAdjacentHTML('beforeend', `
            <div class="toolbar">
                <div class="buttons">
                    <a href="#" id="card-view" class="selected">
                        <i class="fa-solid fa-table-cells-large"></i>
                    </a>
                    <a href="#" id="table-view">
                        <i class="fa-solid fa-list"></i>
                    </a>
                </div>
            </div>`);
        document.querySelector('#card-view').addEventListener('click', this.toggleDisplay.bind(this));
        document.querySelector('#table-view').addEventListener('click', this.toggleDisplay.bind(this));   
    }
}