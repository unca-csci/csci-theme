import './lightbox.js';
import Course from './models/course.js';
import CSArea from './models/cs-area.js';

class CSAreas {
    courses = { };

    async fetchWordpressCourses () {
        const url = '/wp-json/wp/v2/courses?per_page=100';
        const response = await fetch(url);
        const courseListWP = await response.json();
        return courseListWP
            .map(courseWP => new Course(courseWP))
            .sort(Course.courseSortFunction);
    }

    async fetchWordpressAreas () {
        // Use _embed url param to get featured media:
        // https://dalenguyen.medium.com/how-to-get-featured-image-from-wordpress-rest-api-5e023b9896c6
        const url = '/wp-json/wp/v2/cs-areas?_embed';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchAndDisplay () {
        this.courses = await this.fetchWordpressCourses();
        const csAreasWP = await this.fetchWordpressAreas();
        this.csAreas = csAreasWP.map(csAreaWP => new CSArea(csAreaWP, this.courses));

        this.displayCSAreas();
    }

    displayCSAreas() {
        const parent = document.querySelector('#cs-areas');
        this.csAreas.forEach((function(area) {
            parent.insertAdjacentHTML(
                'beforeend', area.getListTemplate()
            )
            parent.lastElementChild.addEventListener('click', (function () {
                window.lightboxShowArea(area.getTemplate())
            }).bind(this));
        }).bind(this));
    }

}

const csAreas = new CSAreas();
csAreas.fetchAndDisplay();