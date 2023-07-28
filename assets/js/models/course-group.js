export default class CourseGroup {
    /**/

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
    
    constructor(data, availableCourses) {
        // console.log(data);
        this.id = data.id;
        this.name = data.acf.name || data.title.rendered;
        this.description = data.acf.description;
        this.courses = [];

        if (availableCourses && data.acf.courses) {
            const course_ids = data.acf.courses.map(course => course.ID);
            this.courses = availableCourses.filter(course => {
                return course_ids.includes(course.id);
            });
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
            'beforeend', this.getTemplate(idx)
        );
        if (this.courses.length > 0) {
            const section = parent.lastElementChild;
            this.appendTable(section);
            const tbody = section.lastElementChild.querySelector('tbody');
            this.courses.forEach((course => {
                    course.appendToHTMLElementTable(tbody);
                }).bind(this)
            );
        }
    }

    appendToHTMLElementCards (parent, idx) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplate(idx)
        );
        if (this.courses.length > 0) {
            const section = parent.lastElementChild;
            this.appendCardContainer(section);
            const cards = section.lastElementChild;
            this.courses.forEach((course => {
                course.appendToHTMLElementCard(cards);
            }).bind(this));
        }
    }


    getTemplate(idx) {
        return `
        <section class="group">
            <h2>${ idx }. ${ this.name }</h2>
            ${ this.description }
        </section>
        `;
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