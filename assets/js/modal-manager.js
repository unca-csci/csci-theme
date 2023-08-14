import Person from './models/person.js';
import Course from './models/course.js';
import CSArea from './models/cs-area.js';
import Modal from './modal.js';

class ModalManager {
    constructor() {
        this.zIndex = 999999;
        this.modals = {}
    }

    showModal(htmlOrElement) {
        const modalId = this.generateId();
        const modal = new Modal(modalId, 'lightbox', this.zIndex);
        this.modals[modalId] = modal;
        this.zIndex += 2;
        modal.show(htmlOrElement);
    }

    hideModal(id) {
        this.modals[id].destroy(ev);
        delete this.modals[id];
    }

    remove(id) {
        delete this.modals[id];
    }

    generateId(numChars=10) {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < numChars; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    async showCSArea (id) {
        if (window.event) {
            window.event.preventDefault();
        }
        const response = await fetch(`/wp-json/wp/v2/cs-areas/${id}?_embed=1`);
        const data = await response.json();
        const csArea = new CSArea(data);
        this.showModal(csArea.getTemplate());
    }

    async showPerson (postID) {
        if (window.event) {
            window.event.preventDefault();
        }
        const response = await fetch(`/wp-json/wp/v2/people/${postID}?_embed=1`);
        const data = await response.json();
        const person = new Person(data);
        this.showModal(person.getTemplate());
    }
    
    async showCourse (postID) {
        if (window.event) {
            window.event.preventDefault();
        }
        const response = await fetch(`/wp-json/wp/v2/courses/${postID}?_embed=1`);
        const data = await response.json();
        const course = new Course(data);
        this.showModal(course.getTemplate());
    }
}

window.modalManager = new ModalManager();