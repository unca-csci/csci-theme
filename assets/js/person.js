export default class Person {
    
    constructor(data) {
        // this.data = data;
        // console.log(data);
        this.name = data.title.rendered;
        this.title = data.acf.title;
        this.bio = data.acf.bio ? data.acf.bio.replaceAll("\n", "<br>") : null;
        this.education = data.acf.education;
        this.interests = data.acf.interests;
        this.website = data.acf.website;
        this.phone = data.acf.phone_number;
        this.email = data.acf.email;
        this.address = data.acf.address;
        this.featuredImageUrl = null;
        if (data._embedded && data._embedded["wp:featuredmedia"] && data._embedded["wp:featuredmedia"].length > 0) {
            this.featuredImageUrl = data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
        }
    }

    getTemplate() {
        return `
            <h2 class="person-header">${this.name}</h2>
            ${ this.getFeaturedImage() }
            <h3>${this.title}</h3>
            ${ this.getContactInfo() }
            ${this.bio ? `<h3>Bio</h3>${this.bio.replaceAll("\n","<br>")}` : "" }
            ${this.education ? `<h3>Education</h3>${this.education}` : "" }
            ${this.interests ? `<h3>Research & Professional Interests</h3>${this.interests}` : "" }
            ${this.website ? `<h3>Website</h3><a href="${this.website}" target="_blank">${this.website}</a>` : "" }
        `;
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
        return html + "</div>";
    }
}