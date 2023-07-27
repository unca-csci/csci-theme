
export default class Degree {
    
    constructor(data, availableGroups) {
        console.log(data);
        this.id = data.id;
        this.name = data.title.rendered;
        this.description = data.acf.description;
        this.groups = [];
        this.courses = [];
        this.isInfo = this.name.toLowerCase().indexOf("information systems") != -1;
        this.isSys = this.name.toLowerCase().indexOf("computer systems") != -1;
        this.isMinor = this.name.toLowerCase().indexOf("minor") != -1;
        if (availableGroups) {
            const ids = data.acf.course_groups.map(g => g.ID);
            this.groups = availableGroups.filter(g => {
                return ids.includes(g.id);
            })
        }

        if (this.groups) {
            this.courses = this.groups
                .map(group => group.courses)
                .reduce((a, b) => a.concat(b));
            console.log(this.courses, this.isInfo, this.isSys, this.isMinor);
        }
    }

    appendToHTMLElement (parent, displayMode) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplate()
        );
        const groupContainer = parent.lastElementChild;

        if (this.groups) {
            this.groups.forEach(((group, idx) => {
                group.appendToHTMLElement(groupContainer, idx+1, displayMode);
            }).bind(this));
        }
    }


    getTemplate() {
        let html = `
            <!-- h1>${ this.name }</h1 -->
            ${ this.description }
            <div class="groups">
                <!-- groups go here -->
            </div>
        `;
        return html;
    }
    
}