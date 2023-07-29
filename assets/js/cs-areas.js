import DataManager from './data-manager.js';

class CSAreas {

    async fetchAndDisplay () {
        
        this.dm = new DataManager();
        await this.dm.initializeCSAreas();

        this.displayCSAreas();
    }

    displayCSAreas() {
        const parent = document.querySelector('#cs-areas');
        this.dm.csAreas.forEach((function(area, idx) {

            // 1. display each CS Area:
            parent.insertAdjacentHTML(
                'beforeend', area.getListTemplate()
            )

            // 2. Add click event handler:
            const el = parent.lastElementChild;
            el.addEventListener('click', (function () {
                window.showLightbox(area.getTemplate())
            }).bind(this));
            el.addEventListener('keypress', (function () {
                window.showLightbox(area.getTemplate())
            }).bind(this));
            el.setAttribute('tabindex', idx);
        }).bind(this));
    }

}

const csAreas = new CSAreas();
csAreas.fetchAndDisplay();