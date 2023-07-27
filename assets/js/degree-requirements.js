import DataManager from './data-manager.js';

export default class DegreeRequirements {

    constructor() {
        this.display = 'card-view';
        this.dm = new DataManager();
    }

    toggleDisplay (e) {
        e.preventDefault();
        console.log(document.querySelectorAll('.buttons a'));
        document.querySelectorAll('.buttons a').forEach(elem => {
            elem.classList.toggle('selected');
        });
        this.display = e.currentTarget.id;
        console.log(this.display);
        this.redrawGroups();
    }

    async fetchAndDisplayDegreeRequirements (degreeType) {
        await this.dm.initializeDegreesCoursesData();
        this.displayDegreeRequirements(degreeType);
    }

    displayDegreeRequirements(degreeType) {
        if (degreeType === 'info') {
            this.degree = this.dm.degrees.filter(degree => degree.isInfo)[0];
        } else if (degreeType === 'sys') {
            this.degree = this.dm.degrees.filter(degree => degree.isSys)[0];
        } else {
            this.degree = this.dm.degrees.filter(degree => degree.isMinor)[0];
        }
        const parent = document.querySelector('#course-navigator');
        parent.innerHTML = '';
        parent.insertAdjacentHTML('beforeend', `<div id="results"></div>`);
        this.displayCourseGroups();
    }

    appendToolbar(parent) {
        parent.insertAdjacentHTML('beforeend', `
            <div class="toolbar">
                <div class="buttons">
                    <a href="#" id="card-view" class="selected">
                        <span class="material-symbols-rounded">
                            grid_view
                        </span></a>
                    <a href="#" id="table-view">
                        <span class="material-symbols-rounded">
                            table
                        </span></a>
                </div>
            </div>`);
        document.querySelector('#card-view').addEventListener('click', this.toggleDisplay.bind(this));
        document.querySelector('#table-view').addEventListener('click', this.toggleDisplay.bind(this));   
    }


    displayCourseGroups () {
        console.log('display course groups');
        const parent = document.querySelector('#results');
        parent.innerHTML = `
            <h1 class="h1">${ this.degree.name }</h1>
            ${ this.degree.description }
        `;
        this.appendToolbar(parent);
        parent.insertAdjacentHTML('beforeend', `
            <div class="groups"></div>
        `);

        const groupContainer = parent.lastElementChild;

        this.degree.groups.forEach(((group, idx) => {
            console.log(this.display);
            group.appendToHTMLElement(groupContainer, idx+1, this.display);
        }).bind(this));
    }

    redrawGroups() {
        const groupContainer = document.querySelector('.groups');
        groupContainer.innerHTML = '';
        this.degree.groups.forEach(((group, idx) => {
            console.log(this.display);
            group.appendToHTMLElement(groupContainer, idx+1, this.display);
        }).bind(this));
    }

}
