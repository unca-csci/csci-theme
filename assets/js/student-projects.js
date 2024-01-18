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
        // this.parent.insertAdjacentHTML("beforeend", `<button>More</button>`);
    }

    getNavigationHTML(terms, term) {
        const entries = [];
        for (const _term in terms) {
            if (_term === term) {
                entries.push(`<li>${terms[_term]}</li>`);
            } else {
                entries.push(
                    `<li><a href="#" data-term="${_term}">${terms[_term]}</a></li>`
                );
            }
        }
        return `<nav class="project-navigation">
            <ul>
                ${entries.join("\n")}
            </ul>
        </nav>`;
    }

    addNavigationFunctionality(links) {
        links.forEach((link) => {
            link.addEventListener(
                "click",
                function (e) {
                    e.preventDefault();
                    const term = e.currentTarget.getAttribute("data-term");
                    this.fetchAndDisplay(term);
                }.bind(this)
            );
        });
    }

    async getTermDictionary() {
        const response = await fetch(
            "/wp-json/wp/v2/student-projects?_fields=acf.term&orderby=id&order=desc"
        );
        let data = await response.json();
        data = data.map((item) => item.acf.term);
        data = data.filter((item, idx) => data.indexOf(item) === idx);
        //console.log(data);
        const termDict = {};
        data.forEach((item) => {
            const idx = item.length - 4;
            termDict[item] =
                item.charAt(0).toUpperCase() +
                item.substring(1, idx) +
                " " +
                item.substring(idx);
        });
        //console.log(termDict);
        return termDict;
    }

    async fetchAndDisplay(term = null) {
        const terms = await this.getTermDictionary();
        term = term || Object.keys(terms)[0];
        const title = terms[term];
        await this.dm.initializeStudentProjects(term);
        let projects = this.dm.projects[term];

        this.parent.innerHTML = `
            ${this.getNavigationHTML(terms, term)}
            <h2>${title}</h2>
            <div></div>
        `;

        // add the projects:
        const container = this.parent.lastElementChild;
        if (projects.length === 0) {
            container.insertAdjacentHTML(
                "beforeend",
                `<div>${title} projects are coming soon!</div>`
            );
        } else {
            projects.forEach((project) => {
                container.insertAdjacentHTML(
                    "beforeend",
                    project.getCardTemplateSimple()
                );
            });
        }

        // add the navigation:
        const links = this.parent
            .querySelector(".project-navigation")
            .querySelectorAll("a");
        this.addNavigationFunctionality(links);
    }
}
