export default class CSArea {
    
    constructor(data, availableCourses) {
        this.id = data.id;
        this.dataType = 'cs-area';
        this.name = data.title.rendered;
        this.overview = data.acf.overview || 'TBD';
        this.careers = data.acf.careers;
        this.featuredImageUrl = null;
        this.faculty = null;
        this.courses = null;

        if (data._embedded && data._embedded["wp:featuredmedia"] && data._embedded["wp:featuredmedia"].length > 0) {
            this.featuredImageUrl = data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
        }
        if (data.acf.associated_faculty) {
            this.faculty = data.acf.associated_faculty.map(item => item.post_title)
        }

        if (availableCourses) {
            this.courses = availableCourses.filter(course => {
                const area_ids = course.cs_areas.map(area => area.id);
                return area_ids.includes(this.id);
            });
        }
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
            <h2 class="person-header">${ this.name }</h2>
            ${ this.getFeaturedImage() }
            <h3>Overview</h3>
            ${ this.overview }
            ${ this.showFaculty() }
            ${ this.showCourses() }
            <h3>Careers</h3>
            ${ this.careers }
        `;
        return html;
    }
    
    showFaculty() {
        if (!this.faculty) {
            return '';
        }

        return `
            <h3>Associated Faculty</h3>
            <ul><li>${this.faculty.join('</li><li>')}</li></ul>
        `;
    }
    
    showCourses() {
        if (!this.courses) {
            return '';
        }
        return `
            <h3>Course Offerings</h3>
            <ul>
                ${
                    this.courses.map( course => {
                        return `<li>${course.code}. ${course.name}</li>`
                    }).join('\n')
                }
            </ul>
        `;
    }
    
    getFeaturedImage() {
        return this.featuredImageUrl ?
            `<img src="${this.featuredImageUrl}" />`
            : '';
    }

}