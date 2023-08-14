export default class UncaClass {
    constructor(data, availableCourses, availablePeople) {
        this.code = data.Code;
        this.dataType = 'unca-class';
        this.title = data.Title;
        this.department = data.Department;
        this.spaceLeft = Math.max(data.EnrollmentMax - data.EnrollmentCurrent, 0);
        this.isClosed = this.spaceLeft === 0 ? true : false;
        this.numOnWaitlist = data.WaitlistMax - data.WaitlistAvailable;
        this.startTime = new Date(data.StartTime).toLocaleTimeString([], {timeStyle: 'short'});
        this.endTime = new Date(data.EndTime).toLocaleTimeString([], {timeStyle: 'short'});
        this.meets = data.Days ? data.Days : "";
        this.location = data.Location.FullLocation;
        this.crn = data.CRN;
        this.creditHours = data.Hours;
        this.instructorNames = data.Instructors.map(instructor => instructor.Name);
        this.instructorName = this.instructorNames.length > 0 ? this.instructorNames[0] : 'TBD';
        
        // match class to our in-house course list:
        this.course = this.getCourse(availableCourses);

        // match instructor to our in-house instructor list:
        this.instructor = this.getInstructor(availablePeople);

    }

    getCourse (availableCourses) {
        if (availableCourses) {
            function matchScore(title, tokens) {
                const matches = tokens.filter(token => title.includes(token));
                return matches.length / tokens.length;
            }
            const code = this.code.split('.')[0];
            let title = this.title.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            ['AND ', 'THE ', 'TO ', 'FOR '].forEach(stopword => {
                title = title.replace(stopword, '');
            });
            const tokens = title.split(' ');
            const results = availableCourses.filter(course => {
                const score = matchScore(course.name.toUpperCase(), tokens);
                return course.code == code.toUpperCase() &&
                    score >= 0.5;
            });
            if (results.length > 0) {
                return results[0];
            }
        }
        return null;
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
                window.lightbox.show(this.instructor.getTemplate())
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
                window.lightbox.show(this.course.getTemplate())
            }).bind(this));
        }
    }
}