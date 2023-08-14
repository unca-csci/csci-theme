import DataManager from './data-manager.js';
import utils from './utilities.js';

export default class StudentProjects {

    constructor(id) {
        this.parent = document.getElementById(id);
        
        utils.showSpinner(this.parent);
        this.dm = new DataManager();
    }

    async fetchAndDisplayById (projectId) {
        await this.dm.initializeStudentProjects();
        const project = this.dm.projects.filter(project => projectId === project.id)[0];
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', project.getTemplate())
    }

    async fetchAndDisplayByTerm(term) {
        await this.dm.initializeStudentProjects();
        let projects = this.dm.projects;
        if (term) {
            projects = projects.filter(p => p.term === term);
        }
        
        this.parent.innerHTML = '<div class="projects"></div>';
        const container = this.parent.lastElementChild;
        projects.forEach(project => {
            console.log(project.name, project.term);
            container.insertAdjacentHTML('beforeend', project.getCardTemplate())
        })
    }

}