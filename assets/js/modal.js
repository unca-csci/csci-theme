export default class Modal {

    constructor(id, className, zIndex=99999) {
        this.bgId = `${id}-bg`;
        this.id = id;
        this.className = className;
        this.addToDOM();
        this.el = document.getElementById(this.id);
        this.bg = document.getElementById(this.bgId);
        this.bg.style.zIndex = zIndex;
        this.el.style.zIndex = zIndex + 1;
    }

    addToDOM = () => {
        let el = document.getElementById(this.id);
        if (!el) {
            document.body.insertAdjacentHTML('beforeend', `
                <section class="background-sheet" id="${this.bgId}"></section>
                <div id="${this.id}" class="${this.className}">
                    <button class="close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="content"></div>
                </div>
            `);

            // add event handlers:
            document.querySelector(`#${this.id} .close`).addEventListener('click', this.destroy.bind(this));
            this.bg = document.getElementById(this.bgId).addEventListener('click', this.destroy.bind(this));
        }
    }

    hide (ev) {
        if (ev) {
            const classList = ev.target.classList;
            let doClose = false;
            classList.forEach(className => {
                if (["fa-times", "close", "close-icon", "show"].includes(className)) {
                    doClose = true;
                    return;
                }
            })
            if (!doClose) {return};
        }
    
        // hide bg overlay:
        this.bg.classList.remove("show");
        this.bg.setAttribute('aria-hidden', "true");
        
        // hide lightbox:
        this.el.classList.remove("show");
        this.el.setAttribute('aria-hidden', "true");
        
        // cleanup and cursor focus:
        document.body.style.overflowY = "scroll";
        if (window.callingElement) {
            window.callingElement.focus();
        }
    }

    destroy(ev) {
        this.hide(ev);
        setTimeout((function () {
            this.el.remove();
            this.bg.remove();
            if (window.modalManager) {
                window.modalManager.remove(this.id);
            }
        }).bind(this), 500);
    }

    show(htmlOrElement) {
        console.log(htmlOrElement);
        if (window.event) {
            window.event.preventDefault();
            window.callingElement = window.event.target;
        } else {
            window.callingElement = null;
        }
        
        // hack so that first lightbox slides in:
        setTimeout((function() {
            this.bg.setAttribute('aria-hidden', "false");
            this.bg.classList.add("show");
    
            this.el.setAttribute('aria-hidden', "false");
            this.el.classList.add("show");
            const contentEl = this.el.querySelector('.content');
            if (!htmlOrElement.nodeName) {
                contentEl.innerHTML = htmlOrElement;
            } else {
                contentEl.innerHTML = '';
                contentEl.appendChild(htmlOrElement);
            }
    
            document.body.style.overflowY = "hidden";
            
            // cursor focus:
            this.el.querySelector(".close").focus();
        }).bind(this), 5);
    }
}