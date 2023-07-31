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

            function showLightbox(e) {
                // for accessibility:
                if (e && e.currentTarget.tagName === 'SECTION') {
                    e.currentTarget.querySelector('a').click();
                } else {
                    window.showLightbox(area.getTemplate());
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