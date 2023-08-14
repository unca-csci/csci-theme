import DataManager from './data-manager.js';
import CourseGeneric300 from './models/course-generic-300.js';

export default class Linkify {
    constructor() {
        this.dm = new DataManager();
    }

    async fetchAndDisplayCourseLinks () {
        await this.dm.initializeDegreesCoursesData();
        this.courses = this.dm.courses.concat(this.dm.groups);
        this.linkify();
    }

    getCourse(elem) {
        const code = elem.innerHTML.split('.')[0];
        const results = this.courses.filter(course => {
            if (course.code === 'Sys: Data Science Requirement') {
                course.code = 'CSCI Data Science Requirement (Systems)';
            } else if (course.code === 'Info: Data Science Requirement') {
                course.code = 'CSCI Data Science Requirement (Information)';
            }
            return course.code.toUpperCase().includes(code.toUpperCase());
        });
        if (results.length > 0) {
            return results[0];
        } else if (code === 'CSCI 300+ Elective') {
            return new CourseGeneric300();
        }
        return null;
    }
    
    linkify() {
        // finds all of the CSCI / MATH / PHYS courses and
        // generates a link so that the user can learn more
        // about the course:
        const elements = document.querySelectorAll('li strong');
        elements.forEach((elem => {
            const course = this.getCourse(elem);
            if (course) {
                const code = elem.innerHTML.replace('.', '').trim();
                elem.innerHTML = `<a href="#">${code}</a>. `;
                elem.addEventListener('click', (function () {
                    window.lightbox.show(course.getTemplate())
                }).bind(this));
            }
        }).bind(this));
    }
}
const linkify = new Linkify();
linkify.fetchAndDisplayCourseLinks();