export default class CourseGroup {
    /**/
    
    constructor(data, availableCourses) {
        // console.log(data);
        this.id = data.id;
        this.name = data.title.rendered;
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

    appendToHTMLElement1 (parent) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplate()
        );
        const ul = parent.lastElementChild.querySelector('ul');
        this.courses.forEach((course => {
                course.appendToHTMLElement(ul);
            }).bind(this)
        );
    }

    appendToHTMLElementTable (parent, idx) {
        if (this.courses.length === 0) {
            parent.insertAdjacentHTML(
                'beforeend', `
                <section class="group">
                    <h2>${ idx }. ${ this.name }</h2>
                    ${ this.description }
                </section>
                `
            );
        } else {
            parent.insertAdjacentHTML(
                'beforeend', this.getTemplateTable(idx)
            );
            const tbody = parent.lastElementChild.querySelector('tbody');
            this.courses.forEach((course => {
                    course.appendToHTMLElementTable(tbody);
                }).bind(this)
            );
        }
    }

    appendToHTMLElementCards (parent, idx) {
        parent.insertAdjacentHTML(
            'beforeend', `
            <section class="group">
                <h2>${ idx }. ${ this.name }</h2>
                ${ this.description }
                <div class="cards"></div>
            </section>
            `
        );
        const cards = parent.lastElementChild.querySelector('.cards');
        this.courses.forEach((course => {
                course.appendToHTMLElementCard(cards);
            }).bind(this)
        );
    }


    getTemplate() {
        let html = `
            <section class="group">
                <h2>${ this.name }</h2>
                ${ this.description }
                <ul>
                    <!-- courses go here -->
                </ul>
            </section>
        `;
        return html;
    }

    getTemplateTable(idx) {
        let html = `
            <section class="group">
                <h2>${ idx }. ${ this.name }</h2>
                ${ this.description }
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
                </table>
            </section>
        `;
        return html;
    }
    
}