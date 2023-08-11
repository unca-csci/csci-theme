import BaseNavigator from './base-navigator.js';

export default class DegreeRequirements extends BaseNavigator {

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

    render() {
        const groupContainer = document.querySelector('.groups');
        groupContainer.innerHTML = '';
        this.degree.groups.forEach(((group, idx) => {
            console.log(this.display);
            group.appendToHTMLElement(groupContainer, idx+1, this.display);
        }).bind(this));
    }

}
