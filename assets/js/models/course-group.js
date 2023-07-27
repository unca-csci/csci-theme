export default class CourseGroup {
    /**/
    
    constructor(data, availableCourses) {
        // console.log(data);
        this.id = data.id;
        this.name = data.acf.name || data.title.rendered;
        this.description = data.acf.description;
        this.categories = data.acf.association || [];
        this.categories = this.categories.map(assoc => assoc.split(":")[0]);
        
        this.isAll = this.categories.includes('all');
        this.isInfo = this.categories.includes('info');
        this.isSys = this.categories.includes('sys');
        this.isMinor = this.categories.includes('minor');
        if (availableCourses) {
            this.courses = availableCourses.filter(course => {
                return course.course_category_ids.includes(this.id);
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
            'beforeend', `
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
            </table>`
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