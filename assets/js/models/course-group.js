export default class CourseGroup {
    /**/
    
    constructor(data, availableCourses) {
        this.id = data.id;
        this.name = data.title.rendered;
        this.description = data.acf.description;
        if (availableCourses) {
            this.courses = availableCourses.filter(course => {
                return course.course_category_ids.includes(this.id);
            });
        }
    }

    appendToHTMLElement (parent) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplate()
        );
        const ul = parent.lastElementChild.querySelector('ul');
        this.courses.forEach((course => {
                ul.insertAdjacentHTML(
                    'beforeend', course.getTemplateSimple()
                );
                ul.lastElementChild.addEventListener('click', (function () {
                        window.showLightbox(course.getTemplate())
                    }).bind(this));
                
            }).bind(this)
        );
    }

    getTemplate() {
        let html = `
            <section class="">
                <h2>${ this.name }</h2>
                <p>${ this.description }</p>
                <ul>
                    <!-- courses go here -->
                </ul>
            </section>
        `;
        return html;
    }
    
}