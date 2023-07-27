import DataManager from './data-manager.js';

export default class WhoWeAre {

    async fetchAndDisplay () {
        
        this.dm = new DataManager();
        await this.dm.initializePeople();

        this.displayPeople();
    }

    displayPeople() {
        const parent = document.querySelector('.people-list');
        this.dm.people.forEach((function(person) {

            // 1. display each CS Area:
            parent.insertAdjacentHTML(
                'beforeend', person.getCardTemplate()
            )

            // // 2. Add click event handler:
            // parent.lastElementChild.addEventListener('click', (function () {
            //     window.showLightbox(area.getTemplate())
            // }).bind(this));
        }).bind(this));
    }

}

const whoWeAre = new WhoWeAre();
whoWeAre.fetchAndDisplay();