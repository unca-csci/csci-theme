import utils from "../utilities.js";

export default class Person {
    static sortFunction(a, b) {
        if (a.ordering < b.ordering) {
            return -1;
        } else if (a.ordering > b.ordering) {
            return 1;
        }
        return 0;
    }
    constructor(data) {
        this.dm = window.dataManager;
        const tokens = data.title.rendered.split(", ");
        this.id = data.id;
        this.dataType = "person";
        this.name = tokens[0];
        this.degree = tokens.length > 1 ? tokens[tokens.length - 1] : "";
        this.firstName = this.name.split(" ")[0];
        this.lastName = this.name.replace(this.firstName, "").trim();
        this.title = data.acf.title;
        this.ordering = data.acf.ordering;
        this.bio = data.acf.bio ? data.acf.bio.replaceAll("\n", "<br>") : null;
        this.education = data.acf.education;
        this.interests = data.acf.interests;
        this.officeHours = data.acf.office_hours;
        // this.cs_areas = this.getCSAreas(data);
        this.website = data.acf.website;
        this.phone = data.acf.phone_number;
        this.email = data.acf.email;
        this.address = data.acf.address;
        this.featuredImageUrl = null;
        if (
            data._embedded &&
            data._embedded["wp:featuredmedia"] &&
            data._embedded["wp:featuredmedia"].length > 0
        ) {
            this.featuredImageUrl =
                data._embedded[
                    "wp:featuredmedia"
                ][0].media_details.sizes.medium.source_url;
        }
        this.cs_area_ids = data.acf.cs_areas
            ? data.acf.cs_areas.map((item) => item.ID)
            : [];
    }

    getTemplateList() {
        return `<li><a href="#">${this.name}</a></li>`;
    }

    getTemplate(showTitle = true) {
        return `
            <section class="content-wrapper">
                ${showTitle ? this.getTitle() : ""}
                ${this.getFeaturedImage()}
                <h3>${this.title}</h3>
                ${this.getContactInfo()}
                ${
                    this.bio
                        ? `<h3>Bio</h3>${this.bio.replaceAll("<br>", "")}`
                        : ""
                }
                ${this.education ? `<h3>Education</h3>${this.education}` : ""}
                ${
                    this.interests
                        ? `<h3>Research & Professional Interests</h3>${this.interests}`
                        : ""
                }
                ${this.getAreas()}
                ${
                    this.website
                        ? `<h3>Website</h3><a href="${this.website}" target="_blank">${this.website}</a>`
                        : ""
                }
            </section>
        `;
    }

    getTemplateElement(showTitle = true) {
        const el = utils.createElementFromHTML(this.getTemplate(showTitle));
        let parent = el.querySelector(".area-tags");
        if (parent) {
            parent.innerHTML = "";
            this.cs_areas = this.dm.csAreas.filter((item) =>
                this.cs_area_ids.includes(item.id)
            );
            this.cs_areas.forEach((area) => {
                area.appendTagToHTMLElement(parent);
            });
        }

        return el;
    }

    getWaves() {
        return `
        <div class="elementor-shape elementor-shape-top" data-negative="false">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <path class="elementor-shape-fill" opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"></path>
                <path class="elementor-shape-fill" opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"></path>
                <path class="elementor-shape-fill" d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"></path>
            </svg>	
        </div>`;
    }

    getCardTemplate() {
        return `
            <div class="people-card">
                <div class="desktop">
                    <div>
                        <h2>${this.name}${
            this.degree ? `, ${this.degree}` : ""
        }</h2>
                        <p class="title">${this.title}</p>
                        ${this.getContactInfo()}
                    </div>
                    
                    ${this.getFeaturedImage()}
                </div>
                <div class="mobile">
                    <div class="content">
                        <h2>${this.name}${
            this.degree ? `, ${this.degree}` : ""
        }</h2>                
                        ${this.getFeaturedImage()}
                        <p class="title">${this.title}</p>
                        ${this.getContactInfo()}
                    </div>
                </div>
                <p>
                    <button class="button dark">More</button>
                </p>
            </div>`;
    }

    getCardTemplateElement() {
        const el = utils.createElementFromHTML(this.getCardTemplate());
        el.querySelectorAll("button").forEach(
            ((btn) => {
                btn.addEventListener("click", this.showModal.bind(this));
            }).bind(this)
        );
        return el;
    }

    appendToHTMLElement(parent) {
        parent.insertAdjacentHTML("beforeend", this.getTemplateList());
        this.addLinkEventHandler(parent.lastElementChild.querySelector("a"));
    }

    showModal(e) {
        window.modalManager.showModal(this.getTemplateElement());
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    addLinkEventHandler(a) {
        a.addEventListener("click", this.showModal.bind(this));
    }

    getTitle() {
        return `<h2 class="person-header">
            ${this.name}${this.degree ? `, ${this.degree}` : ""}
        </h2>`;
    }

    getAreas() {
        console.log(this.cs_area_ids, this.dm.csAreas);
        if (this.cs_area_ids.length === 0 || this.dm.csAreas.length === 0) {
            return "";
        }
        console.log(this.cs_area_ids, this.dm.csAreas);
        return '<h3>CS Areas</h3><div class="area-tags"></div>';
    }

    getFeaturedImage() {
        return this.featuredImageUrl
            ? `<img class="people-thumb" src="${this.featuredImageUrl}" />`
            : "";
    }

    getContactInfo() {
        let html = `<div class="contact-info">`;
        if (this.phone_number) {
            html += `
                <div class="meta">
                    <i class="fa-solid fa-phone"></i>
                    ${this.phone_number}
                </div>`;
        }
        if (this.email) {
            html += `
                <div class="meta">
                    <i class="fa-regular fa-envelope"></i>
                    ${this.email}
                </div>`;
        }
        if (this.address) {
            html += `
                <div class="meta">
                    <i class="fa-solid fa-location-dot"></i>
                    ${this.address}
                </div>`;
        }
        if (this.officeHours) {
            html += `
                <div class="meta">
                    <i class="fa-regular fa-clock"></i>
                    Office Hours: ${this.officeHours}
                </div>`;
        }
        return html + "</div>";
    }
}
