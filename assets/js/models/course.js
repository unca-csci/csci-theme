export default class Course {
    
    constructor(data) {
        // console.log(data);
        this.id = data.id;
        this.course_catgory_id = this.getCourseCategoryId(data);
        this.code = data.acf.csci_num;
        try {
            this.department = data.acf.csci_num.split(' ')[0];
        } catch (e) {
            this.department = '';
        }
        this.name = data.acf.title;
        this.description = data.acf.description;
        this.prerequisites = null;
        this.cs_areas = null;
        this.requirements = null;
        if (data.acf.prerequisites) {
            this.prerequisites = data.acf.prerequisites.map(item => item.post_title);
        }
        if (data.acf.cs_areas) {
            this.cs_areas = data.acf.cs_areas.map(item => item.post_title);
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
        return `<li>${ this.code }. ${ this.name }</li>`;
    }


    getCourseCategoryId(data) {
        if (data.acf.course_category) {
            return data.acf.course_category.ID;
        }
        return null;
    };

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
        return '<div>' + 
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