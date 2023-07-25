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
        this.id = data.id;
        this.course_category_id = this.getCourseCategoryId(data);
        this.cs_areas = this.getCSAreas(data);
        this.code = data.acf.csci_num;
        try {
            this.department = data.acf.csci_num.split(' ')[0];
        } catch (e) {
            this.department = '';
        }
        this.name = data.acf.title;
        this.description = data.acf.description;
        this.prerequisites = null;
        this.requirements = null;
        if (data.acf.prerequisites) {
            this.prerequisites = data.acf.prerequisites.map(item => item.post_title);
        }
        
        if (data.acf.major_minor_requirements && data.acf.major_minor_requirements.length > 0) {
            this.requirements = data.acf.major_minor_requirements;
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
            <a href="#" onclick="showCourse(${this.id})">
                ${ this.code }. ${ this.name }
            </a>
        </li>`;
    }


    getCourseCategoryId(data) {
        if (data.acf.course_category) {
            return data.acf.course_category.ID;
        }
        return null;
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
            <ul><li>${this.prerequisites.join('</li><li>')}</li></ul>
        `;
    }

    getAreas() {
        if (!this.cs_areas) {
            return '';
        }
        return '<div><h3>CS Areas</h3>' + 
            this.cs_areas.map(item => {
                return `<span class="tag">${ item }</span>`;
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