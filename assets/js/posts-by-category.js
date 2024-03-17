import DataManager from "./data-manager.js";
import utils from "./utilities.js";

export default class PostsByCategory {
    constructor(categoryId) {
        this.categoryId = categoryId;
        this.mainContainer = document.querySelector("#category-main");
        utils.showSpinner(this.mainContainer);
        this.dm = window.dataManager = new DataManager();
    }

    async fetchAndDisplayByCategory() {
        const posts = await this.dm.getPostsByCategory(this.categoryId);
        console.log(posts);
        this.mainContainer.innerHTML = '<div class="projects"></div>';
        const container = this.parent.lastElementChild;
        posts.forEach((post) => {
            console.log(post.name, post.term);
            container.insertAdjacentHTML(
                "beforeend",
                post.getCardTemplate()
            );
        });
    }
}
