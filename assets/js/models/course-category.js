export default class CourseCategory {
    /**/
    
    constructor(data, availableCourses) {
        // console.log(data);
        // console.log(availableCourses);
        this.id = data.id;
        this.name = data.title.rendered;
        this.description = data.acf.description;
        if (availableCourses) {
            this.courses = availableCourses.filter(course => {
                return this.id === course.course_catgory_id;
            });
        }
        // console.log(this.courses);
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