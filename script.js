
// =====================================
// LOAD PORTFOLIO DATA FROM JSON
// =====================================

document.addEventListener("DOMContentLoaded", loadPortfolio);

async function loadPortfolio() {

    try {

        const response = await fetch("datas.json");

        if (!response.ok) {
            throw new Error("Unable to load portfolio data.");
        }

        const data = await response.json();

        // Display all portfolio sections
        displayPersonalDetails(data.personal);
        displayAbout(data.about, data.personal);
        displaySkills(data.skills);
        displayProjects(data.projects);
        displayEducation(data.education);
        displayCertifications(data.certifications);
        displaySocialLinks(data.socialLinks);

        // Current year
        document.getElementById("currentYear").textContent =
            new Date().getFullYear();

    } catch (error) {

        console.error("Portfolio loading error:", error);

        document.querySelector("main").innerHTML = `
            <div class="container text-center py-5">
                <h2>Unable to Load Portfolio</h2>
                <p>Please check your data.json file and run the project
                using a local server.</p>
            </div>
        `;

    }

}


// =====================================
// PERSONAL DETAILS
// =====================================

function displayPersonalDetails(personal) {

    document.title = personal.name + " | Personal Portfolio";

    document.getElementById("navLogo").textContent =
        personal.name;

    document.getElementById("heroName").textContent =
        personal.name;

    document.getElementById("heroRole").textContent =
        personal.role;

    document.getElementById("heroIntro").textContent =
        personal.introduction;

    document.getElementById("heroGoal").textContent =
        "Career Goal: " + personal.careerGoal;

    document.getElementById("profileImage").src =
        personal.profileImage;

    document.getElementById("profileImage").alt =
        personal.name + " Profile Photo";

    document.getElementById("resumeBtn").href =
        personal.resume;

    document.getElementById("footerName").textContent =
        personal.name;

    document.getElementById("copyrightName").textContent =
        personal.name;

}


// =====================================
// ABOUT ME
// =====================================

function displayAbout(about, personal) {

    document.getElementById("aboutDescription").textContent =
        about.description;

    document.getElementById("aboutEmail").textContent =
        personal.email;

    document.getElementById("aboutPhone").textContent =
        personal.phone;

}


// =====================================
// DISPLAY SKILLS
// =====================================

function displaySkills(skills) {

    const container =
        document.getElementById("skillsContainer");

    container.innerHTML = "";

    skills.forEach(skill => {

        const card = document.createElement("div");

        card.className = "col-6 col-md-4 col-lg-4";

        card.innerHTML = `
            <div class="skill-card">

                <i class="${skill.icon} skill-icon"></i>

                <h4>${skill.name}</h4>

                <p>${skill.description}</p>

                <div class="skill-level">
                    <div class="skill-progress"
                         style="width: ${skill.level}%">
                    </div>
                </div>

                <small>${skill.level}%</small>

            </div>
        `;

        container.appendChild(card);

    });

}


// =====================================
// DISPLAY PROJECTS
// =====================================

function displayProjects(projects) {

    const container =
        document.getElementById("projectsContainer");

    container.innerHTML = "";

    projects.forEach(project => {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        const technologies = project.technologies.map(tech => `
            <span class="tech-badge">${tech}</span>
        `).join("");

        card.innerHTML = `
            <div class="project-card">

                <img src="${project.image}"
                     alt="${project.name}">

                <div class="project-content">

                    <h4>${project.name}</h4>

                    <p>${project.description}</p>

                    <div>${technologies}</div>

                    <a href="${project.link}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="project-link">

                        View Project
                        <i class="bi bi-arrow-up-right"></i>

                    </a>

                </div>

            </div>
        `;

        container.appendChild(card);

    });

}


// =====================================
// DISPLAY EDUCATION
// =====================================

function displayEducation(education) {

    const container =
        document.getElementById("educationContainer");

    container.innerHTML = "";

    education.forEach(item => {

        const card = document.createElement("div");

        card.className = "education-card mb-4";

        card.innerHTML = `
            <h4>${item.course}</h4>

            <p>
                <i class="bi bi-building"></i>
                <strong>College:</strong> ${item.college}
            </p>

            <p>
                <i class="bi bi-calendar"></i>
                <strong>Duration:</strong> ${item.duration}
            </p>

            <p>
                <i class="bi bi-book"></i>
                <strong>Semester:</strong> ${item.semester}
            </p>

            <p>
                <i class="bi bi-award"></i>
                <strong>Academic Details:</strong> ${item.details}
            </p>
        `;

        container.appendChild(card);

    });

}


// =====================================
// DISPLAY CERTIFICATIONS
// =====================================

function displayCertifications(certifications) {

    const container =
        document.getElementById("certificationsContainer");

    container.innerHTML = "";

    certifications.forEach(certificate => {

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `
            <div class="certificate-card">

                <i class="bi bi-patch-check-fill"></i>

                <h5>${certificate.name}</h5>

                <p>${certificate.issuer}</p>

                <small>${certificate.year}</small>

            </div>
        `;

        container.appendChild(card);

    });

}


// =====================================
// DISPLAY SOCIAL MEDIA LINKS
// =====================================

function displaySocialLinks(socialLinks) {

    const container =
        document.getElementById("socialLinks");

    container.innerHTML = "";

    socialLinks.forEach(social => {

        const link = document.createElement("a");

        link.href = social.url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.setAttribute("aria-label", social.name);

        link.innerHTML = `<i class="${social.icon}"></i>`;

        container.appendChild(link);

    });

}


// =====================================
// CONTACT FORM VALIDATION
// =====================================

document.getElementById("contactForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("contactName").value.trim();

        const email =
            document.getElementById("contactEmail").value.trim();

        const subject =
            document.getElementById("contactSubject").value.trim();

        const message =
            document.getElementById("contactMessage").value.trim();

        const formMessage =
            document.getElementById("formMessage");

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check empty fields
        if (!name || !email || !subject || !message) {

            formMessage.textContent =
                "Please fill in all fields.";

            formMessage.className =
                "mt-3 text-danger";

            return;

        }

        // Validate email
        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            formMessage.className =
                "mt-3 text-danger";

            return;

        }

        // Success message
        formMessage.textContent =
            "Your message has been validated successfully! " +
            "This demo form does not send messages yet.";

        formMessage.className =
            "mt-3 text-success";

        // Clear form
        this.reset();

    });
