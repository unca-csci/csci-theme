import DataManager from "./data-manager.js";
import utils from "./utilities.js";

export default class StudentProject {
    constructor() {
        this.mainContainer = document.querySelector("#project-main");
        this.sideContainer = document.querySelector("#project-side");
        utils.showSpinner(this.mainContainer);
        this.dm = window.dataManager = new DataManager();
    }

    async fetchAndDisplayById(projectId) {
        await this.dm.initializeStudentProjects();
        const project = this.dm.projects[null].filter(
            (project) => projectId === project.id
        )[0];
        this.mainContainer.innerHTML = project.getMainTemplate();
        project.appendSideTemplate(this.sideContainer);
    }
}
