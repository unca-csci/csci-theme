
import Course from './models/course.js';
import CourseGroup from './models/course-group.js';
import CSArea from './models/cs-area.js';

export default class DataManager {

    async fetchWordpressCourses () {
        const url = '/wp-json/wp/v2/courses?per_page=100';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchWordpressCourseGroups () {
        const url = '/wp-json/wp/v2/course-groupings?course-groupings';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchWordpressPeople () {
        const url = '/wp-json/wp/v2/people?per_page=100';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchWordpressAreas () {
        // Use _embed url param to get featured media:
        // https://dalenguyen.medium.com/how-to-get-featured-image-from-wordpress-rest-api-5e023b9896c6
        const url = '/wp-json/wp/v2/cs-areas?_embed';
        const response = await fetch(url);
        return await response.json();
    }

    async getCourses () {
        const wpCourses = await this.fetchWordpressCourses();
        
        // set up data structure:
        const courses = wpCourses
            .map(courseWP => new Course(courseWP))
            .sort(Course.courseSortFunction);

        // set up course dependency map
        courses.forEach(course => course.loadRelationships(courses));
        return courses;
    }

    async getGroups (availableCourses) {
        const wpGroups = await this.fetchWordpressCourseGroups();
        return wpGroups.map(wpGroup => new CourseGroup(wpGroup, availableCourses));
    }

    async getCSAreas (availableCourses) {
        const csAreasWP = await this.fetchWordpressAreas();
        return csAreasWP.map(csAreaWP => new CSArea(csAreaWP, availableCourses));
    }

    async initializeData () {
        this.courses = await this.getCourses();
        this.groups = await this.getGroups(this.courses);
        this.csAreas = await this.getCSAreas(this.courses);
        //const wpPeople = await this.fetchWordpressPeople();
        //const wpAreas = await this.fetchWordpressAreas();
        console.log(this.csAreas);

    }
}