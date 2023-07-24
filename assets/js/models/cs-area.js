export default class Area {
    
    constructor(data) {
        console.log(data);
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

        if (data.acf.course_offerings) {
            this.courses = data.acf.course_offerings.map(item => item.post_title);
        }
    }

    getTemplate(data) {
        console.log(data);
        let html = `
            <h2 class="person-header">${ this.name }</h2>
            ${ this.getFeaturedImage() }
            <h3>Overview</h3>
            ${ this.overview }
            <h3>Careers</h3>
            ${ this.careers }
            ${ this.showFaculty() }
            ${ this.showCourses() }
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
            <ul><li>${this.courses.join('</li><li>')}</li></ul>
        `;
    }
    
    getFeaturedImage() {
        return this.featuredImageUrl ?
            `<img src="${this.featuredImageUrl}" />`
            : '';
    }

}