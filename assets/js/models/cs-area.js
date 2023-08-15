import utils from '../utilities.js';

export default class CSArea {

    static sortFunction (a, b) {
        
        if (a.ordering < b.ordering) {
            return -1;
        } else if (a.ordering > b.ordering) {
            return 1;
        }
        return 0;
    }
    
    constructor(data, availableCourses) {
        this.dm = window.dataManager;
        this.id = data.id;
        this.dataType = 'cs-area';
        this.ordering = data.menu_order;
        this.name = data.title.rendered;
        this.overview = data.acf.overview || 'TBD';
        this.careers = data.acf.careers;
        this.featuredImageUrl = null;
        this.faculty_ids = data.acf.associated_faculty ? data.acf.associated_faculty.map(item => item.ID) : [];
        
        if (data._embedded && data._embedded["wp:featuredmedia"] && data._embedded["wp:featuredmedia"].length > 0) {
            this.featuredImageUrl = data._embedded["wp:featuredmedia"][0].source_url;
        }
    }

    getCourses() {
        this.courses = this.dm.courses.filter(course => {
            return course.cs_area_ids.includes(this.id);
        });
        return this.courses;
    }

    getPeople() {
        this.people = [];
        if (this.dm.people.length === 0 || this.faculty_ids.length === 0) { return; }
        this.people = this.dm.people.filter(person => {
            return this.faculty_ids.includes(person.id);
        })
        return this.people;
    }

    getTagTemplate() {
        return `<a href="#" class="tag">${ this.name }</a>`
    }

    getCardTemplate() {
        let style = '';
        if (this.featuredImageUrl) {
            style = `background-image: url('${ this.featuredImageUrl }');`;
        }
        return `
            <section class="hci" style="${style}">
                <div class="overlay-box">
                    <a href="#"><h2>${this.name}</h2></a>
                </div>
            </section>
        `;
    }

    getTemplate() {
        let html = `
            <div>
                ${ this.getHeaderHTML() }
                <section class="content-wrapper">
                    <h3>Overview</h3>
                    ${ this.overview }
                    <h3>Careers</h3>
                    ${ this.careers }
                    ${ this.getFacultyHTML() }
                    ${ this.getCoursesHTML() }
                </section>
            </div>
        `;
        return html;
    }

    getTemplateElement() {
        const el = utils.createElementFromHTML(this.getTemplate());
        // attach event handlers:
        let parent = el.querySelector('.course-list');
        if (parent) {
            parent.innerHTML = '';
            this.courses.forEach(course => {
                course.appendToHTMLElementListItem(parent)
            });
        }

        parent = el.querySelector('.faculty-list');
        if (parent) {
            parent.innerHTML = '';
            this.people.forEach(f => {
                f.appendToHTMLElement(parent)
            });
        }
        return el;
    }

    appendTagToHTMLElement (parent) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTagTemplate()
        );
        this.addLinkEventHandler(parent.lastElementChild);
    }

    addLinkEventHandler(a) {
        a.addEventListener('click', this.showModal.bind(this));
    }

    showModal(e) {
        window.modalManager.showModal(this.getTemplateElement());
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    
    getFacultyHTML() {
        const people = this.getPeople();
        console.log(people);
        if (people.length === 0) { 
            return ''; 
        }

        return `
            <h3>Associated Faculty</h3>
            <ul class="faculty-list"></ul>
        `;
    }
    
    getCoursesHTML() {
        const courses = this.getCourses();
        console.log(courses);
        if (courses.length === 0) { return ''; }
        return `
            <h3>Course Offerings</h3>
            <ul class="course-list"></ul>
        `;
    }
    
    getFeaturedImage() {
        return this.featuredImageUrl ?
            `<img src="${this.featuredImageUrl}" />`
            : '';
    }

    getHeaderHTML() {
        return this.featuredImageUrl ?
            `<div class="area-header" style="background-image: url('${this.featuredImageUrl}');">
                <h2>${ this.name }</h2>
            </div>`
            : `<h2 class="area-header">${ this.name }</h2>`;
    }

}