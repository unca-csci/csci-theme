import CSArea from './models/cs-area.js';

class Modal {

    constructor () {
        this.modalElement = this.getModalElement();
    }

    getTemplate() {
        return `
        <div id="modal" class="modal-bg hidden" aria-hidden="true" role="dialog">
            
            <section class="modal">
                <button class="modal-close" aria-label="Close the modal window">
                    <i id="close-icon" class="fas fa-times"></i>
                </button>  
                <div class="modal-body"></div>
            </section>
        </div>`;
    }

    getModalElement() {
        let el = document.querySelector('#modal');
        if (!el) {
            document.body.insertAdjacentHTML('beforeend', this.getTemplate());
            el = document.body.lastElementChild;
            const btn = el.querySelector('button');
            btn.addEventListener('click', this.hide.bind(this));
        }
        return el;
    }

    show(html) {
        if (window.event) {
            window.event.preventDefault();
        }
        this.modalElement.classList.remove('hidden');
        this.modalElement.setAttribute('aria-hidden', 'false');
        document.querySelector('.close').focus();
        if (html) {
            this.updateContent(html);
        }
    }

    updateContent(html) {
        if (window.event) {
            window.event.preventDefault();
        }
        this.modalElement.querySelector('.modal-body').innerHTML = html;
    }

    hide(ev) {
        this.modalElement.classList.add('hidden');
        this.modalElement.setAttribute('aria-hidden', 'false');
    };

    async showCSArea (id) {
        if (window.event) {
            window.event.preventDefault();
        }
        const response = await fetch(`/wp-json/wp/v2/cs-areas/${id}?_embed=1`);
        const data = await response.json();
        const csArea = new CSArea(data);
        this.show(csArea.getTemplate());
    }
}

window.modal = new Modal();