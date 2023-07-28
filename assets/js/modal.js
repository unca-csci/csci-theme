
class Modal {

    constructor (parent) {
        parent.insertAdjacentHTML(
            'beforeend', this.getTemplate()
        )
        this.modalElement = parent.lastElementChild
        const closeBtn = this.modalElement.querySelector('.close');
        closeBtn.addEventListener('click', this.closeModal.bind(this));
        this.handleModalFocusAccessibility();
    }

    getTemplate() {
        return `
        <div class="modal-bg hidden" aria-hidden="true" role="dialog">
            <section class="modal">
                <button class="close" aria-label="Close the modal window" onclick="closeModal(event);">Close</button>
                <div class="modal-body">
        </div>`;
    }

    openModal(ev) {
        console.log('open!');
        this.modalElement.classList.remove('hidden');
        this.modalElement.setAttribute('aria-hidden', 'false');
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
