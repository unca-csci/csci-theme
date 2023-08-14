import DataManager from './data-manager.js';
import utils from './utilities.js';

class CSAreas {

    async fetchAndDisplay () {
        utils.showSpinner(document.querySelector('#cs-areas'));
        this.dm = new DataManager();
        await this.dm.initializeCSAreas();

        this.displayCSAreas();
    }

    displayCSAreas() {
        const parent = document.querySelector('#cs-areas');
        parent.innerHTML = '';
        this.dm.csAreas.forEach((function(area) {

            function showLightbox(e) {
                window.modalManager.showModal(area.getTemplateElement());
                if (e) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }

            // 1. display each CS Area:
            parent.insertAdjacentHTML(
                'beforeend', area.getListTemplate()
            )

            // 2. Add click event handler:
            const el = parent.lastElementChild;

            // multiple event handlers for accessibility:
            el.addEventListener('click', showLightbox.bind(this));
            el.querySelector('a').addEventListener('click', showLightbox.bind(this));

        }).bind(this));
    }
    

}

const csAreas = new CSAreas();
csAreas.fetchAndDisplay();