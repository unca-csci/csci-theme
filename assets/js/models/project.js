export default class Project {

    constructor(data, availableStudents, availablePeople) {
        console.log(data);
        this.id = data.id;
        this.dataType = 'student-project';
        this.name = data.title.rendered;
        this.description = data.acf.description;
        this.url = data.link;
        this.reportUrl = data.acf.report_link;
        this.codeUrl = data.acf.code_url;
        this.videoUrl = data.acf.video_url;
        this.term = data.acf.term;
        this.teamMemberIds = data.acf.team_members.map(person => person.ID);
        this.advisorIds = data.acf.advisors.map(person => person.ID);
        if (data._embedded && data._embedded["wp:featuredmedia"] && data._embedded["wp:featuredmedia"].length > 0) {
            this.featuredImageUrl = data._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
        }
        // console.log(this.featuredImageUrl)
        if (availableStudents) {
            this.teamMembers = availableStudents.filter(s => this.teamMemberIds.includes(s.id));
        }

        if (availablePeople) {
            this.advisors = availablePeople.filter(a => this.advisorIds.includes(a.id));
        }
    }

    getInstructor(availablePeople) {        
        if (availablePeople) {
            const [lastName, firstName] = this.instructorName.split(', ');
            const results = availablePeople.filter(person => {
                return person.name.toUpperCase().includes(lastName.toUpperCase()) && person.name.toUpperCase().includes(firstName.toUpperCase())
            });
            if (results.length === 1) {
                return results[0];
            }
        }
        return null;
    }

    getMainTemplate() {
        return `
            ${this.description}
        `
    }

    getFeaturedImage () {
        let html = '';
        if (this.featuredImageUrl) {
            html = `
                <img 
                    src="${this.featuredImageUrl}" 
                    alt="Image representing the project" />`;
        }
        return html;
    }
    
    getSideTemplate() {
        return `
            <div class="project-submenu">
                ${this.getFeaturedImage() }
                
                <h3>Student Team</h3>
                <ul class="students">
                    <!-- populated with event handlers later -->
                </ul>
                
                <h3>Project Links</h3>
                <ul class="students">
                    <li><a href="${this.codeUrl}">Code</a></li>
                    <li><a href="${this.reportUrl}">Report</a></li>
                    <li><a href="${this.videoUrl}">Video</a></li>
                </ul>
                
                <h3>Advisors</h3>
                <ul class="advisors">
                    <!-- populated with event handlers later -->
                </ul>
            </div>
        `;
    }

    appendSideTemplate(parent) {
        parent.insertAdjacentHTML('beforeend', this.getSideTemplate());
        
        const studentsEl = parent.querySelector('.students');
        this.addEventHandlers(this.teamMembers, studentsEl); 
        
        const advisorsEl = parent.querySelector('.advisors');
        this.addEventHandlers(this.advisors, advisorsEl); 
    }


    addEventHandlers(people, parent) {
        // add advisors event handler:
        people.forEach(person => {
            parent.insertAdjacentHTML('beforeend', `<li><a href="#">${person.name}</a></li>`);

            // Add event handler:
            const a = parent.lastElementChild.querySelector('a');
            a.addEventListener('click', (function () {
                window.modalManager.showModal(person.getTemplate())
            }).bind(this));
        })
    }

    getCardTemplate() {
        return `
        <section 
            onclick="this.querySelector('a').click()" 
            class="project" 
            style="${ this.featuredImageUrl ? `background-image: url('${this.featuredImageUrl}')` : ''}"
            >
            <div class="overlay-box">
                <h2 class="title"><a href="${this.url}">${this.name}</a></h2>
                <p>${ this.teamMembers.map(student => student.name).join(', ') }</p>
            </div>
        </section>`
    }

    showDetail(e) {
        e.currentTarget.querySelector('a').click();
    }

    appendInstructor(parent) {
        const instructorEl = parent.querySelector('.instructor');
        if (this.instructor) {
            instructorEl.innerHTML = `
                <a href="#">${this.instructor.firstName} ${this.instructor.lastName}</a>`;
            
            // Add event handler:
            const a = instructorEl.querySelector('a');
            a.addEventListener('click', (function () {
                window.modalManager.showModal(this.instructor.getTemplate())
            }).bind(this));
        }
    }

}