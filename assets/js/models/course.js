import utils from "../utilities.js";

export default class Course {
    static courseSortFunction(a, b) {
        // list "Pick One" courses before others
        let code1 = a.code;
        let code2 = b.code;
        if (a.courses != null) {
            code1 = a.courses[0].code;
        }
        if (b.courses != null) {
            code2 = b.courses[0].code;
        }
        if (code1 < code2) {
            return -1;
        } else if (code1 > code2) {
            return 1;
        }
        return 0;
    }

    constructor(data) {
        this.dm = window.dataManager;
        this.id = data.id;
        this.dataType = "course";
        this.course_category_ids = this.getCourseCategoryIds(data);
        this.code = data.acf.csci_num;
        try {
            this.department = data.acf.csci_num.split(" ")[0];
        } catch (e) {
            this.department = "";
        }
        this.name = data.acf.title;
        this.description = data.acf.description;
        this.offered = data.acf.offered || "";
        this.credits = data.acf.credits || 3;

        this.prerequisites_ids = data.acf.prerequisites
            ? data.acf.prerequisites.map((item) => item.ID)
            : [];
        this.cs_area_ids = data.acf.cs_areas
            ? data.acf.cs_areas.map((item) => item.ID)
            : [];
        this.requirements = null;
        this.prerequisites = null;
    }

    is300PlusElective() {
        return (
            this.department === "CSCI" &&
            ["3", "4"].includes(this.code[5]) &&
            this.credits >= 3
        );
    }

    loadRequirements() {
        // look through all of the degree objects to see if the current course
        // is listed. If it is, add it to the requirements array:
        if (this.requirements && this.requirements.length > 0) {
            return;
        }
        this.requirements = [];
        this.dm.degrees.forEach(
            ((degree) => {
                degree.groups.forEach((group) => {
                    if (group.groupType == "All") {
                        const courseIds = group.courses.map(
                            (course) => course.id
                        );
                        if (courseIds.includes(this.id)) {
                            this.requirements.push(degree.name);
                        }
                    }
                });
            }).bind(this)
        );
    }

    loadPrerequisites() {
        this.getPrereqs();
    }

    getPrereqs() {
        // this function caches prereqs if the data are available
        if (!this.dm.courses || !this.dm.groups) {
            return [];
        }
        if (this.prerequisites) {
            return this.prerequisites;
        }

        // returns a unique, sorted list of prerequisites:
        if (this.prerequisites_ids) {
            let prereqs = this.getPrereqsRecursive([]);
            this.prerequisites = [...new Set(prereqs)].sort(
                Course.courseSortFunction
            );
        } else {
            this.prerequisites = [];
        }
        return this.prerequisites;
    }

    getPrereqsRecursive(prereqs) {
        if (this.prerequisites_ids) {
            const newPrereqs = this.dm.courses.filter((course) =>
                this.prerequisites_ids.includes(course.id)
            );
            const newPrereqGroups = this.dm.groups.filter((group) =>
                this.prerequisites_ids.includes(group.id)
            );

            prereqs = prereqs.concat(newPrereqs);
            prereqs = prereqs.concat(newPrereqGroups);
            for (const newPrereq of newPrereqs) {
                return newPrereq.getPrereqsRecursive(prereqs);
            }
        }
        return prereqs;
    }

    appendPrerequisites(parent) {
        parent.innerHTML = "";
        this.getPrereqs().forEach((prereq) => {
            if (prereq.dataType == "course") {
                prereq.appendToHTMLElementListItem(parent);
            } else {
                parent.insertAdjacentHTML(
                    "beforeend",
                    `<li>${prereq.code}. ${prereq.name}. Pick One: <ul>`
                );
                parent.insertAdjacentHTML("beforeend", `<ul></ul>`);
                const ul = parent.lastElementChild;
                prereq.courses.map((course) => {
                    course.appendToHTMLElementListItem(ul);
                });
            }
        });
    }

    getTemplate() {
        let html = `
            <section class="content-wrapper">
                <h2 class="person-header">${this.code}: ${this.name}</h2>
                <p>${this.description}</p>
                <ul>
                    <li>${this.credits} Credit Hour(s)</li>
                    ${this.offered ? `<li>Offered ${this.offered}</li>` : ""}
                </ul>
                ${this.getPrereqsHTML()}
                ${this.getRequirementsHTML()}
                ${this.getAreasHTML()}
            </section>
        `;
        return html;
    }

    getTemplateElement() {
        const el = utils.createElementFromHTML(this.getTemplate());
        // attach event handlers:
        let parent = el.querySelector(".area-tags");
        if (parent) {
            parent.innerHTML = "";
            this.cs_areas = this.dm.csAreas.filter((item) =>
                this.cs_area_ids.includes(item.id)
            );
            this.cs_areas.forEach((area) => {
                area.appendTagToHTMLElement(parent);
            });
        }

        parent = el.querySelector(".faculty-list");
        if (parent) {
            parent.innerHTML = "";
            this.faculty.forEach((f) => {
                f.appendToHTMLElement(parent, window.modal);
            });
        }
        parent = el.querySelector(".prerequisites");
        if (parent) {
            this.appendPrerequisites(parent);
        }
        return el;
    }

    getTemplateListItem(includeLinks = true) {
        // const tokens = this.name.split(": ");
        // const name = tokens.length > 1 ? tokens[1] : this.name;
        if (includeLinks) {
            return `<li>
                ${this.code}. 
                <a href="#">${this.name}</a>
            </li>`;
        } else {
            return `<li>
                ${this.code}. ${this.name} (${this.credits} Credits)
            </li>`;
        }
    }

    getTemplateLink() {
        return `<a href="#">${this.code}</a>`;
    }

    getTemplateTableRow() {
        if (!this.pick_one) {
            let prereqs = this.prerequisites ? this.prerequisites.length : 0;
            if (prereqs === 0) {
                prereqs = "--";
            }
            return `<tr>
                <td>
                    ${this.code}
                </td>
                <td><a href="#">${this.name}</a></td>
                <td>${this.offered}</td>
                <td>${prereqs}</td>
                <td>${this.credits}</td>
            </tr>`;
        } else {
            return `<tr>
                <td>${this.name}</td>
                <td></td>
                <td>${this.offered}</td>
                <td></td>
                <td>${this.credits}</td>
            </tr>`;
        }
    }

    getTemplateCard() {
        return `<div class="card course-card">
            <a href="#"><h3>${this.code}</h3></a>
            <p>${this.name}<br>(${this.credits} Credits)</p>
        </div>`;
    }

    addLinkEventHandler(a) {
        a.addEventListener("click", this.showModal.bind(this));
    }

    appendToHTMLElementListItem(parent) {
        parent.insertAdjacentHTML("beforeend", this.getTemplateListItem());
        this.addLinkEventHandler(parent.lastElementChild);
    }

    appendToHTMLElement(parent) {
        parent.insertAdjacentHTML("beforeend", this.getTemplate());
        this.addLinkEventHandler(parent.lastElementChild);
    }

    appendLinkToHTMLElement(parent) {
        parent.insertAdjacentHTML("beforeend", this.getTemplateLink());
        this.addLinkEventHandler(parent.lastElementChild);
    }

    appendListItemToHTMLElement(parent) {
        return this.appendToHTMLElement(parent);
    }

    appendToHTMLElementTable(parent) {
        parent.insertAdjacentHTML("beforeend", this.getTemplateTableRow());

        const a = parent.lastElementChild.querySelector("a");
        a.addEventListener("click", this.showModal.bind(this));
    }

    appendToHTMLElementCard(parent) {
        parent.insertAdjacentHTML("beforeend", this.getTemplateCard());

        // Add event handler:
        const card = parent.lastElementChild;
        const a = card.querySelector("a");
        card.addEventListener("click", this.showModal.bind(this));
        a.addEventListener("click", this.showModal.bind(this));
    }

    showModal(e) {
        window.modalManager.showModal(this.getTemplateElement());
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    getCourseCategoryIds(data) {
        if (
            data.acf.course_categories &&
            data.acf.course_categories.length > 0
        ) {
            return data.acf.course_categories.map((cat) => cat.ID);
        }
        return [];
    }

    getPrereqsHTML() {
        if (this.getPrereqs().length === 0) {
            return "<h3>Prerequisites</h3><p>None</p>";
        }
        return `
            <h3>Prerequisites</h3><ul class="prerequisites"></ul>
            
        `;
        // <ul>
        //     ${
        //         this.prerequisites
        //             .map(prereq => {
        //                 if (prereq.dataType == 'course') {
        //                     return `<li>${ prereq.code }. ${ prereq.name }</li>`
        //                 } else {
        //                     return `<li>${prereq.code}. ${prereq.name} Pick One: <ul>${
        //                         prereq.courses.map(course => {
        //                             return `<li>${ course.code }. ${ course.name }</li>`
        //                         }).join('\n')
        //                     }</ul></li>`
        //                 }
        //             })
        //             .join('\n')
        //     }
        //     </ul>
    }

    getAreasHTML() {
        if (this.cs_area_ids.length === 0 || this.dm.csAreas.length === 0) {
            return "";
        }
        return '<h3>CS Areas</h3><div class="area-tags"></div>';
    }

    getRequirementsHTML() {
        if (!this.requirements || this.requirements.length === 0) {
            return "";
        }
        return `
            <h3>Required for:</h3>
            <ul><li>${this.requirements.join("</li><li>")}</li></ul>
        `;
    }
}
