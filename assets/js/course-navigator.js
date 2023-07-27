import DataManager from './data-manager.js';
import CourseGroup from './models/course-group.js';


export default class CourseNavigator {

    constructor() {
        this.display = 'card-view';
        this.dm = new DataManager();
    }

    toggleDisplay (e) {
        e.preventDefault();
        document.querySelectorAll('.buttons a').forEach(elem => {
            elem.classList.toggle('selected');
        });
        this.display = e.currentTarget.id;
        this.displayData();
    }

    async fetchAndDisplayNavigator () {
        await this.dm.initializeDegreesCoursesData();
        this.initNavigatorInterface();
    }
    
    async fetchAndDisplayInfoMajor () {
        await this.dm.initializeDegreesCoursesData();
        this.displayInfoMajor();
    }

    initNavigatorInterface() {
        const parent = document.querySelector('#course-navigator');
        parent.innerHTML = '';
        this.appendSelectMenu(parent);
        this.appendToolbar(parent);
        parent.insertAdjacentHTML('beforeend', `<div id="results"></div>`);
        this.displayData();
    }

    displayInfoMajor() {
        const parent = document.querySelector('#course-navigator');
        parent.innerHTML = '';
        this.appendToolbar(parent);
        parent.insertAdjacentHTML('beforeend', `<div id="results"></div>`);
        const degree = this.dm.degrees.filter(degree => degree.isInfo)[0];
        this.displayCourseGroups(degree);
    }

    appendSelectMenu(parent) {
        const degrees = this.dm.degrees;
        const options = degrees.map(degree => {
            return `
                <option value="${degree.id}">${degree.name}</option>
            `;
        })
        parent.insertAdjacentHTML('beforeend', `
            <select id="term">
                <option value="isAll">All CSCI Courses</option>
                ${options.join('\n')}
            </select>`
        );
        document.querySelector('#term').addEventListener('change', this.displayData.bind(this));
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

    displayData () {
        const selection = document.querySelector('#term').value;
        if (selection === 'isAll') {
            this.displayAllCSCICourses(selection);
        } else {
            const degree = this.dm.degrees.filter(degree => degree.id == selection)[0];
            console.log(degree);
            this.displayCourseGroups(degree);
        }
    }

    displayCourseGroups (degree) {
        const parent = document.querySelector('#results');
        parent.innerHTML = '';
        degree.appendToHTMLElement(parent, this.display);
    }

    displayAllCSCICourses() {
        // get all of the CSCI courses that aren't course groupings:
        const courses = this.dm.courses.filter(course => {
            return course.department === 'CSCI' && !course.pick_one;
        })

        // display them:
        const parent = document.querySelector('#results');
        if (this.display === 'card-view') {
            parent.innerHTML = `<div class="cards"></div>`;
            const container = parent.lastElementChild;
            this.displayAllCSCICoursesCards(courses, container);
        } else {
            parent.innerHTML = `<div class="group"></div>`;
            const container = parent.lastElementChild;
            this.displayAllCSCICoursesTable(courses, container);
        }
    }

    displayAllCSCICoursesTable(courses, parent) {
        parent.insertAdjacentHTML(
            'beforeend', CourseGroup.getTemplateTable()
        );
        const tbody = parent.lastElementChild.querySelector('tbody');

        courses.forEach((course => {
            course.appendToHTMLElementTable(tbody);
        }).bind(this));
    }

    displayAllCSCICoursesCards(courses, parent) {
        courses.forEach((course => {
            course.appendToHTMLElementCard(parent);
        }).bind(this));
    }

}
