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
    const lightboxEl = document.querySelector("#lightbox");
    lightboxEl.classList.remove("show");
    lightboxEl.setAttribute('aria-hidden', "true");
    document.body.style.overflowY = "scroll";
    if (window.callingElement) {
        console.log('calling element:', window.callingElement);
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
    const lightboxEl = getLightboxContainer();
    
    // hack so that first lightbox slides in:
    setTimeout(function() {
        lightboxEl.setAttribute('aria-hidden', "false");
        lightboxEl.querySelector(".content").innerHTML = html;
        lightboxEl.classList.add("show");
        document.body.style.overflowY = "hidden";
        lightboxEl.querySelector("#close").focus();
        lightboxEl.classList.remove("people-detail");
    }, 5);
    
};

const getLightboxContainer = () => {
    let lightboxEl = document.querySelector("#lightbox");
    if (!lightboxEl) {
        document.body.insertAdjacentHTML('beforeend', `
            <section class="" id="lightbox" onclick="hideLightbox(event)">
                <button id="close" class="close" onclick="hideLightbox(event)">
                    <i id="close-icon" class="fas fa-times"></i>
                </button>
                <div class="content"></div>
            </section>
        `);
        lightboxEl = document.body.lastElementChild;
    }
    return lightboxEl;
}

window.showLightbox = showLightbox;

export default showLightbox; 
