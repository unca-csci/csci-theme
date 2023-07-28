import DataManager from './data-manager.js';

export default class Linkify {
    constructor() {
        this.dm = new DataManager();
    }

    async fetchAndDisplayCourseLinks () {
        await this.dm.initializeDegreesCoursesData();
        this.linkify();
    }

    getCourse(elem) {
        function matchScore(title, tokens) {
            const matches = tokens.filter(token => title.includes(token));
            return matches.length / tokens.length;
        }
        const code = elem.innerHTML.split('.')[0];
        let title = elem.nextSibling.wholeText;
        title = title.split(' (')[0];
        title = title.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const tokens = title.split(' ');
        const results = this.dm.courses.filter(course => {
            const score = matchScore(course.name.toUpperCase(), tokens);
            return course.code.includes(code.toUpperCase()) &&
                score > 0.5;
        });
        if (results.length > 0) {
            console.log(results[0]);
            return results[0];
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
                    window.showLightbox(course.getTemplate())
                }).bind(this));
            }
        }).bind(this));
    }
}
const linkify = new Linkify();
linkify.fetchAndDisplayCourseLinks();