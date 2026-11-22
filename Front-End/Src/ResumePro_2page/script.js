/* =========================================================
   RESUMEFORGE
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);


function escapeHTML(value = "") {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   URL NORMALIZATION
   FIXES EMAIL / LINK NAVIGATION
========================================================= */

function normalizeURL(value, type = "web") {

    if (!value) return "";

    let url = String(value).trim();

    if (!url) return "";


    /* EMAIL */

    if (type === "email") {

        return `mailto:${url.replace(/^mailto:/i, "")}`;

    }


    /* REMOVE accidental spaces */

    url = url.replace(/\s+/g, "");


    /* Add HTTPS when no scheme was supplied, then allow only useful link types. */

    const candidate = /^[a-z][a-z\d+.-]*:/i.test(url)
        ? url
        : `https://${url}`;

    try {

        const parsed = new URL(candidate);
        const allowedProtocols = ["http:", "https:", "ftp:", "tel:", "mailto:"];

        return allowedProtocols.includes(parsed.protocol)
            ? parsed.href
            : "";

    } catch {

        return "";

    }

}


/* =========================================================
   STATE
========================================================= */

const state = {

    template: "google-clean",

    sectionStyles: {

        summary: {
            font: "inherit",
            headingColor: "#1d4ed8",
            textColor: "#111827",
            lineColor: "#6b7280"
        },

        skills: {
            font: "inherit",
            headingColor: "#1d4ed8",
            textColor: "#111827",
            lineColor: "#6b7280"
        },

        experience: {
            font: "inherit",
            headingColor: "#1d4ed8",
            textColor: "#111827",
            lineColor: "#6b7280"
        },

        education: {
            font: "inherit",
            headingColor: "#1d4ed8",
            textColor: "#111827",
            lineColor: "#6b7280"
        },

        projects: {
            font: "inherit",
            headingColor: "#1d4ed8",
            textColor: "#111827",
            lineColor: "#6b7280"
        },

        certifications: {
            font: "inherit",
            headingColor: "#1d4ed8",
            textColor: "#111827",
            lineColor: "#6b7280"
        }

    }

};


const sections = [

    {
        id: "summary",
        name: "Professional Summary"
    },

    {
        id: "skills",
        name: "Skills"
    },

    {
        id: "experience",
        name: "Experience"
    },

    {
        id: "education",
        name: "Education"
    },

    {
        id: "projects",
        name: "Projects"
    },

    {
        id: "certifications",
        name: "Certifications"
    }

];


/* =========================================================
   TOAST
========================================================= */

function toast(message) {

    const element = $("#toast");

    element.textContent = message;

    element.classList.add("show");

    setTimeout(() => {

        element.classList.remove("show");

    }, 2500);

}


/* =========================================================
   EXPERIENCE
========================================================= */

function addExperience(data = {}) {

    const card = document.createElement("div");

    card.className = "dynamic-card experience-card";

    card.innerHTML = `

        <button class="remove-card" type="button">
            <i class="fa-solid fa-trash"></i>
        </button>

        <div class="form-grid">

            <div class="form-group">

                <label>Job Title</label>

                <input
                    class="exp-role"
                    value="${escapeHTML(data.role || "")}"
                    placeholder="Software Engineer"
                >

            </div>

            <div class="form-group">

                <label>Company</label>

                <input
                    class="exp-company"
                    value="${escapeHTML(data.company || "")}"
                    placeholder="Company Name"
                >

            </div>

            <div class="form-group">

                <label>Start Date</label>

                <input
                    class="exp-start"
                    value="${escapeHTML(data.start || "")}"
                    placeholder="Jan 2024"
                >

            </div>

            <div class="form-group">

                <label>End Date</label>

                <input
                    class="exp-end"
                    value="${escapeHTML(data.end || "")}"
                    placeholder="Present"
                >

            </div>

            <div class="form-group full">

                <label>Achievements / Responsibilities</label>

                <textarea
                    class="exp-description"
                    rows="4"
                    placeholder="Describe achievements..."
                >${escapeHTML(data.description || "")}</textarea>

            </div>

        </div>
    `;

    $("#experienceContainer").appendChild(card);

    attachCardEvents(card);

}


/* =========================================================
   EDUCATION
========================================================= */

function addEducation(data = {}) {

    const card = document.createElement("div");

    card.className = "dynamic-card education-card";

    card.innerHTML = `

        <button class="remove-card" type="button">
            <i class="fa-solid fa-trash"></i>
        </button>

        <div class="form-grid">

            <div class="form-group">

                <label>Degree</label>

                <input
                    class="edu-degree"
                    value="${escapeHTML(data.degree || "")}"
                    placeholder="Bachelor of Technology"
                >

            </div>

            <div class="form-group">

                <label>University / School</label>

                <input
                    class="edu-school"
                    value="${escapeHTML(data.school || "")}"
                    placeholder="University Name"
                >

            </div>

            <div class="form-group">

                <label>Year</label>

                <input
                    class="edu-year"
                    value="${escapeHTML(data.year || "")}"
                    placeholder="2020 - 2024"
                >

            </div>

            <div class="form-group">

                <label>CGPA / Grade</label>

                <input
                    class="edu-grade"
                    value="${escapeHTML(data.grade || "")}"
                    placeholder="8.5 CGPA"
                >

            </div>

        </div>
    `;

    $("#educationContainer").appendChild(card);

    attachCardEvents(card);

}


/* =========================================================
   PROJECT
========================================================= */

function addProject(data = {}) {

    const card = document.createElement("div");

    card.className = "dynamic-card project-card";

    card.innerHTML = `

        <button class="remove-card" type="button">
            <i class="fa-solid fa-trash"></i>
        </button>

        <div class="form-grid">

            <div class="form-group">

                <label>Project Name</label>

                <input
                    class="project-name"
                    value="${escapeHTML(data.name || "")}"
                    placeholder="AI Resume Builder"
                >

            </div>

            <div class="form-group">

                <label>Technologies</label>

                <input
                    class="project-tech"
                    value="${escapeHTML(data.tech || "")}"
                    placeholder="HTML, CSS, JavaScript"
                >

            </div>

            <div class="form-group full">

                <label>Description</label>

                <textarea
                    class="project-description"
                    rows="4"
                    placeholder="Describe your project..."
                >${escapeHTML(data.description || "")}</textarea>

            </div>

            <div class="form-group">

                <label>Source Code URL</label>

                <input
                    class="project-github"
                    value="${escapeHTML(data.github || "")}"
                    placeholder="github.com/user/project"
                >

            </div>

            <div class="form-group">

                <label>Live Project URL</label>

                <input
                    class="project-live"
                    value="${escapeHTML(data.live || "")}"
                    placeholder="project.vercel.app"
                >

            </div>

        </div>
    `;

    $("#projectContainer").appendChild(card);

    attachCardEvents(card);

}


/* =========================================================
   CERTIFICATION
========================================================= */

function addCertification(data = {}) {

    const card = document.createElement("div");

    card.className = "dynamic-card certification-card";

    card.innerHTML = `

        <button class="remove-card" type="button">
            <i class="fa-solid fa-trash"></i>
        </button>

        <div class="form-grid">

            <div class="form-group">

                <label>Certificate</label>

                <input
                    class="cert-name"
                    value="${escapeHTML(data.name || "")}"
                    placeholder="JavaScript Certification"
                >

            </div>

            <div class="form-group">

                <label>Organization</label>

                <input
                    class="cert-organization"
                    value="${escapeHTML(data.organization || "")}"
                    placeholder="Coursera"
                >

            </div>

            <div class="form-group full">

                <label>Credential URL</label>

                <input
                    class="cert-url"
                    value="${escapeHTML(data.url || "")}"
                    placeholder="https://..."
                >

            </div>

        </div>
    `;

    $("#certificationContainer").appendChild(card);

    attachCardEvents(card);

}


/* =========================================================
   CARD EVENTS
========================================================= */

function attachCardEvents(card) {

    card.querySelector(".remove-card")
        .addEventListener("click", () => {

            card.remove();

            updateResume();

        });


    card.querySelectorAll("input, textarea")
        .forEach(input => {

            input.addEventListener(
                "input",
                updateResume
            );

        });

}


/* =========================================================
   GET RESUME DATA
========================================================= */

function getResumeData() {

    const personal = {

        fullName: $("#fullName").value.trim(),

        jobTitle: $("#jobTitle").value.trim(),

        email: $("#email").value.trim(),

        phone: $("#phone").value.trim(),

        location: $("#location").value.trim(),

        linkedin: $("#linkedin").value.trim(),

        github: $("#github").value.trim(),

        portfolio: $("#portfolio").value.trim(),

        summary: $("#summary").value.trim()

    };


    const skills =
        $("#skills").value
            .split(",")
            .map(x => x.trim())
            .filter(Boolean);


    const experience =
        [...$$(".experience-card")]
            .map(card => ({

                role:
                    card.querySelector(".exp-role").value.trim(),

                company:
                    card.querySelector(".exp-company").value.trim(),

                start:
                    card.querySelector(".exp-start").value.trim(),

                end:
                    card.querySelector(".exp-end").value.trim(),

                description:
                    card.querySelector(".exp-description").value.trim()

            }))
            .filter(x =>
                x.role ||
                x.company ||
                x.description
            );


    const education =
        [...$$(".education-card")]
            .map(card => ({

                degree:
                    card.querySelector(".edu-degree").value.trim(),

                school:
                    card.querySelector(".edu-school").value.trim(),

                year:
                    card.querySelector(".edu-year").value.trim(),

                grade:
                    card.querySelector(".edu-grade").value.trim()

            }))
            .filter(x =>
                x.degree ||
                x.school
            );


    const projects =
        [...$$(".project-card")]
            .map(card => ({

                name:
                    card.querySelector(".project-name").value.trim(),

                tech:
                    card.querySelector(".project-tech").value.trim(),

                description:
                    card.querySelector(".project-description").value.trim(),

                github:
                    card.querySelector(".project-github").value.trim(),

                live:
                    card.querySelector(".project-live").value.trim()

            }))
            .filter(x =>
                x.name ||
                x.description
            );


    const certifications =
        [...$$(".certification-card")]
            .map(card => ({

                name:
                    card.querySelector(".cert-name").value.trim(),

                organization:
                    card.querySelector(".cert-organization").value.trim(),

                url:
                    card.querySelector(".cert-url").value.trim()

            }))
            .filter(x =>
                x.name
            );


    return {

        personal,

        skills,

        experience,

        education,

        projects,

        certifications,

        template: state.template,

        sectionStyles: state.sectionStyles

    };

}


/* =========================================================
   UPDATE PREVIEW
========================================================= */

function updateResume() {

    const data = getResumeData();


    /* NAME */

    $("#previewName").textContent =
        data.personal.fullName || "Your Name";


    $("#previewTitle").textContent =
        data.personal.jobTitle || "Professional Title";


    /* CONTACT */

    const contact = [];


    if (data.personal.email) {

        contact.push(`

            <a
                href="${escapeHTML(normalizeURL(data.personal.email, "email"))}"
                title="Email ${escapeHTML(data.personal.email)}"
            >
                ${escapeHTML(data.personal.email)}
            </a>

        `);

    }


    if (data.personal.phone) {

        const phoneHref =
            "tel:" +
            data.personal.phone
                .replace(/[^\d+]/g, "");


        contact.push(`

            <a href="${escapeHTML(phoneHref)}">
                ${escapeHTML(data.personal.phone)}
            </a>

        `);

    }


    if (data.personal.location) {

        contact.push(
            `<span>${escapeHTML(data.personal.location)}</span>`
        );

    }


    $("#previewContact").innerHTML =
        contact.join("");


    /* SOCIAL */

    const social = [];


    if (data.personal.linkedin) {

        social.push(`

            <a
                href="${escapeHTML(normalizeURL(data.personal.linkedin))}"
                target="_blank"
                rel="noopener noreferrer"
            >
                LinkedIn
            </a>

        `);

    }


    if (data.personal.github) {

        social.push(`

            <a
                href="${escapeHTML(normalizeURL(data.personal.github))}"
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub
            </a>

        `);

    }


    if (data.personal.portfolio) {

        social.push(`

            <a
                href="${escapeHTML(normalizeURL(data.personal.portfolio))}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Portfolio
            </a>

        `);

    }


    $("#previewSocial").innerHTML =
        social.join("");


    /* SUMMARY */

    $("#previewSummary").textContent =
        data.personal.summary ||
        "Add your professional summary.";


    /* SKILLS */

    $("#previewSkills").innerHTML =
        data.skills.map(skill => `

            <span class="skill">
                ${escapeHTML(skill)}
            </span>

        `).join("");


    /* EXPERIENCE */

    $("#previewExperience").innerHTML =
        data.experience.map(exp => `

            <div class="resume-item">

                <div class="item-top">

                    <div>

                        <div class="item-title">
                            ${escapeHTML(exp.role)}
                        </div>

                        <div class="item-subtitle">
                            ${escapeHTML(exp.company)}
                        </div>

                    </div>

                    <div class="item-date">

                        ${escapeHTML(
                            [exp.start, exp.end]
                                .filter(Boolean)
                                .join(" - ")
                        )}

                    </div>

                </div>

                ${
                    exp.description
                        ? `
                            <div class="item-description">
                                ${escapeHTML(exp.description)}
                            </div>
                        `
                        : ""
                }

            </div>

        `).join("");


    /* EDUCATION */

    $("#previewEducation").innerHTML =
        data.education.map(edu => `

            <div class="resume-item">

                <div class="item-top">

                    <div>

                        <div class="item-title">
                            ${escapeHTML(edu.degree)}
                        </div>

                        <div class="item-subtitle">
                            ${escapeHTML(edu.school)}
                        </div>

                    </div>

                    <div class="item-date">
                        ${escapeHTML(edu.year)}
                    </div>

                </div>

                ${
                    edu.grade
                        ? `
                            <div class="item-description">
                                ${escapeHTML(edu.grade)}
                            </div>
                        `
                        : ""
                }

            </div>

        `).join("");


    /* PROJECTS */

    $("#previewProjects").innerHTML =
        data.projects.map(project => `

            <div class="resume-item">

                <div class="item-title">
                    ${escapeHTML(project.name)}
                </div>

                ${
                    project.tech
                        ? `
                            <div class="item-subtitle">
                                ${escapeHTML(project.tech)}
                            </div>
                        `
                        : ""
                }

                ${
                    project.description
                        ? `
                            <div class="item-description">
                                ${escapeHTML(project.description)}
                            </div>
                        `
                        : ""
                }

                <div class="project-links">

                    ${
                        project.github
                            ? `
                                <a
                                    href="${escapeHTML(normalizeURL(project.github))}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i class="fa-brands fa-github"></i>
                                    Source Code
                                </a>
                            `
                            : ""
                    }

                    ${
                        project.live
                            ? `
                                <a
                                    href="${escapeHTML(normalizeURL(project.live))}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i class="fa-solid fa-arrow-up-right-from-square"></i>
                                    Live Project
                                </a>
                            `
                            : ""
                    }

                </div>

            </div>

        `).join("");


    /* CERTIFICATIONS */

    $("#previewCertifications").innerHTML =
        data.certifications.map(cert => `

            <div class="resume-item">

                <div class="item-title">
                    ${escapeHTML(cert.name)}
                </div>

                ${
                    cert.organization
                        ? `
                            <div class="item-subtitle">
                                ${escapeHTML(cert.organization)}
                            </div>
                        `
                        : ""
                }

                ${
                    cert.url
                        ? `
                            <a
                                class="cert-link"
                                href="${escapeHTML(normalizeURL(cert.url))}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Verify Credential
                            </a>
                        `
                        : ""
                }

            </div>

        `).join("");


    applyTemplate();

    applySectionStyles();

    autoSave();

}


/* =========================================================
   TEMPLATE
========================================================= */

function applyTemplate() {

    $("#resume").className =
        `resume ${state.template}`;


    $$(".template-card")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.template === state.template
            );

        });

}


$$(".template-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                state.template =
                    button.dataset.template;

                applyTemplate();

                autoSave();

            }
        );

    });


/* =========================================================
   SECTION CUSTOMIZATION
========================================================= */

function buildCustomizationPanel() {

    const container =
        $("#sectionCustomization");

    container.innerHTML = "";


    sections.forEach(section => {

        const style =
            state.sectionStyles[section.id];


        const card =
            document.createElement("div");

        card.className = "custom-card";


        card.innerHTML = `

            <h4>
                ${section.name}
            </h4>

            <div class="form-group">

                <label>
                    Font Family
                </label>

                <select
                    data-style-section="${section.id}"
                    data-style-key="font"
                >

                    <option value="inherit">
                        Default
                    </option>

                    <option value="Arial">
                        Arial
                    </option>

                    <option value="Calibri">
                        Calibri
                    </option>

                    <option value="Helvetica">
                        Helvetica
                    </option>

                    <option value="Georgia">
                        Georgia
                    </option>

                    <option value="Verdana">
                        Verdana
                    </option>

                    <option value="Times New Roman">
                        Times New Roman
                    </option>

                    <option value="Courier New">
                        Courier New
                    </option>

                </select>

            </div>


            <div class="color-row">

                <div class="form-group">

                    <label>
                        Heading
                    </label>

                    <input
                        type="color"
                        class="color-input"
                        value="${style.headingColor}"
                        data-style-section="${section.id}"
                        data-style-key="headingColor"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Text
                    </label>

                    <input
                        type="color"
                        class="color-input"
                        value="${style.textColor}"
                        data-style-section="${section.id}"
                        data-style-key="textColor"
                    >

                </div>


                <div class="form-group">

                    <label>
                        Divider
                    </label>

                    <input
                        type="color"
                        class="color-input"
                        value="${style.lineColor}"
                        data-style-section="${section.id}"
                        data-style-key="lineColor"
                    >

                </div>

            </div>

        `;


        container.appendChild(card);


        card.querySelector(
            '[data-style-key="font"]'
        ).value = style.font;

    });


    $$("[data-style-section]")
        .forEach(element => {

            element.addEventListener(
                "input",
                handleStyleChange
            );

            element.addEventListener(
                "change",
                handleStyleChange
            );

        });

}


function handleStyleChange(event) {

    const section =
        event.target.dataset.styleSection;

    const key =
        event.target.dataset.styleKey;

    state.sectionStyles[section][key] =
        event.target.value;

    applySectionStyles();

    autoSave();

}


function applySectionStyles() {

    sections.forEach(section => {

        const element =
            document.querySelector(
                `[data-section="${section.id}"]`
            );

        if (!element) return;


        const style =
            state.sectionStyles[section.id];


        element.style.fontFamily =
            style.font === "inherit"
                ? ""
                : style.font;


        element.style.color =
            style.textColor;


        const heading =
            element.querySelector("h3");


        if (heading) {

            heading.style.color =
                style.headingColor;

            heading.style.borderBottomColor =
                style.lineColor;

        }


        element.querySelectorAll(
            "p, .item-title, .item-subtitle, .item-date, .item-description"
        ).forEach(item => {

            item.style.color =
                style.textColor;

        });

    });

}


/* =========================================================
   AUTOSAVE
========================================================= */

function autoSave() {

    try {

        localStorage.setItem(
            "resumeforge-data",
            JSON.stringify(getResumeData())
        );

    } catch (error) {

        console.error(
            "Autosave error:",
            error
        );

    }

}


/* =========================================================
   LOAD SAVED DATA
========================================================= */

function loadSavedData() {

    let saved;

    try {

        saved = localStorage.getItem(
            "resumeforge-data"
        );

    } catch (error) {

        console.error(
            "Load error:",
            error
        );

        return false;

    }


    if (!saved) return false;


    try {

        const data =
            JSON.parse(saved);


        const p =
            data.personal || {};


        $("#fullName").value =
            p.fullName || "";

        $("#jobTitle").value =
            p.jobTitle || "";

        $("#email").value =
            p.email || "";

        $("#phone").value =
            p.phone || "";

        $("#location").value =
            p.location || "";

        $("#linkedin").value =
            p.linkedin || "";

        $("#github").value =
            p.github || "";

        $("#portfolio").value =
            p.portfolio || "";

        $("#summary").value =
            p.summary || "";


        $("#skills").value =
            (data.skills || []).join(", ");


        state.template =
            data.template ||
            "google-clean";


        if (data.sectionStyles) {

            Object.keys(data.sectionStyles)
                .forEach(section => {

                    if (
                        state.sectionStyles[section]
                    ) {

                        state.sectionStyles[section] = {

                            ...state.sectionStyles[section],

                            ...data.sectionStyles[section]

                        };

                    }

                });

        }


        $("#experienceContainer").innerHTML = "";

        $("#educationContainer").innerHTML = "";

        $("#projectContainer").innerHTML = "";

        $("#certificationContainer").innerHTML = "";


        (data.experience || [])
            .forEach(addExperience);


        (data.education || [])
            .forEach(addEducation);


        (data.projects || [])
            .forEach(addProject);


        (data.certifications || [])
            .forEach(addCertification);


        if (!data.experience?.length)
            addExperience();


        if (!data.education?.length)
            addEducation();


        if (!data.projects?.length)
            addProject();


        if (!data.certifications?.length)
            addCertification();


        return true;

    } catch (error) {

        console.error(
            "Load error:",
            error
        );

        return false;

    }

}


/* =========================================================
   SAVE BUTTON
========================================================= */

$("#saveBtn")
    .addEventListener(
        "click",
        () => {

            autoSave();

            toast(
                "Resume saved successfully."
            );

        }
    );


/* =========================================================
   FEEDBACK
   MAILTO
========================================================= */

$("#feedbackBtn")
    .addEventListener(
        "click",
        () => {

            const subject =
                encodeURIComponent(
                    "Resume Pro Feedback"
                );


            const body =
                encodeURIComponent(

`Hello Resume Pro Team,

I would like to provide the following feedback:





Thank you.`

                );


            /*
             * CHANGE THIS EMAIL ADDRESS
             * TO YOUR OWN SUPPORT EMAIL.
             */

            const feedbackEmail =
                "feedback@example.com";


            window.location.href =
                `mailto:${feedbackEmail}?subject=${subject}&body=${body}`;

        }
    );


/* =========================================================
   JSON EXPORT
========================================================= */

$("#jsonBtn")
    .addEventListener(
        "click",
        () => {

            const data =
                getResumeData();


            const blob =
                new Blob(

                    [
                        JSON.stringify(
                            data,
                            null,
                            2
                        )
                    ],

                    {
                        type:
                            "application/json"
                    }

                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href = url;

            link.download =
                "ResumeForge-Resume.json";


            document.body.appendChild(link);

            link.click();

            link.remove();


            URL.revokeObjectURL(url);


            toast(
                "JSON backup downloaded."
            );

        }
    );


/* =========================================================
   HTML EXPORT
========================================================= */

$("#htmlBtn")
    .addEventListener(
        "click",
        () => {

            const resume =
                $("#resume");


            const html = `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Resume</title>

<style>

body {
    margin: 0;
    background: white;
    font-family: Arial, sans-serif;
}

.resume {
    width: 210mm;
    min-height: 297mm;
    padding: 15mm 17mm;
    margin: auto;
    box-sizing: border-box;
}

a {
    color: #0563c1;
}

</style>

</head>

<body>

${resume.outerHTML}

</body>

</html>
            `;


            const blob =
                new Blob(

                    [html],

                    {
                        type:
                            "text/html"
                    }

                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href = url;

            link.download =
                "ResumeForge-Resume.html";


            document.body.appendChild(link);

            link.click();

            link.remove();


            URL.revokeObjectURL(url);


            toast(
                "HTML resume downloaded."
            );

        }
    );


/* =========================================================
   PDF
========================================================= */

function printResume() {

    window.print();

}


$("#pdfBtn")
    .addEventListener(
        "click",
        printResume
    );


$("#printResume")
    .addEventListener(
        "click",
        printResume
    );


/* =========================================================
   DOCX
   REAL WORD HYPERLINKS
========================================================= */

$("#docxBtn")
    .addEventListener(
        "click",
        exportDOCX
    );


async function exportDOCX() {

    try {

        if (
            typeof docx === "undefined"
        ) {

            alert(
                "DOCX library could not be loaded."
            );

            return;

        }


        const {

            Document,
            Packer,
            Paragraph,
            TextRun,
            ExternalHyperlink

        } = docx;


        const data =
            getResumeData();


        const children = [];


        function textParagraph(
            text,
            options = {}
        ) {

            if (!text) return;


            children.push(

                new Paragraph({

                    spacing: {

                        before:
                            options.before || 0,

                        after:
                            options.after ?? 50

                    },

                    children: [

                        new TextRun({

                            text,

                            bold:
                                options.bold || false,

                            size:
                                options.size || 19

                        })

                    ]

                })

            );

        }


        function sectionHeading(text) {

            children.push(

                new Paragraph({

                    spacing: {

                        before: 100,

                        after: 45

                    },

                    children: [

                        new TextRun({

                            text,

                            bold: true,

                            size: 21

                        })

                    ]

                })

            );

        }


        function addHyperlink(
            label,
            url
        ) {

            if (!url) return;


            const normalized =
                normalizeURL(url);


            children.push(

                new Paragraph({

                    spacing: {
                        after: 35
                    },

                    children: [

                        new ExternalHyperlink({

                            link: normalized,

                            children: [

                                new TextRun({

                                    text: label,

                                    color: "0563C1",

                                    underline: {}

                                })

                            ]

                        })

                    ]

                })

            );

        }


        /* NAME */

        textParagraph(

            data.personal.fullName ||
            "Your Name",

            {
                bold: true,
                size: 32,
                after: 35
            }

        );


        /* TITLE */

        textParagraph(

            data.personal.jobTitle,

            {
                size: 20,
                after: 45
            }

        );


        /* EMAIL */

        if (data.personal.email) {

            children.push(

                new Paragraph({

                    spacing: {
                        after: 35
                    },

                    children: [

                        new ExternalHyperlink({

                            link:
                                normalizeURL(
                                    data.personal.email,
                                    "email"
                                ),

                            children: [

                                new TextRun({

                                    text:
                                        data.personal.email,

                                    color: "0563C1",

                                    underline: {}

                                })

                            ]

                        })

                    ]

                })

            );

        }


        /* PHONE / LOCATION */

        textParagraph(

            [
                data.personal.phone,
                data.personal.location
            ]
                .filter(Boolean)
                .join(" | "),

            {
                size: 17,
                after: 35
            }

        );


        /* SOCIAL */

        if (data.personal.linkedin) {

            addHyperlink(
                "LinkedIn",
                data.personal.linkedin
            );

        }


        if (data.personal.github) {

            addHyperlink(
                "GitHub",
                data.personal.github
            );

        }


        if (data.personal.portfolio) {

            addHyperlink(
                "Portfolio",
                data.personal.portfolio
            );

        }


        /* SUMMARY */

        if (data.personal.summary) {

            sectionHeading(
                "PROFESSIONAL SUMMARY"
            );

            textParagraph(
                data.personal.summary
            );

        }


        /* SKILLS */

        if (data.skills.length) {

            sectionHeading("SKILLS");

            textParagraph(
                data.skills.join(", ")
            );

        }


        /* EXPERIENCE */

        if (data.experience.length) {

            sectionHeading("EXPERIENCE");


            data.experience.forEach(exp => {

                textParagraph(

                    [
                        exp.role,
                        exp.company
                    ]
                        .filter(Boolean)
                        .join(" | "),

                    {
                        bold: true,
                        size: 19,
                        after: 20
                    }

                );


                textParagraph(

                    [
                        exp.start,
                        exp.end
                    ]
                        .filter(Boolean)
                        .join(" - "),

                    {
                        size: 16,
                        after: 20
                    }

                );


                textParagraph(
                    exp.description
                );

            });

        }


        /* EDUCATION */

        if (data.education.length) {

            sectionHeading("EDUCATION");


            data.education.forEach(edu => {

                textParagraph(

                    [
                        edu.degree,
                        edu.school
                    ]
                        .filter(Boolean)
                        .join(" | "),

                    {
                        bold: true,
                        size: 19,
                        after: 20
                    }

                );


                textParagraph(

                    [
                        edu.year,
                        edu.grade
                    ]
                        .filter(Boolean)
                        .join(" | ")

                );

            });

        }


        /* PROJECTS */

        if (data.projects.length) {

            sectionHeading("PROJECTS");


            data.projects.forEach(project => {

                textParagraph(

                    project.name,

                    {
                        bold: true,
                        size: 19,
                        after: 20
                    }

                );


                textParagraph(
                    project.tech
                );


                textParagraph(
                    project.description
                );


                if (project.github) {

                    addHyperlink(
                        "Source Code",
                        project.github
                    );

                }


                if (project.live) {

                    addHyperlink(
                        "Live Project",
                        project.live
                    );

                }

            });

        }


        /* CERTIFICATIONS */

        if (data.certifications.length) {

            sectionHeading(
                "CERTIFICATIONS"
            );


            data.certifications.forEach(cert => {

                textParagraph(

                    cert.name,

                    {
                        bold: true,
                        size: 19,
                        after: 20
                    }

                );


                textParagraph(
                    cert.organization
                );


                if (cert.url) {

                    addHyperlink(
                        "Verify Credential",
                        cert.url
                    );

                }

            });

        }


        const documentFile =
            new Document({

                sections: [

                    {
                        properties: {},
                        children
                    }

                ]

            });


        const blob =
            await Packer.toBlob(
                documentFile
            );


        saveAs(
            blob,
            "ResumeForge-Resume.docx"
        );


        toast(
            "DOCX with hyperlinks downloaded."
        );

    }

    catch (error) {

        console.error(
            "DOCX Error:",
            error
        );

        alert(
            "DOCX export failed. Open F12 → Console for details."
        );

    }

}


/* =========================================================
   ADD BUTTONS
========================================================= */

$("#addExperienceBtn")
    .addEventListener(
        "click",
        () => {

            addExperience();

            updateResume();

        }
    );


$("#addEducationBtn")
    .addEventListener(
        "click",
        () => {

            addEducation();

            updateResume();

        }
    );


$("#addProjectBtn")
    .addEventListener(
        "click",
        () => {

            addProject();

            updateResume();

        }
    );


$("#addCertificationBtn")
    .addEventListener(
        "click",
        () => {

            addCertification();

            updateResume();

        }
    );


/* =========================================================
   GLOBAL INPUTS
========================================================= */

$$(
    "#fullName, #jobTitle, #email, #phone, #location, #linkedin, #github, #portfolio, #summary, #skills"
)
.forEach(input => {

    input.addEventListener(
        "input",
        updateResume
    );

});


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const loaded =
            loadSavedData();


        if (!loaded) {

            addExperience();

            addEducation();

            addProject();

            addCertification();

        }


        buildCustomizationPanel();

        applyTemplate();

        updateResume();

    }
);
