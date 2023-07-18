import Person from './person.js';
import Area from './cs-area.js';
import Course from './course.js';

window.showArea = async postID => {
    const response = await fetch(`/wp-json/wp/v2/cs-areas/${postID}?_embed=1`);
    const data = await response.json();
    const area = new Area(data);
    showLightbox(area.getTemplate());
}

window.showPerson = async postID => {
    const response = await fetch(`/wp-json/wp/v2/people/${postID}?_embed=1`);
    const data = await response.json();
    const person = new Person(data);
    showLightbox(person.getTemplate());
}

window.showCourse = async postID => {
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
    const lightboxEl = document.querySelector("#lightbox");
    lightboxEl.querySelector(".content").innerHTML = html;
    lightboxEl.classList.add("show");
    document.body.style.overflowY = "hidden";
    lightboxEl.querySelector("#close").focus();
    lightboxEl.classList.remove("people-detail");
};

export default showLightbox; 
