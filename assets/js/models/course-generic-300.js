import Course from './course.js';
import DataManager from '../data-manager.js';

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
            <ul>
                ${ this.courses
                    .filter(course => course.is300PlusElective())
                    .map(course => course.getTemplateListItem(false))
                    .join('\n')
                }
            </ul>
        </section>
        `;
    }

    async getCourses () {
        if (!this.courses) {
            const dm = new DataManager();
            this.courses = await dm.getCourses();
            return this.courses;
        } else {
            return this.courses;
        }
    }
    
}