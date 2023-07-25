export default class Course {

    static courseSortFunction (a, b) {
        if (a.code < b.code) {
            return -1;
        } else if (a.code > b.code) {
            return 1;
        }
        return 0;
    }
    
    constructor(data) {
        // console.log(data);
        this.id = data.id;
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
        this.prerequisites_ids = null;
        this.prerequisites = null;
        this.pick_one_ids = null;
        this.pick_one = null;
        this.requirements = null;
        if (data.acf.prerequisites) {
            this.prerequisites_ids = data.acf.prerequisites.map(item => item.ID);
        }
        if (data.acf.pick_one) {
            this.pick_one_ids = data.acf.pick_one.map(item => item.ID);
        }
        
        if (data.acf.major_minor_requirements && data.acf.major_minor_requirements.length > 0) {
            this.requirements = data.acf.major_minor_requirements;
        }

    }

    loadRelationships(availableCourses) {
        if (this.prerequisites_ids) {
            this.prerequisites = availableCourses.filter(course => this.prerequisites_ids.includes(course.id));
        }
        if (this.pick_one_ids) {
            this.pick_one = availableCourses.filter(course => this.pick_one_ids.includes(course.id));
        }
    }

    getTemplate() {
        let html = `
            <h2 class="person-header">${ this.code }: ${ this.name }</h2>
            <p>${ this.description }</p>
            ${ this.getPrereqs() }
            ${ this.getRequirements() }
            ${ this.getAreas() }
        `;
        return html;
    }

    getTemplateSimple() {
        return `<li>
            <a href="#">
                ${ this.code }. ${ this.name }
            </a>
        </li>`;
    }

    appendToHTMLElement (parent) {
        if (!this.pick_one) {
            parent.insertAdjacentHTML(
                'beforeend', this.getTemplateSimple()
            );
            parent.lastElementChild.addEventListener('click', (function () {
                window.showLightbox(this.getTemplate())
            }).bind(this));
        }
        else {
            parent.insertAdjacentHTML(
                'beforeend', `<li>${this.name}. Pick One: <ul></ul></li>`
            );
            const ul = parent.lastElementChild.querySelector('ul');
            this.pick_one.forEach((course => {
                    course.appendToHTMLElement(ul);
                }).bind(this)
            );
        }

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
        // if (!this.pick_one) {
        //     parent.insertAdjacentHTML(
        //         'beforeend', this.getTemplateSimple()
        //     );
        //     parent.lastElementChild.addEventListener('click', (function () {
        //         window.showLightbox(this.getTemplate())
        //     }).bind(this));
        // }
        // else {
        //     parent.insertAdjacentHTML(
        //         'beforeend', `<li>${this.name}. Pick One: <ul></ul></li>`
        //     );
        //     const ul = parent.lastElementChild.querySelector('ul');
        //     this.pick_one.forEach((course => {
        //             course.appendToHTMLElement(ul);
        //         }).bind(this)
        //     );
        // }
        return `
            <h3>Prerequisites</h3>
            <ul>
            ${
                this.prerequisites
                    .map(prereq => {
                        // handles the situation where there's an either / or:
                        if (!prereq.pick_one) {
                            return `<li>${ prereq.code }. ${ prereq.name }</li>`
                        } else {
                            return `<li>${prereq.name}. Pick One: <ul>${
                                prereq.pick_one.map(course => {
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
        if (!this.requirements) {
            return '';
        }
        return `
            <h3>Required for:</h3>
            <ul><li>${this.requirements.join('</li><li>')}</li></ul>
        `;
    }
    
}