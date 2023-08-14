import Person from './models/person.js';
import Course from './models/course.js';
import CSArea from './models/cs-area.js';


class Lightbox {
    constructor(id, className, zIndex=99999) {
        this.bgId = `${id}-bg`;
        this.id = id;
        this.className = className;
        this.addToDOM();
        this.el = document.getElementById(this.id);
        this.bg = document.getElementById(this.bgId);
        this.bg.style.zIndex = zIndex;
        this.el.style.zIndex = zIndex + 1;
    }

    addToDOM = () => {
        let el = document.getElementById(this.id);
        if (!el) {
            document.body.insertAdjacentHTML('beforeend', `
                <section class="background-sheet" id="${this.bgId}"></section>
                <div id="${this.id}" class="${this.className}">
                    <button class="close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="content"></div>
                </div>
            `);

            // add event handlers:
            document.querySelector(`#${this.id} .close`).addEventListener('click', this.hide.bind(this));
            this.bg = document.getElementById(this.bgId).addEventListener('click', this.hide.bind(this));
        }
    }

    hide (ev) {
        const classList = ev.target.classList;
        let doClose = false;
        classList.forEach(className => {
            if (["fa-times", "close", "close-icon", "show"].includes(className)) {
                doClose = true;
                return;
            }
        })
        if (!doClose) {return};
    
        // hide bg overlay:
        this.bg.classList.remove("show");
        this.bg.setAttribute('aria-hidden', "true");
        
        // hide lightbox:
        this.el.classList.remove("show");
        this.el.setAttribute('aria-hidden', "true");
        
        // cleanup and cursor focus:
        document.body.style.overflowY = "scroll";
        if (window.callingElement) {
            window.callingElement.focus();
        }
    }

    show(html) {
        console.log(this);
        if (window.event) {
            window.event.preventDefault();
            window.callingElement = window.event.target;
        } else {
            window.callingElement = null;
        }
        
        // hack so that first lightbox slides in:
        setTimeout((function() {
            this.bg.setAttribute('aria-hidden', "false");
            this.bg.classList.add("show");
    
            this.el.setAttribute('aria-hidden', "false");
            this.el.classList.add("show");
            this.el.querySelector('.content').innerHTML = html;
    
            document.body.style.overflowY = "hidden";
            
            // cursor focus:
            this.el.querySelector(".close").focus();
        }).bind(this), 5);
    }
    
    async showCSArea (id) {
        if (window.event) {
            window.event.preventDefault();
        }
        const response = await fetch(`/wp-json/wp/v2/cs-areas/${id}?_embed=1`);
        const data = await response.json();
        const csArea = new CSArea(data);
        this.show(csArea.getTemplate());
    }

    async showPerson (postID) {
        if (window.event) {
            window.event.preventDefault();
        }
        const response = await fetch(`/wp-json/wp/v2/people/${postID}?_embed=1`);
        const data = await response.json();
        const person = new Person(data);
        this.show(person.getTemplate());
    }
    
    async showCourse (postID) {
        if (window.event) {
            window.event.preventDefault();
        }
        const response = await fetch(`/wp-json/wp/v2/courses/${postID}?_embed=1`);
        const data = await response.json();
        const course = new Course(data);
        this.show(course.getTemplate());
    }
}

window.lightbox = new Lightbox('lightbox', 'lightbox');
window.modal = new Lightbox('modal', 'lightbox', 100001); 