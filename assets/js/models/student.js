export default class Student {
    
    constructor(data) {

        this.id = data.id;
        this.dataType = 'student';
        this.name = data.title.rendered;
        if (data._embedded && data._embedded["wp:featuredmedia"] && data._embedded["wp:featuredmedia"].length > 0) {
            this.featuredImageUrl = data._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
        }
    }

    getTemplate() {
        return `
            <h2 class="person-header">${this.name}</h2>
            ${ this.getFeaturedImage() }
        `;
    }

    getCardTemplate() {
        return `
            <div class="people-card">
                <div>
                    <h2>${this.name}${this.degree ? `, ${ this.degree }` : ''}</h2>
                    <p class="title">${this.title}</p>
                    ${ this.getContactInfo() }
                </div>
                
                ${ this.getFeaturedImage() }
                <p class="span-2 interests">${this.interests}</p>
                <p class="span-2">
                    <button class="button dark">More</button>
                </p>
            </div>`;
    }

    getFeaturedImage() {
        return this.featuredImageUrl ?
            `<img class="people-thumb" src="${this.featuredImageUrl}" />`
            : '';
    }
}