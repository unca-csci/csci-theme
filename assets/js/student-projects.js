import DataManager from './data-manager.js';

export default class StudentProjects {

    constructor(id) {
        // console.log('Constructor running:', )
        this.parent = document.getElementById(id);
        console.log(this.parent);
        // this.parent.id = 'projects_' + Math.random().toString(36).slice(2);
        console.log('Constructor running:', id);
        this.dm = new DataManager();
    }

    async fetchAndDisplayById (projectId) {
        await this.dm.initializeStudentProjects();
        const project = this.dm.projects.filter(project => projectId === project.id)[0];
        this.parent.insertAdjacentHTML('beforeend', project.getTemplate())
    }

    async fetchAndDisplayByTerm(term) {
        await this.dm.initializeStudentProjects();
        let projects = this.dm.projects;
        if (term) {
            projects = projects.filter(p => p.term === term);
        }
        
        this.parent.innerHTML = '<div class="projects"></div>';
        console.log(this.parent.id);
        const container = this.parent.lastElementChild;
        projects.forEach(project => {
            console.log(project.name, project.term);
            container.insertAdjacentHTML('beforeend', project.getCardTemplate())
        })
    }

}