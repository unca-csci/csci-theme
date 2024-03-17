export default class Student {
    constructor(data) {
        console.log(data);
        this.id = data.id;
        this.dataType = "post";
        this.title = data.title.rendered;
        this.bio = data.acf.bio;
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
    }

    getTemplate() {
        return `
            <section class="content-wrapper">
                <h2 class="person-header">${this.title}</h2>
                ${this.getFeaturedImage()}
            </section>
        `;
    }

    getCardTemplate() {
        return `
            <div class="people-card">
                <div>
                    <h2>${this.title}</h2>
                </div>
                
                ${this.getFeaturedImage()}
            </div>`;
    }

    getFeaturedImage() {
        return this.featuredImageUrl
            ? `<img class="people-thumb" src="${this.featuredImageUrl}" />`
            : "";
    }
}
