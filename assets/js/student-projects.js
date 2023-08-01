import DataManager from './data-manager.js';

export default class StudentProjects {

    async fetchAndDisplay () {
        
        this.dm = new DataManager();
        await this.dm.initializeStudentProjects();
        console.log(this.dm.students);
        console.log(this.dm.projects);
        console.log(this.dm.people);
    }

    displayPeople() {
        const parent = document.querySelector('.people-list');
        this.dm.people.forEach((function(person) {

            // 1. Display each CS Area:
            parent.insertAdjacentHTML(
                'beforeend', person.getCardTemplate()
            )

            // 2. Add event handler:
            const btn = parent.lastElementChild.querySelector('button');

            btn.addEventListener('click', (function () {
                window.showLightbox(person.getTemplate())
            }).bind(this));

        }).bind(this));
    }

}

const projects = new StudentProjects();
projects.fetchAndDisplay();