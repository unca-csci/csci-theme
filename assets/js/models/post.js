export default class Post {
    constructor(data) {
        console.log(data);
        this.id = data.id;
        this.dataType = "post";
        this.url = data.link;
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
                <a href="${this.url}" class="btn">Read More</a>
            </section>
        `;
    }

    getCardTemplate() {
        return `
            <div class="news-custom">
                <div class="featured">
                    ${this.getFeaturedImage()}
                </div>
                <div>
                    <h2>${this.title}</h2>
                    <p>${this.excerpt}</p>
                    <a href="${this.url}" class="btn">Read More</a>
                </div>
            </div>`;
    }

    getFeaturedImage() {
        return this.featuredImageUrl
            ? `<img src="${this.featuredImageUrl}" />`
            : "";
    }
}
