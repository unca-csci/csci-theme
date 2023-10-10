
import Course from './models/course.js';
import UncaClass from './models/unca-class.js';
import CourseGroup from './models/course-group.js';
import CSArea from './models/cs-area.js';
import Degree from './models/degree.js';
import Person from './models/person.js';
import Student from './models/student.js';
import Project from './models/project.js';

export default class DataManager {

    constructor () {
        this.courses = [];
        this.groups = [];
        this.csAreas = [];
        this.degrees = [];
        this.students = [];
        this.projects = [];
    }

    async fetchWordpressCourses () {
        const url = '/wp-json/wp/v2/courses?per_page=100';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchUNCAClassSchedule(term) {
        const baseScheduleUrl = 'https://meteor.unca.edu/registrar/class-schedules/api/v1/courses/';
        const url = baseScheduleUrl + term;
        return await fetch(url).then(response => response.json());
    }

    async fetchWordpressCourseGroups () {
        const url = '/wp-json/wp/v2/course-groupings?per_page=100';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchWordpressPeople () {
        const url = '/wp-json/wp/v2/people?per_page=100&_embed';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchWordpressStudents () {
        const url = '/wp-json/wp/v2/students?per_page=100&_embed';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchWordpressProjects () {
        const url = '/wp-json/wp/v2/student-projects?per_page=100&_embed';
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
        const url = '/wp-json/wp/v2/cs-areas?per_page=100&_embed';
        const response = await fetch(url);
        return await response.json();
    }

    async getCourses () {
        const wpCourses = await this.fetchWordpressCourses();
        
        // set up data structure:
        const courses = wpCourses
            .filter(data => !data.acf.pick_one)
            .map(courseWP => new Course(courseWP))
            .sort(Course.courseSortFunction);
        return courses;
    }

    async getClasses (term) {
        const uncaClasses = await this.fetchUNCAClassSchedule(term);
        return uncaClasses
            .filter(uncaClass => uncaClass.Department == "CSCI")
            .map(uncaClass => new UncaClass(
                uncaClass, 
                this.courses, 
                this.people
            ));
    }

    async getGroups (availableCourses) {
        const wpGroups = await this.fetchWordpressCourseGroups();
        return wpGroups.map(wpGroup => new CourseGroup(wpGroup, availableCourses));
    }

    async getPeople() {
        const people = await this.fetchWordpressPeople();
        return people.map(person => new Person(person)).sort(Person.sortFunction);
    }

    async getStudents() {
        const students = await this.fetchWordpressStudents();
        return students.map(student => new Student(student));
    }

    async getProjects() {
        const projects = await this.fetchWordpressProjects();
        return projects.map(project => new Project(project, this.students, this.people));
    }

    async getCSAreas () {
        const csAreasWP = await this.fetchWordpressAreas();
        console.log(csAreasWP);
        return csAreasWP
            .map(csAreaWP => new CSArea(csAreaWP))
            .sort(CSArea.sortFunction);
    }

    async getDegrees(availableGroups) {
        const degreesWP = await this.fetchWordpressDegrees();
        return degreesWP.map(degreeWP => new Degree(degreeWP, availableGroups));
    }

    async initializeDegreesCoursesData () {
        this.courses = await this.getCourses();
        this.groups = await this.getGroups();
        this.groups.forEach(group => group.loadCourses(this.courses, this.groups));

        // set up course dependency map
        this.courses.forEach(course => course.loadPrerequisites());
        this.degrees = await this.getDegrees(this.groups);
        this.courses.forEach(course => course.loadRequirements());
        this.people = await this.getPeople();
        this.csAreas = await this.getCSAreas();
    }

    async initializeCourseScheduleData (term) {
        this.courses = await this.getCourses();
        this.people = await this.getPeople();
        this.classes = await this.getClasses(term);

        // load this data after the page has loaded (speeds things up):
        (async function () {
            this.groups = await this.getGroups();
            this.courses.forEach(course => course.loadPrerequisites());
            this.groups.forEach(group => group.loadCourses(this.courses, this.groups));
            this.degrees = await this.getDegrees(this.groups);
            this.courses.forEach(course => course.loadRequirements());
            this.csAreas = await this.getCSAreas();
        }).bind(this)();
    }

    async updateClassesByTerm(term) {
        this.classes = await this.getClasses(term);
    }

    async initializeCSAreas () {
        this.courses = await this.getCourses();
        this.people = await this.getPeople();
        this.csAreas = await this.getCSAreas();
        
        // load this data after the page has loaded (speeds things up):
        (async function () {
            this.groups = await this.getGroups();
            this.courses.forEach(course => course.loadPrerequisites());
            this.groups.forEach(group => group.loadCourses(this.courses, this.groups));
        }).bind(this)();
    }

    async initializePeople () {
        this.people = await this.getPeople();
        this.csAreas = await this.getCSAreas();

        // load this data after the page has loaded (speeds things up):
        (async function () {
            this.courses = await this.getCourses();
            this.groups = await this.getGroups();
            this.courses.forEach(course => course.loadPrerequisites());
            this.groups.forEach(group => group.loadCourses(this.courses, this.groups));
        }).bind(this)();
    }

    async initializeStudentProjects () {
        this.students = await this.getStudents();
        this.people = await this.getPeople();
        this.projects = await this.getProjects();

        (async function () {
            this.courses = await this.getCourses();
            this.groups = await this.getGroups();
            this.courses.forEach(course => course.loadPrerequisites());
            this.groups.forEach(group => group.loadCourses(this.courses, this.groups));
            this.csAreas = await this.getCSAreas();
        }).bind(this)();
    }

    async initializeAllData () {
        this.courses = await this.getCourses();
        this.groups = await this.getGroups();
        this.people = await this.getPeople();
        this.groups.forEach(group => group.loadCourses(this.courses, this.groups));
        this.courses.forEach(course => course.loadPrerequisites());
        this.csAreas = await this.getCSAreas();
        this.degrees = await this.getDegrees(this.groups);
        this.courses.forEach(course => course.loadRequirements());
    }
}