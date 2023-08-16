import Course from './course.js';
import utils from '../utilities.js';

export default class CourseGeneric300 extends Course {

    constructor() {
        const data = { 
            acf: {
                title: 'Pick any 300+ CSCI Course', 
                csci_num: 'CSCI 300+'
            }
        };
        super(data);
        this.getCourses();
    }

    getTemplate() {

        return `
        <section class="content-wrapper">
            <h3>CSCI 300+ Level Electives</h3>
            <p>
                Note that you cannot "double-count" CSCI Electives. 
                In other words, pick an elective that hasn't already 
                counted towards another requirement.
            </p>
        </section>
        `;
    }

    getTemplateElement() {
        const el = utils.createElementFromHTML(this.getTemplate());
        el.insertAdjacentHTML('beforeend', '<ul></ul>');
        const ul = el.lastElementChild;
        this.courses
            .filter(course => course.is300PlusElective())
            .forEach(course => {
                course.appendToHTMLElementListItem(ul);
            })
        return el;
    }

    async getCourses () {
        if (!this.courses) {
            this.dm = window.dataManager;
            this.courses = await this.dm.getCourses();
            return this.courses;
        } else {
            return this.courses;
        }
    }
    
}