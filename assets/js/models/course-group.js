import Course from './course.js'
import CourseGeneric300 from './course-generic-300.js';
import utils from '../utilities.js';

export default class CourseGroup {
    /**/

    static get300LevelElective() {
        return new CourseGeneric300();
    }

    static getTemplateTable() {
        return `
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Title</th>
                        <th>Offered</th>
                        <th># of Prereqs</th>
                        <th>Credit Hours</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- courses go here -->
                </tbody>
            </table>
        `;
    }
    
    constructor(data) {
        // console.log(data);
        this.id = data.id;
        this.dataType = 'course-group';
        this.code = data.title.rendered;
        this.name = data.acf.name;
        this.description = data.acf.description;
        this.groupType = data.acf.type_of_group;
        this.course_ids = data.acf.courses ?  data.acf.courses.map(course => course.ID) : null; 
    }

    loadCourses(availableCourses, availableGroups) {
        this.courses = [];
        if (!this.course_ids) { return; }
        if (availableCourses) {
            this.courses = availableCourses.filter(course => {
                return this.course_ids.includes(course.id);
            });
        }
        if (availableGroups) {
            const groups = availableGroups.filter(group => {
                return this.course_ids.includes(group.id);
            });
            this.courses = this.courses.concat(groups);
            this.courses.sort(Course.courseSortFunction);
        }
    }

    appendToHTMLElement(parent, idx, displayMode) {
        if (displayMode === 'card-view') {
            this.appendToHTMLElementCards(parent, idx);
        } else {
            this.appendToHTMLElementTable(parent, idx);
        }
    } 

    appendToHTMLElementTable (parent, idx) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplateContainer(idx)
        );
        if (this.courses.length > 0) {
            const section = parent.lastElementChild;
            this.appendTable(section);
            const tbody = section.lastElementChild.querySelector('tbody');
            this.courses.forEach((child => {
                    if (child.dataType === 'course') {
                        child.appendToHTMLElementTable(tbody);
                    } else {
                        child.appendToHTMLElementTableNested(tbody);
                    }
                }).bind(this)
            );
        } else if (['Pick Two', 'Pick Three'].includes(this.groupType)) {
            const section = parent.lastElementChild;
            this.appendTable(section);
            const tbody = section.lastElementChild.querySelector('tbody');
            const course = CourseGroup.get300LevelElective();
            course.appendToHTMLElementTable(tbody);
            course.appendToHTMLElementTable(tbody);
            if (this.groupType === 'Pick Three') {
                course.appendToHTMLElementTable(tbody);
            }
        }
    }

    appendToHTMLElementTableNested (parent) {
        
        parent.insertAdjacentHTML(
            'beforeend', `<tr>
                <td>${ this.name }</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`);
        const tr = parent.lastElementChild;
        const cell2 = tr.querySelectorAll('td')[1];
        this.showPickOneCourseOptions(cell2);
    }

    appendToHTMLElementCards (parent, idx) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplateContainer(idx)
        );
        if (this.courses.length > 0) {
            const section = parent.lastElementChild;
            this.appendCardContainer(section);
            const cards = section.lastElementChild;
            this.courses.forEach((course => {
                course.appendToHTMLElementCard(cards);
            }).bind(this));
        } else if (['Pick Two', 'Pick Three'].includes(this.groupType)) {
            const section = parent.lastElementChild;
            this.appendCardContainer(section);
            const cards = section.lastElementChild;
            const course = CourseGroup.get300LevelElective();
            course.appendToHTMLElementCard(cards);
            course.appendToHTMLElementCard(cards);
            if (this.groupType === 'Pick Three') {
                course.appendToHTMLElementCard(cards);
            }
        }
    }

    appendToHTMLElementCard (parent) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplateCard()
        );
        const card = parent.lastElementChild;
        card.querySelector('a').addEventListener('click', this.showModal.bind(this));

        // append child courses:
        this.showPickOneCourseOptionsInline(card);
    }

    showModal(e) {
        window.modalManager.showModal(this.getTemplateElement());
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    getTemplateCard() {
        return `<div class="card">
            <a href="#"><h3>${ this.name }</h3></a>
        </div>`;
    }

    showPickOneCourseOptions(parent) {
        this.showPickOneCourseOptionsInline(parent);
    }

    showPickOneCourseOptionsInline(parent) {
        parent.insertAdjacentHTML(
            'beforeend', 'Pick One:<div></div>'
        );
        const container = parent.lastElementChild;
        this.courses.forEach(((course, idx) => {
            if (idx > 0) {
                container.insertAdjacentHTML(
                    'beforeend', ` &bull; `
                );
            }
            course.appendLinkToHTMLElement(container);

        }).bind(this));
    }


    getTemplateContainer(idx) {
        return `
        <section class="group">
            <h2>${ idx }. ${ this.name }</h2>
            ${ this.description }
        </section>
        `;
    }

    getTemplate() {
        return `
        <section class="group content-wrapper">
            <h2>${ this.name }</h2>
            ${ this.description }
        </section>
        `;
    }

    getTemplateElement() {
        const el = utils.createElementFromHTML(this.getTemplate());
        el.insertAdjacentHTML('beforeend', '<ul></ul>');
        const ul = el.lastElementChild;
        this.courses.forEach(course => {
            course.appendToHTMLElementListItem(ul);
        })
        return el;
    }

    appendTable(parent) {
        parent.insertAdjacentHTML(
            'beforeend', CourseGroup.getTemplateTable()
        );
    }

    appendCardContainer(parent) {
        parent.insertAdjacentHTML(
            'beforeend', `
            <div class="cards">
                <!-- courses go here -->
            </div>`
        );
    }
    
}