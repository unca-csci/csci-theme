import DataManager from './data-manager.js';


class CourseNavigator {

    async fetchAndDisplay () {
        this.dm = new DataManager();
        await this.dm.initializeData();
        this.displayCourseGroups();
    }

    displayCourseGroups() {
        const parent = document.querySelector('#course-navigator');
        this.dm.groups.forEach(group => {
            group.appendToHTMLElement(parent);
        });
    }

}

const courseNavigator = new CourseNavigator();
courseNavigator.fetchAndDisplay();