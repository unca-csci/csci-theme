import DataManager from './data-manager.js';
import utils from './utilities.js';


export default class WhoWeAre {

    async fetchAndDisplay () {
        this.parent = document.querySelector('.people-list');
        utils.showSpinner(this.parent);
        this.dm = window.dataManager = new DataManager();
        await this.dm.initializePeople();

        this.displayPeople();
    }

    displayPeople() {
        const parent = document.querySelector('.people-list');
        parent.innerHTML = '';
        this.dm.people.forEach((function(person) {
            parent.appendChild(person.getCardTemplateElement());
        }).bind(this));
    }

}

const whoWeAre = new WhoWeAre();
whoWeAre.fetchAndDisplay();