import Person from './models/person.js';
import Course from './models/course.js';


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
    document.body.style.overflowY = "scroll";
};

const showLightbox = html => {
    if (window.event) {
        window.event.preventDefault();
    }
    const lightboxEl = document.querySelector("#lightbox");
    lightboxEl.querySelector(".content").innerHTML = html;
    lightboxEl.classList.add("show");
    document.body.style.overflowY = "hidden";
    lightboxEl.querySelector("#close").focus();
    lightboxEl.classList.remove("people-detail");
};

window.showLightbox = showLightbox;

export default showLightbox; 
