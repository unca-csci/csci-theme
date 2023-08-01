import DataManager from './data-manager.js';

export default class StudentProject {

    constructor() {
        this.mainContainer = document.querySelector('#project-main');
        this.sideContainer = document.querySelector('#project-side');
        this.dm = new DataManager();
    }

    async fetchAndDisplayById (projectId) {
        await this.dm.initializeStudentProjects();
        const project = this.dm.projects.filter(project => projectId === project.id)[0];
        this.mainContainer.insertAdjacentHTML('beforeend', project.getMainTemplate());
        project.appendSideTemplate(this.sideContainer)
        //this.sideContainer.insertAdjacentHTML('beforeend', project.getSideTemplate());
    }
}