export default class CourseCategory {
    /**/

    static courseSortFunction (a, b) {
        if (a.code < b.code) {
            return -1;
        } else if (a.code > b.code) {
            return 1;
        }
        return 0;
    }
    
    constructor(data, availableCourses) {
        this.id = data.id;
        this.name = data.title.rendered;
        this.description = data.acf.description;
        if (availableCourses) {
            this.courses = availableCourses.filter(course => {
                return this.id === course.course_catgory_id;
            });
        }
    }

    getTemplate() {
        let html = `
            <section class="">
                <h2>${ this.name }</h2>
                <p>${ this.description }</p>
                <ul>
                ${ 
                    this.courses
                        .map(course=> course.getTemplateSimple())
                        .join('\n')
                }
                </ul>
            </section>
        `;
        return html;
    }
    
}