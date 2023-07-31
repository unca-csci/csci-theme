import Course from './course.js'
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
    
    constructor(data) {
        // console.log(data);
        this.id = data.id;
        this.dataType = 'course-group';
        this.code = data.title.rendered;
        this.name = data.acf.name;
        this.description = data.acf.description;
        this.course_ids = data.acf.courses ?  data.acf.courses.map(course => course.ID) : null;
        
    }

    loadCourses(availableCourses, availableGroups) {
        this.courses = [];
        if (!this.course_ids) { return; }
        if (availableCourses) {
            this.courses = availableCourses.filter(course => {
                return this.course_ids.includes(course.id);
            });
        }
        if (availableGroups) {
            const groups = availableGroups.filter(group => {
                return this.course_ids.includes(group.id);
            });
            this.courses = this.courses.concat(groups);
            this.courses.sort(Course.courseSortFunction);
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
            this.courses.forEach((child => {
                    if (child.dataType === 'course') {
                        child.appendToHTMLElementTable(tbody);
                    } else {
                        child.appendToHTMLElementTableNested(tbody);
                    }
                }).bind(this)
            );
        }
    }

    appendToHTMLElementTableNested (parent) {
        
        parent.insertAdjacentHTML(
            'beforeend', `<tr>
                <td>${ this.name }</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`);
        const tr = parent.lastElementChild;
        const cell2 = tr.querySelectorAll('td')[1];
        this.showPickOneCourseOptions(cell2);
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

    appendToHTMLElementCard (parent) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplateCardPickOne()
        );
        const card = parent.lastElementChild;
        this.showPickOneCourseOptionsInline(card);
    }

    getTemplateCardPickOne() {
        return `<div class="card">
            <h3>${ this.name }</h3>
        </div>`;
    }

    showPickOneCourseOptions(parent) {
        parent.insertAdjacentHTML(
            'beforeend', '. Pick One:<ul></ul>'
        );
        const ul = parent.lastElementChild;
        this.courses.forEach((course => {
            ul.insertAdjacentHTML(
                'beforeend', course.getTemplateListItem()
            );

            const a = ul.lastElementChild.querySelector('a');
            a.addEventListener('click', (function () {
                window.showLightbox(course.getTemplate())
            }).bind(course));

        }).bind(this));
    }

    showPickOneCourseOptionsInline(parent) {
        parent.insertAdjacentHTML(
            'beforeend', 'Pick One:<div></div>'
        );
        const container = parent.lastElementChild;
        this.courses.forEach(((course, idx) => {
            if (idx > 0) {
                container.insertAdjacentHTML(
                    'beforeend', ` &bull; `
                );
            }
            container.insertAdjacentHTML(
                'beforeend', `<a href="#">${course.code}</a> `
            );

            const a = parent.lastElementChild;
            a.addEventListener('click', (function () {
                window.showLightbox(course.getTemplate())
            }).bind(course));

        }).bind(this));
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