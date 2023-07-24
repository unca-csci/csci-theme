/**
 * Note: using window.____ global variables b/c this website
 * dynamically injects new JavaScript scripts into the DOM
 * Each time this script is run, it removes and re-initializes
 * the class and corresponding object.
 */

import './lightbox.js';
import Course from './models/course.js';
import CourseCategory from './models/course-category.js';

window.CourseNavigator = class {
    courses = { };

    async fetchWordpressCourses () {
        const url = '/wp-json/wp/v2/courses?per_page=100';
        const response = await fetch(url);
        const courseListWP = await response.json();
        return courseListWP
            .map(courseWP => new Course(courseWP))
            .sort(CourseCategory.courseSortFunction);
    }

    async fetchWordpressCourseCategories () {
        const url = '/wp-json/wp/v2/course-groupings?course-groupings';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchAndDisplay () {
        this.courses = await this.fetchWordpressCourses();
        const categoriesWP = await this.fetchWordpressCourseCategories();
        this.courseCategories = categoriesWP.map(categoryWP => new CourseCategory(categoryWP, this.courses));

        this.displayCourseCategories();
    }

    displayCourseCategories() {
        document.querySelector('#course-navigator').innerHTML = 
            this.courseCategories
                .map(cat => cat.getTemplate())
                .join('\n');
    }

    toJSON() {
        console.log(JSON.stringify(this.courses));
    }

}

window.courseNavigator = new CourseNavigator();
courseNavigator.fetchAndDisplay();