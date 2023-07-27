
import Course from './models/course.js';
import CourseGroup from './models/course-group.js';
import CSArea from './models/cs-area.js';
import Degree from './models/degree.js';

export default class DataManager {

    constructor () {
        this.courses = [];
        this.groups = [];
        this.csAreas = [];
        this.degrees = [];
    }

    async fetchWordpressCourses () {
        const url = '/wp-json/wp/v2/courses?per_page=100';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchWordpressCourseGroups () {
        const url = '/wp-json/wp/v2/course-groupings?per_page=100';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchWordpressPeople () {
        const url = '/wp-json/wp/v2/people?per_page=100';
        const response = await fetch(url);
        return await response.json();
    }
    
    async fetchWordpressDegrees () {
        const url = '/wp-json/wp/v2/degrees';
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
            .map(courseWP => new Course(courseWP));

        // set up course dependency map
        courses.forEach(course => course.loadRelationships(courses));

        courses.sort(Course.courseSortFunction);
        return courses;
    }

    async getGroups (availableCourses) {
        const wpGroups = await this.fetchWordpressCourseGroups();
        console.log(wpGroups);
        return wpGroups.map(wpGroup => new CourseGroup(wpGroup, availableCourses));
    }

    async getCSAreas (availableCourses) {
        const csAreasWP = await this.fetchWordpressAreas();
        return csAreasWP.map(csAreaWP => new CSArea(csAreaWP, availableCourses));
    }

    async getDegrees(availableGroups) {
        const degreesWP = await this.fetchWordpressDegrees();
        return degreesWP.map(degreeWP => new Degree(degreeWP, availableGroups));
    }

    async initializeData () {
        this.courses = await this.getCourses();
        this.groups = await this.getGroups(this.courses);
        this.csAreas = await this.getCSAreas(this.courses);
        this.degrees = await this.getDegrees(this.groups);
        this.courses.forEach(course => course.setRequirements(this.degrees));
        //const wpPeople = await this.fetchWordpressPeople();
        //const wpAreas = await this.fetchWordpressAreas();
        console.log(this.degrees);

    }
}