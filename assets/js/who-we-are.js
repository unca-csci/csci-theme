import DataManager from './data-manager.js';
import utils from './utilities.js';


export default class WhoWeAre {

    async fetchAndDisplay () {
        this.parent = document.querySelector('.people-list');
        utils.showSpinner(this.parent);
        this.dm = new DataManager();
        await this.dm.initializePeople();

        this.displayPeople();
    }

    displayPeople() {
        const parent = document.querySelector('.people-list');
        parent.innerHTML = '';
        this.dm.people.forEach((function(person) {

            // 1. Display each CS Area:
            parent.insertAdjacentHTML(
                'beforeend', person.getCardTemplate()
            )

            // 2. Add event handler:
            const btns = parent.lastElementChild.querySelectorAll('button');

            btns.forEach(btn => {
                btn.addEventListener('click', (function () {
                    window.lightbox.show(person.getTemplate())
                }).bind(this));
            });

        }).bind(this));
    }

}

const whoWeAre = new WhoWeAre();
whoWeAre.fetchAndDisplay();