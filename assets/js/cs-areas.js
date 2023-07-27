import DataManager from './data-manager.js';

class CSAreas {

    async fetchAndDisplay () {
        
        this.dm = new DataManager();
        await this.dm.initializeCSAreas();

        this.displayCSAreas();
    }

    displayCSAreas() {
        const parent = document.querySelector('#cs-areas');
        this.dm.csAreas.forEach((function(area) {

            // 1. display each CS Area:
            parent.insertAdjacentHTML(
                'beforeend', area.getListTemplate()
            )

            // 2. Add click event handler:
            parent.lastElementChild.addEventListener('click', (function () {
                window.showLightbox(area.getTemplate())
            }).bind(this));
        }).bind(this));
    }

}

const csAreas = new CSAreas();
csAreas.fetchAndDisplay();