export default class Student {
    
    constructor(data) {
        console.log(data);
        this.id = data.id;
        this.dataType = 'student';
        this.name = data.title.rendered;
        this.bio = data.acf.bio;
        this.github = data.acf.github;
        this.linkedin = data.acf.linked_in;
        this.website = data.acf.website;
        if (data._embedded && data._embedded["wp:featuredmedia"] && data._embedded["wp:featuredmedia"].length > 0) {
            this.featuredImageUrl = data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
        }
    }

    getTemplate() {
        return `
            <h2 class="person-header">${this.name}</h2>
            ${ this.getFeaturedImage() }
            ${this.bio}
            <div style="text-align: center;align-self: stretch;">
                <a href="${this.github}">GitHub</a> &bull;
                <a href="${this.linkedin}">LinkedIn</a> &bull;
                <a href="${this.website}">Website</a>
            </div>
        `;
    }

    getCardTemplate() {
        return `
            <div class="people-card">
                <div>
                    <h2>${this.name}</h2>
                </div>
                
                ${ this.getFeaturedImage() }
            </div>`;
    }

    getFeaturedImage() {
        return this.featuredImageUrl ?
            `<img class="people-thumb" src="${this.featuredImageUrl}" />`
            : '';
    }
}