import DataManager from './data-manager.js';
import utils from './utilities.js';

export default class ClassSchedule {
    
    constructor () {
        document.querySelector('#unca-classes').innerHTML = this.getInterfaceHTML();
        utils.showSpinner(document.querySelector('#course-list'), 'Loading the university course catalog...');
        document.querySelector('#term').addEventListener('change', this.showNewTerm.bind(this));
        this.dm = new DataManager();
    }

    getInterfaceHTML() {
        return `
        <select id="term">
            <option value="2023/fall/">Fall 2023</option>
            <option value="2023/spring/">Spring 2023</option>
            <option value="2022/fall/">Fall 2022</option>
            <option value="2022/summer/">Summer 2022</option>
            <option value="2022/spring/">Spring 2022</option>
            <option value="2021/fall/">Fall 2021</option>
            <option value="2021/summer/">Summer 2021</option>
            <option value="2021/spring/">Spring 2021</option>
        </select>
        <div id="course-list"></div> 
        `;
    }


    async fetchAndDisplay () {
        const term = document.querySelector('#term').value;
        await this.dm.initializeCourseScheduleData(term);
        const parent = document.querySelector('#course-list');
        this.displayClasses(parent);
    }

    displayClasses(parent) {
        parent.innerHTML = '';
        this.dm.classes.forEach(uncaClass => {
            parent.insertAdjacentHTML('beforeend', uncaClass.getTemplate());
            const classEl = parent.lastElementChild;
            uncaClass.appendTitle(classEl);
            uncaClass.appendInstructor(classEl);
        });
    }

    async showNewTerm() {
        const parent = document.querySelector('#course-list');
        utils.showSpinner(parent, 'Loading the university course catalog...');
        
        const term = document.querySelector('#term').value;
        await this.dm.updateClassesByTerm(term);
        this.displayClasses(parent);
    }

}

const classSchedule = new ClassSchedule();
classSchedule.fetchAndDisplay();