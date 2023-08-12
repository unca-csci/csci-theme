import Person from './models/person.js';
import Course from './models/course.js';

window.callingElement;
window.showPerson = async postID => {
    if (window.event) {
        window.event.preventDefault();
    }
    const response = await fetch(`/wp-json/wp/v2/people/${postID}?_embed=1`);
    const data = await response.json();
    const person = new Person(data);
    showLightbox(person.getTemplate());
}

window.showCourse = async postID => {
    if (window.event) {
        window.event.preventDefault();
    }
    const response = await fetch(`/wp-json/wp/v2/courses/${postID}?_embed=1`);
    const data = await response.json();
    const course = new Course(data);
    showLightbox(course.getTemplate());
}


window.hideLightbox = ev => {
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
    const lightboxBg = document.querySelector("#lightbox-bg");
    lightboxBg.classList.remove("show");
    lightboxBg.setAttribute('aria-hidden', "true");
    
    // hide lightbox:
    const lightbox = document.querySelector('#lightbox');
    lightbox.classList.remove("show");
    lightbox.setAttribute('aria-hidden', "true");
    
    // cleanup and cursor focus:
    document.body.style.overflowY = "scroll";
    if (window.callingElement) {
        window.callingElement.focus();
    }
};

const showLightbox = html => {
    if (window.event) {
        window.event.preventDefault();
        window.callingElement = window.event.target;
    } else {
        window.callingElement = null;
    }
    addLightboxContainer();
    
    // hack so that first lightbox slides in:
    setTimeout(function() {
        const lightboxBg = document.querySelector("#lightbox-bg");
        lightboxBg.setAttribute('aria-hidden', "false");
        lightboxBg.classList.add("show");

        const lightbox = document.querySelector('#lightbox');
        lightbox.setAttribute('aria-hidden', "false");
        lightbox.querySelector('.content').innerHTML = html;
        lightbox.classList.add("show");

        document.body.style.overflowY = "hidden";
        
        // cursor focus:
        lightbox.querySelector("#close").focus();
    }, 5);
    
};

const addLightboxContainer = () => {
    let lightboxEl = document.querySelector("#lightbox");
    if (!lightboxEl) {
        document.body.insertAdjacentHTML('beforeend', `
            <section class="" id="lightbox-bg" onclick="hideLightbox(event)"></section>
            <div id="lightbox">
                <button id="close" class="close" onclick="hideLightbox(event)">
                    <i id="close-icon" class="fas fa-times"></i>
                </button>
                <div class="content"></div>
            </div>
        `);
    }
}

window.showLightbox = showLightbox;

export default showLightbox; 
