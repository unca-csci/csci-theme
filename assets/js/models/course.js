export default class Course {

    static courseSortFunction (a, b) {
        // list "Pick One" courses before others
        let code1 = a.code;
        let code2 = b.code;
        if (a.courses != null) {
            code1 = a.courses[0].code;
        }
        if (b.courses != null) {
            code2 = b.courses[0].code;
        }
        if (code1 < code2) {
            return -1;
        } else if (code1 > code2) {
            return 1;
        }
        return 0;
    }
    
    constructor(data) {
        this.id = data.id;
        this.dataType = 'course';
        this.course_category_ids = this.getCourseCategoryIds(data);
        this.cs_areas = this.getCSAreas(data);
        this.code = data.acf.csci_num;
        try {
            this.department = data.acf.csci_num.split(' ')[0];
        } catch (e) {
            this.department = '';
        }
        this.name = data.acf.title;
        this.description = data.acf.description;
        this.offered = data.acf.offered || '';
        this.credits = data.acf.credits || 3;
        this.prerequisites_ids = null;
        this.prerequisites = null;

        this.requirements = [];
        if (data.acf.prerequisites) {
            this.prerequisites_ids = data.acf.prerequisites.map(item => item.ID);
        }

    }

    loadPrerequisites(availableCourses, availableGroups) {
        this.prerequisites = this._getPrereqs(availableCourses, availableGroups);
    }

    _getPrereqs(availableCourses, availableGroups) {
        // returns a unique, sorted list of prerequisites:
        if (this.prerequisites_ids) {
            let prereqs = this._getPrereqsRecursive([], availableCourses, availableGroups);
            return [...new Set(prereqs)].sort(Course.courseSortFunction);
        }
        return null;
    }

    _getPrereqsRecursive(prereqs, availableCourses, availableGroups) {
        if (this.prerequisites_ids) {
            const newPrereqs = availableCourses.filter(course => this.prerequisites_ids.includes(course.id));
            const newPrereqGroups = availableGroups.filter(group => this.prerequisites_ids.includes(group.id));
            prereqs = prereqs.concat(newPrereqs);
            prereqs = prereqs.concat(newPrereqGroups);
            for (const newPrereq of newPrereqs) {
                return newPrereq._getPrereqsRecursive(prereqs, availableCourses, availableGroups)
            }
        }
        return prereqs;
    }

    getTemplate() {
        let html = `
            <h2 class="person-header">${ this.code }: ${ this.name }</h2>
            <p>${ this.description }</p>
            <ul>
                <li>${this.credits} Credit Hour(s)</li>
                ${this.offered ? `<li>Offered ${this.offered}</li>` : ''}
            </ul>
            ${ this.getPrereqs() }
            ${ this.getRequirements() }
            ${ this.getAreas() }
        `;
        return html;
    }

    getTemplateListItem() {
        const tokens = this.name.split(": ");
        const name = tokens.length > 1 ? tokens[1] : this.name;
        return `<li>
            ${ this.code }. 
            <a href="#">${ name }</a>
        </li>`;
    }

    getTemplateTableRow() {
        if (!this.pick_one) {
            let prereqs = this.prerequisites ? this.prerequisites.length : 0;
            if (prereqs === 0) { prereqs = '--'; }
            return `<tr>
                <td>
                    ${ this.code }
                </td>
                <td><a href="#">${ this.name }</a></td>
                <td>${ this.offered }</td>
                <td>${ prereqs }</td>
                <td>${ this.credits }</td>
            </tr>`;
        } else {
            return `<tr>
                <td>${ this.name }</td>
                <td></td>
                <td>${ this.offered }</td>
                <td></td>
                <td>${ this.credits }</td>
            </tr>`;
        }
    }

    getTemplateCard() {
        return `<div class="card">
            <a href="#"><h3>${ this.code }</h3></a>
            <p>${ this.name }<br>(${ this.credits } Credits)</p>
        </div>`;
    }

    appendToHTMLElement (parent) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplateListItem()
        );
        parent.lastElementChild.addEventListener('click', (function () {
            window.showLightbox(this.getTemplate())
        }).bind(this));
    }

    appendToHTMLElementTable (parent) {
        
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplateTableRow()
        );
        const tr = parent.lastElementChild;
        const a = tr.querySelector('a');
        a.addEventListener('click', (function () {
            window.showLightbox(this.getTemplate())
        }).bind(this));
    }

    appendToHTMLElementCard (parent) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplateCard()
        );
        const card = parent.lastElementChild;
        const a = card.querySelector('a');
        a.addEventListener('click', (function () {
            window.showLightbox(this.getTemplate())
        }).bind(this));
    }

    getCourseCategoryIds(data) {
        if (data.acf.course_categories && data.acf.course_categories.length > 0) {
            return data.acf.course_categories.map(cat => cat.ID);
        }
        return [];
    };

    getCSAreas(data) {
        if (data.acf.cs_areas && data.acf.cs_areas.length > 0) {
            return data.acf.cs_areas.map(area => {
                return {
                    "id": area.ID, 
                    "title": area.post_title
                }
            });
        }
        return [];
    }

    getPrereqs() {
        if (!this.prerequisites) {
            return '<h3>Prerequisites</h3><p>None</p>';
        }
        return `
            <h3>Prerequisites</h3>
            <ul>
            ${
                this.prerequisites
                    .map(prereq => {
                        // handles the situation where there's an either / or:
                        if (prereq.dataType == 'course') {
                            return `<li>${ prereq.code }. ${ prereq.name }</li>`
                        } else {
                            return `<li>${prereq.code}. ${prereq.name} Pick One: <ul>${
                                prereq.courses.map(course => {
                                    return `<li>${ course.code }. ${ course.name }</li>`
                                }).join('\n')
                            }</ul></li>`
                        }
                    })
                    .join('\n')
            }
            </ul>
        `;
    }

    getAreas() {
        if (!this.cs_areas) {
            return '';
        }
        return '<div><h3>CS Areas</h3>' + 
            this.cs_areas.map(item => {
                return `<span class="tag">${ item.title }</span>`;
            }).join('') + 
        '</div>';
    }

    getRequirements() {
        if (this.requirements.length === 0) {
            return '';
        }
        return `
            <h3>Required for:</h3>
            <ul><li>${this.requirements.join('</li><li>')}</li></ul>
        `;
    }

    setRequirements(degrees) {
        // look through all of the degree objects to see if the current course 
        // is listed. If it is, add it to the requirements array:
        degrees.forEach((degree => {
            const courseIds = degree.courses.map(course => course.id);
            if (courseIds.includes(this.id)) {
                this.requirements.push(degree.name);
            }
        }).bind(this));
    }
    
}