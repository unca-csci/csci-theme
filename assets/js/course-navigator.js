import DataManager from './data-manager.js';


class CourseNavigator {

    constructor() {
        this.display = 'card-view';
        this.dm = new DataManager();
    }

    toggleDisplay (e) {
        document.querySelectorAll('.buttons a').forEach(elem => {
            elem.classList.toggle('selected');
        });
        this.display = e.currentTarget.id;
        this.displayData();
    }

    async fetchAndDisplay () {
        await this.dm.initializeData();
        this.initInterface();
    }

    initInterface() {
        const parent = document.querySelector('#course-navigator');
        parent.innerHTML = '';
        this.appendSelectMenu(parent);
        this.appendToolbar(parent);
        parent.insertAdjacentHTML('beforeend', `<div id="results"></div>`);
        this.displayData();
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
        const courses = this.dm.courses.filter(course => {
            return course.department === 'CSCI' && !course.pick_one;
        })
        const parent = document.querySelector('#results');
        parent.innerHTML = '';
        if (this.display === 'card-view') {
            this.displayAllCSCICoursesCards(courses, parent);
        } else {
            this.displayAllCSCICoursesTable(courses, parent);
        }
    }

    displayAllCSCICoursesTable(courses, parent) {
        
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplateTable()
        );
        const tbody = parent.lastElementChild.querySelector('tbody');
        
        console.log(courses);
        courses.forEach((course => {
            course.appendToHTMLElementTable(tbody);
        }).bind(this));
    }

    displayAllCSCICoursesCards(courses, parent) {
        parent.insertAdjacentHTML(
            'beforeend', `<div class="cards"></div>`
        );
        const cardsElement = parent.lastElementChild;
        courses.forEach((course => {
            course.appendToHTMLElementCard(cardsElement);
        }).bind(this));
    }

    getTemplateTable() {
        let html = `
            <section class="group">
                <table>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Title</th>
                            <th>Offered</th>
                            <th>Credits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- courses go here -->
                    </tbody>
                </table>
            </section>
        `;
        return html;
    }
}

const courseNavigator = new CourseNavigator();
courseNavigator.fetchAndDisplay();