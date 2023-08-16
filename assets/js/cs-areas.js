import DataManager from './data-manager.js';
import utils from './utilities.js';

class CSAreas {

    async fetchAndDisplay () {
        utils.showSpinner(document.querySelector('#cs-areas'));
        this.dm = window.dataManager = new DataManager();
        await this.dm.initializeCSAreas();

        this.displayCSAreas();
    }

    displayCSAreas() {
        const parent = document.querySelector('#cs-areas');
        parent.innerHTML = '';
        this.dm.csAreas.forEach((function(area) {

            // 1. display each CS Area:
            parent.insertAdjacentHTML('beforeend', area.getCardTemplate())

            // 2. Add click event handler:
            const el = parent.lastElementChild;

            // multiple event handlers for accessibility:
            el.addEventListener('click', area.showModal.bind(area));
            el.querySelector('a').addEventListener('click', area.showModal.bind(area));

        }).bind(this));
    }
}

const csAreas = new CSAreas();
csAreas.fetchAndDisplay();