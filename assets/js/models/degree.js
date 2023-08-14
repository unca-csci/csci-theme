
export default class Degree {
    
    constructor(data, availableGroups) {
        this.id = data.id;
        this.dataType = 'degree';
        this.name = data.title.rendered;
        this.description = data.acf.description;
        this.groups = [];
        this.courses = [];
        this.isInfo = this.name.toLowerCase().indexOf("information systems") != -1;
        this.isSys = this.name.toLowerCase().indexOf("computer systems") != -1;
        this.isMinor = this.name.toLowerCase().indexOf("minor") != -1;
        
        // need a list of groups  to set the groups and courses member variables:
        if (availableGroups) {
            const ids = data.acf.course_groups.map(g => g.ID);
            const getGroupById = id => {
                return availableGroups.filter(g => {
                    return g.id == id;
                })[0];
            }
            this.groups = ids.map(id => getGroupById(id));
            this.courses = this.groups
                .map(group => group.courses)
                .reduce((a, b) => a.concat(b));
        }

    }

    appendToHTMLElement (parent, displayMode, isStandalone=false) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplate(isStandalone)
        );
        const groupContainer = parent.lastElementChild;

        if (this.groups) {
            this.groups.forEach(((group, idx) => {
                group.appendToHTMLElement(groupContainer, idx+1, displayMode);
            }).bind(this));
        }
    }

    getTemplate(includeHeader=false) {
        let html = `
            ${ includeHeader ? `<h1>${ this.name }</h1>` : ''}
            ${ this.description }
            <div class="groups">
                <!-- groups go here -->
            </div>
        `;
        return html;
    }
    
}