export default class Project {

    constructor(data, availbleStudents, availablePeople) {
        console.log(data);
        this.id = data.id;
        this.dataType = 'student-project';
        this.name = data.title.rendered;
        // match instructor to our in-house instructor list:
        // this.instructor = this.getInstructor(availablePeople);

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

    getTemplate() {
        return `
        <section class="course">
        <h3 class="title">${this.code}: ${this.title}</h3>
            <p>
                ${this.isClosed ? '<i class="fa-solid fa-circle-xmark"></i> Closed' : '<i class="fa-solid fa-circle-check"></i> Open'} 
                &bull; ${this.crn}
                &bull;  
                ${!this.isClosed ? "Seats Available: " + this.spaceLeft : "Number on Waitlist " + this.numOnWaitlist}
                &bull;
                <strong>${this.meets} ${this.startTime} - ${this.endTime}</strong> &bull; 
                ${ this.location } &bull;
                ${this.creditHours} credit hour(s)
            </p>
            <div class="instructor">${ this.instructorName }</div>
        </section>`
    }

    appendInstructor(parent) {
        const instructorEl = parent.querySelector('.instructor');
        if (this.instructor) {
            instructorEl.innerHTML = `
                <a href="#">${this.instructor.firstName} ${this.instructor.lastName}</a>`;
            
            // Add event handler:
            const a = instructorEl.querySelector('a');
            a.addEventListener('click', (function () {
                window.showLightbox(this.instructor.getTemplate())
            }).bind(this));
        }
    }

    appendTitle(parent) {
        const courseTitleEl = parent.querySelector('.title');
        if (this.course) {
            courseTitleEl.innerHTML = `
                <a href="#">${this.code}</a>: ${this.title}`;
            
            // Add event handler:
            const a = courseTitleEl.querySelector('a');
            a.addEventListener('click', (function () {
                window.showLightbox(this.course.getTemplate())
            }).bind(this));
        }
    }
}