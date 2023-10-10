import utils from '../utilities.js';

export default class Person {
    static sortFunction (a, b) {
        if (a.ordering < b.ordering) {
            return -1;
        } else if (a.ordering > b.ordering) {
            return 1;
        }
        return 0;
    }
    constructor(data) {
        this.dm = window.dataManager;
        const tokens = data.title.rendered.split(', ');
        this.id = data.id;
        this.dataType = 'person';
        this.name = tokens[0];
        this.degree = tokens.length > 1 ? tokens[tokens.length -1] : '';
        this.firstName = this.name.split(' ')[0];
        this.lastName = this.name.replace(this.firstName, '').trim();
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
        if (data._embedded && data._embedded["wp:featuredmedia"] && data._embedded["wp:featuredmedia"].length > 0) {
            this.featuredImageUrl = data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
        }
        this.cs_area_ids = data.acf.cs_areas ? data.acf.cs_areas.map(item => item.ID) : [];
    }

    getTemplateList() {
        return `<li><a href="#">${this.name}</a></li>`;
    }

    getTemplate(showTitle=true) {
        return `
            <section class="content-wrapper">
                ${ showTitle ? this.getTitle() : '' }
                ${ this.getFeaturedImage() }
                <h3>${this.title}</h3>
                ${ this.getContactInfo() }
                ${this.bio ? `<h3>Bio</h3>${this.bio.replaceAll("<br>","")}` : "" }
                ${this.education ? `<h3>Education</h3>${this.education}` : "" }
                ${this.interests ? `<h3>Research & Professional Interests</h3>${this.interests}` : "" }
                ${ this.getAreas() }
                ${this.website ? `<h3>Website</h3><a href="${this.website}" target="_blank">${this.website}</a>` : "" }
            </section>
        `;
    }

    getTemplateElement(showTitle=true) {
        const el = utils.createElementFromHTML(this.getTemplate(showTitle));
        let parent = el.querySelector('.area-tags');
        if (parent) {
            parent.innerHTML = '';
            this.cs_areas = this.dm.csAreas.filter(item => this.cs_area_ids.includes(item.id));
            this.cs_areas.forEach(area => {
                area.appendTagToHTMLElement(parent)
            });
        }

        return el;
    }

    getCardTemplate() {
        return `
            <div class="people-card">
                <div class="desktop">
                    <div>
                        <h2>${this.name}${this.degree ? `, ${ this.degree }` : ''}</h2>
                        <p class="title">${this.title}</p>
                        ${ this.getContactInfo() }
                    </div>
                    
                    ${ this.getFeaturedImage() }
                </div>
                <div class="mobile">
                    <div class="content">
                        <h2>${this.name}${this.degree ? `, ${ this.degree }` : ''}</h2>                
                        ${ this.getFeaturedImage() }
                        <p class="title">${this.title}</p>
                        ${ this.getContactInfo() }
                    </div>
                </div>
                <p>
                    <button class="button dark">More</button>
                </p>
            </div>`;
    }

    getCardTemplateElement() {
        const el = utils.createElementFromHTML(this.getCardTemplate());
        el.querySelectorAll('button').forEach((btn => {
            btn.addEventListener('click', this.showModal.bind(this));
        }).bind(this));
        return el;
    }

    appendToHTMLElement(parent) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplateList()
        );
        this.addLinkEventHandler(parent.lastElementChild.querySelector('a'));
    }

    showModal(e) {
        window.modalManager.showModal(this.getTemplateElement());
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    addLinkEventHandler(a) {
        a.addEventListener('click', this.showModal.bind(this));
    }

    getTitle() {
        return `<h2 class="person-header">
            ${this.name}${this.degree ? `, ${ this.degree }` : ''}
        </h2>`      
    }

    getAreas() {
        console.log(this.cs_area_ids, this.dm.csAreas);
        if (this.cs_area_ids.length === 0 || this.dm.csAreas.length === 0) {
            return '';
        }
        console.log(this.cs_area_ids, this.dm.csAreas);
        return '<h3>CS Areas</h3><div class="area-tags"></div>';
    }

    getFeaturedImage() {
        return this.featuredImageUrl ?
            `<img class="people-thumb" src="${this.featuredImageUrl}" />`
            : '';
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
                    Office Hours: ${ this.officeHours }
                </div>`;
        }
        return html + "</div>";
    }
}