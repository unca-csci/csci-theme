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

            // 1. Display each CS Area:
            parent.insertAdjacentHTML(
                'beforeend', person.getCardTemplate()
            )

            // 2. Add event handler:
            const btns = parent.lastElementChild.querySelectorAll('button');

            btns.forEach(btn => {
                btn.addEventListener('click', (function () {
                    window.showLightbox(person.getTemplate())
                }).bind(this));
            });

        }).bind(this));
    }

}

const whoWeAre = new WhoWeAre();
whoWeAre.fetchAndDisplay();