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
        this.id = data.id;
        this.dataType = 'cs-area';
        this.ordering = data.menu_order;
        this.name = data.title.rendered;
        this.overview = data.acf.overview || 'TBD';
        this.careers = data.acf.careers;
        this.featuredImageUrl = null;
        this.faculty_objects = null;
        this.faculty = null;
        this.courses = null;

        if (data._embedded && data._embedded["wp:featuredmedia"] && data._embedded["wp:featuredmedia"].length > 0) {
            this.featuredImageUrl = data._embedded["wp:featuredmedia"][0].source_url;
        }
        if (data.acf.associated_faculty) {
            this.faculty_objects = data.acf.associated_faculty.map(item => {
                return {
                    id: item.ID,
                    name: item.post_title
                };
            })
        }

        if (availableCourses) {
            this.courses = availableCourses.filter(course => {
                const area_ids = course.cs_areas.map(area => area.id);
                return area_ids.includes(this.id);
            });
        }
    }

    setPeople(facultyList) {
        if (!facultyList) {return;}
        const faculty_ids = this.faculty_objects.map(f => f.id);
        this.faculty = facultyList.filter(faculty => {
            return faculty_ids.includes(faculty.id);
        })
    }

    getListTemplate() {
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
                ${ this.getHeader() }
                <section class="content-wrapper">
                    <h3>Overview</h3>
                    ${ this.overview }
                    <h3>Careers</h3>
                    ${ this.careers }
                    ${ this.showFaculty() }
                    ${ this.showCourses() }
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
                course.appendToHTMLElement(parent, window.modal)
            });
        }

        parent = el.querySelector('.faculty-list');
        if (parent) {
            parent.innerHTML = '';
            this.faculty.forEach(f => {
                f.appendToHTMLElement(parent, window.modal)
            });
        }
        return el;
    }
    
    showFaculty() {
        if (!this.faculty_objects) {
            return '';
        }

        return `
            <h3>Associated Faculty</h3>
            <ul class="faculty-list">
                ${ this.faculty_objects.map(f => `<li>${f.name}</li>`).join('\n') }
            </ul>
        `;
    }
    
    showCourses() {
        if (!this.courses) {
            return '';
        }
        return `
            <h3>Course Offerings</h3>
            <ul class="course-list">
                ${
                    this.courses.map( 
                        course => course.getTemplateListItem(false)
                    ).join('\n')
                }
            </ul>
        `;
    }
    
    getFeaturedImage() {
        return this.featuredImageUrl ?
            `<img src="${this.featuredImageUrl}" />`
            : '';
    }

    getHeader() {
        return this.featuredImageUrl ?
            `<div class="area-header" style="background-image: url('${this.featuredImageUrl}');">
                <h2>${ this.name }</h2>
            </div>`
            : `<h2 class="area-header">${ this.name }</h2>`;
    }

}