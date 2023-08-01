import DataManager from './data-manager.js';

export default class StudentProjects {

    async fetchAndDisplay (projectId) {
        
        this.dm = new DataManager();
        await this.dm.initializeStudentProjects();
        console.log(this.dm.students);
        console.log(this.dm.projects);
        console.log(this.dm.people);
        const parent = document.querySelector('.project-list');
        if (projectId) {
            console.log(projectId);
            const project = this.dm.projects.filter(project => projectId === project.id)[0];
            parent.insertAdjacentHTML('beforeend', project.getTemplate())
        } else {
            this.dm.projects.forEach(project => {
                parent.insertAdjacentHTML('beforeend', project.getTemplate())
            })
        }
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