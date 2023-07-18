/**
 * Note: using window.____ global variables b/c this website
 * dynamically injects new JavaScript scripts into the DOM
 * Each time this script is run, it removes and re-initializes
 * the class and corresponding object.
 */

import './lightbox.js';

window.CourseBrowser = class {
    courses = { };

    constructor () {
        document.querySelector('#term').addEventListener('change', this.fetchAndDisplay.bind(this));
    }

    async fetchWordpressCourses () {
        const url = '/wp-json/wp/v2/courses?per_page=100';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchWordpressPeople () {
        const url = '/wp-json/wp/v2/people?per_page=100';
        const response = await fetch(url);
        return await response.json();
    }

    async fetchCourses () {
        const baseScheduleUrl = 'https://meteor.unca.edu/registrar/class-schedules/api/v1/courses/';
        document.querySelector('#course-list').innerHTML = "Searching...";
        const termUrl = document.querySelector('#term').value;
        const url = baseScheduleUrl + termUrl;
        return await fetch(url).then(response => response.json());
    }

    async fetchAndDisplay () {
        this.coursesWordpress = await this.fetchWordpressCourses();
        this.peopleWordpress = await this.fetchWordpressPeople();
        this.courses = await this.fetchCourses();
        this.displayResults(this.courses);

        console.log(this.coursesWordpress);
        console.log(this.peopleWordpress);
    }


    getCourseId(course) {

        function matchScore(title, tokens) {
            const matches = tokens.filter(token => title.includes(token));
            return matches.length / tokens.length;
        }
        const code = course.Code.split('.')[0];
        const title = course.Title.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const tokens = title.split(' ');
        const results = this.coursesWordpress.filter(courseWP => {
            const currentCode = courseWP.title.rendered.toUpperCase();
            const currentTitle = courseWP.acf.title.toUpperCase();
            const score = matchScore(currentTitle, tokens);
            return currentCode.includes(code.toUpperCase()) &&
                score > 0.5;
        });
        console.log(results);
        if (results.length > 0) {
            return results[0].id;
        }
        return null;
    }

    getInstructorId(name) {
        const [lastName, firstName] = name.split(', ');
        console.log(lastName, firstName);
        console.log(name);
        const results = this.peopleWordpress.filter(person => {
            console.log(person);
            const title = person.title.rendered.toUpperCase();
            return title.includes(lastName.toUpperCase()) && title.includes(firstName.toUpperCase())
        });
        console.log(results);
        if (results.length === 1) {
            return results[0].id;
        }
        return null;
    }


    async displayResults(courseList) {
        console.log('displaying results!');
        document.querySelector('#course-list').innerHTML = "";
        // access the #results section and put the course title into it. 
        let termUrl;
        try {
            termUrl = document.querySelector('#term').value;
        } catch(e) {
            console.log('slide changed');
            return;
        }
                
        for (let i = 0; i < courseList.length; i++) {
            const course = courseList[i];
            if (course.Department == "CSCI") {
                this.displayCourse(course);
            }
        }
        // this.toJSON();
    }

    addToInventory(courseData) {
        const code = courseData.Code.split(".")[0];
        this.courses[code] = {
            code: code,
            title: courseData.Title,
            description: courseData.Description,
            credit_hours: courseData.Hours,
            level: courseData.Code[5] + "00"
        }
    }

    toJSON() {
        console.log(JSON.stringify(this.courses));
    }

    getTitle(course) {
        const postId = this.getCourseId(course);
        if (postId) {
            return `
                <h3>
                    <a href="#" class="link" onclick="showCourse(${postId});return false;">${course.Code}</a> ${course.Title}
                </h3>`;
        }
        return `<h3>${course.Code}: ${course.Title}</h3>`;
    }

    getInstructor(course) {
        let instructor = 'Unknown';
        let postId = null;
        if (course.Instructors.length > 0) {
            instructor = course.Instructors[0].Name;
            postId = this.getInstructorId(instructor);
        }
        
        if (postId) {
            return `
                <a href="#" class="link" onclick="showPerson(${postId});return false;">${instructor}</a>`;
        }
        return `<strong>${instructor}</strong>`;

    }

    displayCourse(course) {
        // console.log(course);
        // don't access the first instructor if no instructors are present:
        let instructor = 'Unknown';
        if (course.Instructors.length > 0) {
            instructor = course.Instructors[0].Name;
        }
        const spaceLeft = Math.max(course.EnrollmentMax - course.EnrollmentCurrent, 0);
        const closed = spaceLeft === 0 ? true : false;
        const numOnWaitlist = course.WaitlistMax - course.WaitlistAvailable;
        const startTime = new Date(course.StartTime).toLocaleTimeString([], {timeStyle: 'short'});
        const endTime = new Date(course.EndTime).toLocaleTimeString([], {timeStyle: 'short'});
        const meets = course.Days ? course.Days : "";
        const location = course.Location.FullLocation ? course.Location.FullLocation + " &bull;" : "";
        const template = `
            <section class="course">
                ${ this.getTitle(course) }
                <p>
                    ${closed ? '<i class="fa-solid fa-circle-xmark"></i> Closed' : '<i class="fa-solid fa-circle-check"></i> Open'} 
                    &bull; ${course.CRN}
                    &bull;  
                    ${!closed ? "Seats Available: " + spaceLeft : "Number on Waitlist " + numOnWaitlist}
                    &bull;
                    <strong>${meets} ${startTime} - ${endTime}</strong> &bull; 
                    ${ location }
                    ${course.Hours} credit hour(s)
                </p>
                <p>${ this.getInstructor(course) }</p>
            </section>`;
        try {
            document.querySelector('#course-list').insertAdjacentHTML('beforeend', template);
        } catch(e) {
            console.log(e);
        }
    }

}

window.browser = new CourseBrowser();
browser.fetchAndDisplay();