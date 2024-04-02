export default class Project {
    constructor(data, availablePeople) {
        console.log(data);
        this.id = data.id;
        this.dataType = "student-project";
        this.name = data.title.rendered;
        this.description = data.acf.description;
        this.url = data.link;
        this.reportUrl = data.acf.report_link;
        this.presentationUrl = data.acf.presentation_link;
        this.videoUrl = data.acf.video_link;
        this.codeUrl = data.acf.code_link;
        this.term = data.acf.term;
        this.featured = data.acf.featured;
        this.teamMembers = data.acf.students
            .split(",")
            .map((student) => student.trim());
        this.advisorIds = data.acf.advisors.map((person) => person.ID);
        if (
            data._embedded &&
            data._embedded["wp:featuredmedia"] &&
            data._embedded["wp:featuredmedia"].length > 0
        ) {
            const imageSizes =
                data._embedded["wp:featuredmedia"][0].media_details.sizes;
            if (imageSizes.large) {
                this.featuredImageUrl = imageSizes.large.source_url;
            } else if (imageSizes.full) {
                this.imgFull = imageSizes.full.source_url;
            }
        }

        if (availablePeople) {
            this.advisors = availablePeople.filter((a) =>
                this.advisorIds.includes(a.id)
            );
        }
    }

    getInstructor(availablePeople) {
        if (availablePeople) {
            const [lastName, firstName] = this.instructorName.split(", ");
            const results = availablePeople.filter((person) => {
                return (
                    person.name
                        .toUpperCase()
                        .includes(lastName.toUpperCase()) &&
                    person.name.toUpperCase().includes(firstName.toUpperCase())
                );
            });
            if (results.length === 1) {
                return results[0];
            }
        }
        return null;
    }

    getMainTemplate() {
        return `
            ${this.description}
        `;
    }

    getFeaturedImage() {
        let html = "";
        if (this.featuredImageUrl) {
            html = `
                <img 
                    src="${this.featuredImageUrl}" 
                    alt="Image representing the project" />`;
        }
        return html;
    }

    hasLinks() {
        return this.presentationUrl || this.videoUrl || this.reportUrl;
    }

    getSidebarLinks() {
        if (!this.hasLinks()) {
            return "";
        }
        return `
        <h3>Project Links</h3>
        <ul class="students">
            ${
                this.presentationUrl
                    ? `<li><a href="${this.presentationUrl}">Presentation</a></li>`
                    : ""
            }
            ${
                this.videoUrl
                    ? `<li><a href="${this.videoUrl}">Video</a></li>`
                    : ""
            }
            ${
                this.reportUrl
                    ? `<li><a href="${this.reportUrl}">Report</a></li>`
                    : ""
            }
        </ul>
        `;
    }

    getSideTemplate() {
        return `
            <div class="project-submenu">
                ${this.getFeaturedImage()}
                
                <h3>Student Team</h3>
                <ul class="students">
                    <!-- populated with event handlers later -->
                </ul>
                
                ${this.getSidebarLinks()}
                
                <h3>Advisors</h3>
                <ul class="advisors">
                    <!-- populated with event handlers later -->
                </ul>
            </div>
        `;
    }

    appendSideTemplate(parent) {
        parent.insertAdjacentHTML("beforeend", this.getSideTemplate());

        const studentsEl = parent.querySelector(".students");
        this.teamMembers.forEach((person) => {
            studentsEl.insertAdjacentHTML("beforeend", `<li>${person}</li>`);
        });

        const advisorsEl = parent.querySelector(".advisors");
        this.addEventHandlers(this.advisors, advisorsEl);
    }

    addEventHandlers(people, parent) {
        // add advisors event handler:
        people.forEach((person) => {
            parent.insertAdjacentHTML(
                "beforeend",
                `<li><a href="#">${person.name}</a></li>`
            );

            // Add event handler:
            const a = parent.lastElementChild.querySelector("a");
            a.addEventListener("click", person.showModal.bind(person));
        });
    }

    getCardTemplate() {
        return `
        <section 
            onclick="this.querySelector('a').click()" 
            class="project" 
            style="${
                this.featuredImageUrl
                    ? `background-image: url('${this.featuredImageUrl}')`
                    : ""
            }"
            >
            <div class="overlay-box">
                <div>
                    <h2 class="title">
                        <a href="${this.url}">${this.name}</a>
                    </h2>
                    <p>${this.teamMembers
                        .map((student) => student)
                        .join(", ")}</p>
                </div>
                <div class="project-links">
                    ${this.getVideoLink()}
                    ${this.getReportLink()}
                    ${this.getPresentationLink()}
                    <!-- ${this.getCodeLink()} -->
                </div>
            </div>
        </section>`;
    }

    getCardTemplateSimple() {
        return `
        <section class="project-simple">
                <div>
                    <h3>
                        <a href="${this.url}">${this.name}</a>
                    </h3>
                    <p><strong>${this.teamMembers
                        .map((student) => student)
                        .join(", ")}</strong></p>
                    ${this.description.substring(0, 250) + "..."}
                </div>
                <div class="project-links-simple">
                    ${this.getVideoLink()}
                    ${this.getReportLink()}
                    ${this.getPresentationLink()}
                </div>
        </section>`;
    }

    getVideoLink() {
        if (this.videoUrl) {
            return `<a href="${this.videoUrl}" target="_blank"  title="Project Video">
                <i class="fa-solid fa-video" aria-label="video icon"></i>
            </a>`;
        }
        return "";
    }

    getReportLink() {
        if (this.reportUrl) {
            return `<a href="${this.reportUrl}" target="_blank" title="Project Report">
                <i class="fa-regular fa-file-pdf" aria-label="report icon"></i>
            </a>`;
        }
        return "";
    }

    getCodeLink() {
        if (this.codeUrl) {
            return `<a href="${this.reportUrl}"  target="_blank" title="Project code">
                <i class="fa-solid fa-code" aria-label="code icon"></i>
            </a>`;
        }
        return "";
    }

    getPresentationLink() {
        if (this.presentationUrl) {
            return `<a href="${this.presentationUrl}"  target="_blank" title="Presentation">
            <i class="fa-regular fa-file-powerpoint" aria-label="presentation icon"></i>
            </a>`;
        }
        return "";
    }

    showDetail(e) {
        e.currentTarget.querySelector("a").click();
    }

    appendInstructor(parent) {
        const instructorEl = parent.querySelector(".instructor");
        if (this.instructor) {
            instructorEl.innerHTML = `
                <a href="#">${this.instructor.firstName} ${this.instructor.lastName}</a>`;

            // Add event handler:
            const a = instructorEl.querySelector("a");
            a.addEventListener(
                "click",
                this.instructor.showModal.bind(this.instructor)
            );
        }
    }
}
