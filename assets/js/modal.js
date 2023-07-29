
class Modal {

    constructor (parent) {
        this.modalElement = document.querySelector('#modal');
        if (!this.modalElement) {
            document.body.insertAdjacentHTML('beforeend', this.getTemplate());
            this.modalElement = document.lastElementChild;
        }
        const closeBtn = this.modalElement.querySelector('.close');
        closeBtn.addEventListener('click', this.closeModal.bind(this));
        this.handleModalFocusAccessibility();
    }

    getTemplate() {
        return `
        <div id="modal" class="modal-bg hidden" aria-hidden="true" role="dialog">
            <section class="modal">
                <button class="close" aria-label="Close the modal window" onclick="closeModal(event);">Close</button>
                <div class="modal-body"></div>
            </section>
        </div>`;
    }

    getModalElement() {
        let el = document.querySelector('#modal');
        if (!el) {
            document.insertAdjacentHTML('beforeend', getTemplate());
            el = document.lastElementChild;
        }
        return el;
    }

    openModal(html) {
        if (window.event) {
            console.log('prevent default!');
            window.event.preventDefault();
        }
        console.log('open!');
        this.modalElement.classList.remove('hidden');
        this.modalElement.setAttribute('aria-hidden', 'false');
        this.modalElement.querySelector('modal-body').innerHTML = html;
        this.document.querySelector('.close').focus();
    }

    closeModal(ev) {
        console.log('close!');
        this.modalElement.classList.add('hidden');
        this.modalElement.setAttribute('aria-hidden', 'false');
        document.querySelector('.open').focus();
    };

    handleModalFocusAccessibility() {
        // function ensures that if the tabbing gets to the end of the 
        // modal, it will loop back up to the beginning of the modal:
        document.addEventListener('focus', function(event) {
            console.log('focus');
            if (modalElement.getAttribute('aria-hidden') === 'false' && !this.modalElement.contains(event.target)) {
                console.log('back to top!');
                event.stopPropagation();
                document.querySelector('.close').focus();
            }
        }, true);
    }
}
