export default class Post {
    constructor(data) {
        console.log(data);
        this.id = data.id;
        this.dataType = "post";
        this.title = data.title.rendered;
        this.excerpt = data.excerpt.rendered;
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
            <section>
                <h2>${this.title}</h2>
                ${this.getFeaturedImage()}
                <p>${this.excerpt}</p>
            </section>
        `;
    }

    getCardTemplate() {
        return `
            <div class="news">
                <div class="featured">
                    ${this.getFeaturedImage()}
                </div>
                <div>
                    <h2>${this.title}</h2>
                    <p>${this.excerpt}</p>
                </div>
            </div>`;
    }

    getFeaturedImage() {
        return this.featuredImageUrl
            ? `<img src="${this.featuredImageUrl}" />`
            : "";
    }
}
