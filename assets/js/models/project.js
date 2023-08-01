export default class Project {

    constructor(data, availableStudents, availablePeople) {
        console.log(data);
        this.id = data.id;
        this.dataType = 'student-project';
        this.name = data.title.rendered;
        this.description = data.acf.description;
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
        <section class="project">
        <h3 class="title">${this.name}</h3>
        ${this.description}
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