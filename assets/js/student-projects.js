import DataManager from "./data-manager.js";
import utils from "./utilities.js";

export default class StudentProjects {
    constructor(id) {
        this.parent = document.getElementById(id);

        utils.showSpinner(this.parent);
        this.dm = window.dataManager = new DataManager();
    }

    async fetchAndDisplayById(projectId) {
        const project = await this.dm.initializeStudentProject(projectId);
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", project.getTemplate());
    }

    async fetchAndDisplayFeaturedByTerm(term) {
        await this.dm.initializeStudentProjects(term);
        let projects = this.dm.projects[term];
        projects = projects.filter((p) => p.featured);

        this.parent.innerHTML = '<div class="projects"></div>';
        const container = this.parent.lastElementChild;
        projects.forEach((project) => {
            console.log(project.name, project.term);
            container.insertAdjacentHTML(
                "beforeend",
                project.getCardTemplate()
            );
        });
    }

    async fetchAndDisplayByTerm(term) {
        await this.dm.initializeStudentProjects(term);
        let projects = this.dm.projects[term];

        this.parent.innerHTML = '<div class="projects"></div>';
        const container = this.parent.lastElementChild;
        projects.forEach((project) => {
            console.log(project.name, project.term);
            container.insertAdjacentHTML(
                "beforeend",
                project.getCardTemplateSimple()
            );
        });
    }
}
