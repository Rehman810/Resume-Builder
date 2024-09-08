var toggleFormButton = document.getElementById("toggle-form");
var formSection = document.getElementById("form-section");
var resumeContainer = document.getElementById("resume-container");
var resumeForm = document.getElementById("resume-form");
var addEducationButton = document.getElementById("add-education");
var addExperienceButton = document.getElementById("add-experience");
var addSkillButton = document.getElementById("add-skill");
var educationFieldsContainer = document.getElementById("education-fields");
var experienceFieldsContainer = document.getElementById("experience-fields");
var skillsFieldsContainer = document.getElementById("skills-fields");
if (toggleFormButton &&
    formSection &&
    resumeContainer) {
    toggleFormButton.addEventListener("click", function () {
        if (formSection.style.display === "none" ||
            formSection.style.display === "") {
            formSection.style.display = "block";
            resumeContainer.style.display = "none";
            toggleFormButton.textContent =
                "Hide Resume Form";
        }
        else {
            formSection.style.display = "none";
            resumeContainer.style.display = "block";
            toggleFormButton.textContent =
                "Create Resume";
        }
    });
}
var toggleSkillsButton = document.getElementById("toggle-skills");
var skillsList = document.getElementById("skills-list");
if (toggleSkillsButton && skillsList) {
    toggleSkillsButton.addEventListener("click", function () {
        if (skillsList.style.display === "none" ||
            skillsList.style.display === "") {
            skillsList.style.display = "block";
            toggleSkillsButton.textContent =
                "Hide Skills";
        }
        else {
            skillsList.style.display = "none";
            toggleSkillsButton.textContent =
                "Show Skills";
        }
    });
}
addEducationButton.addEventListener("click", function () {
    var newEducationField = document.createElement("input");
    newEducationField.type = "text";
    newEducationField.classList.add("form-education");
    newEducationField.placeholder =
        "Enter additional education details";
    newEducationField.required = true;
    educationFieldsContainer.appendChild(newEducationField);
});
addExperienceButton.addEventListener("click", function () {
    var newExperienceField = document.createElement("input");
    newExperienceField.type = "text";
    newExperienceField.classList.add("form-experience");
    newExperienceField.placeholder =
        "Enter additional work experience";
    newExperienceField.required = true;
    experienceFieldsContainer.appendChild(newExperienceField);
});
addSkillButton.addEventListener("click", function () {
    var newSkillField = document.createElement("input");
    newSkillField.type = "text";
    newSkillField.classList.add("form-skills");
    newSkillField.placeholder =
        "Enter additional skill";
    newSkillField.required = true;
    skillsFieldsContainer.appendChild(newSkillField);
});
resumeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var fullName = document.getElementById("form-name").value;
    var email = document.getElementById("form-email").value;
    var githubLink = document.getElementById("form-github").value;
    var linkedinLink = document.getElementById("form-linkedin").value;
    var portfolioLink = document.getElementById("form-portfolio").value;
    var educationFields = document.querySelectorAll(".form-education");
    var educationList = Array.prototype.slice
        .call(educationFields)
        .map(function (field) { return field.value; });
    var experienceFields = document.querySelectorAll(".form-experience");
    var experienceList = Array.prototype.slice
        .call(experienceFields)
        .map(function (field) { return field.value; });
    var skillFields = document.querySelectorAll(".form-skills");
    var skillsList = Array.prototype.slice
        .call(skillFields)
        .map(function (field) { return field.value; });
    document.getElementById("name").textContent =
        fullName;
    document.getElementById("contact").textContent = "Email: ".concat(email);
    document
        .getElementById("github-link")
        .setAttribute("href", githubLink);
    document
        .getElementById("linkedin-link")
        .setAttribute("href", linkedinLink);
    document
        .getElementById("portfolio-link")
        .setAttribute("href", portfolioLink);
    document.querySelector(".education ul").innerHTML = educationList
        .map(function (item) { return "<li>".concat(item, "</li>"); })
        .join("");
    document.querySelector(".work-experience ul").innerHTML = experienceList
        .map(function (item) { return "<li>".concat(item, "</li>"); })
        .join("");
    document.getElementById("skills-list").innerHTML = skillsList
        .map(function (skill) { return "<li>".concat(skill, "</li>"); })
        .join("");
    formSection.style.display = "none";
    resumeContainer.style.display = "block";
    toggleFormButton.textContent =
        "Create Resume";
});
var jsPDF = window.jsPDF;
var shareResumeButton = document.getElementById("share-resume");
var downloadResumeButton = document.getElementById("download-resume");
// Toggle visibility of resume actions
function toggleResumeActions(show) {
    var actions = document.getElementById("resume-actions");
    if (actions) {
        actions.style.display = show
            ? "block"
            : "none";
    }
}
function generateUniqueId() {
    return ("resume-" +
        Math.random().toString(36).substr(2, 9));
}
function getResumeData() {
    var educationList = [];
    var workExperienceList = [];
    var skillsList = [];
    document
        .querySelectorAll(".education ul li")
        .forEach(function (li) {
        if (li instanceof HTMLLIElement) {
            educationList.push(li.textContent || "");
        }
    });
    document
        .querySelectorAll(".work-experience ul li")
        .forEach(function (li) {
        if (li instanceof HTMLLIElement) {
            workExperienceList.push(li.textContent || "");
        }
    });
    document
        .querySelectorAll("#skills-list li")
        .forEach(function (li) {
        if (li instanceof HTMLLIElement) {
            skillsList.push(li.textContent || "");
        }
    });
    return {
        name: document.getElementById("name").textContent || "",
        contact: document.getElementById("contact").textContent || "",
        github: document.getElementById("github-link").href,
        linkedin: document.getElementById("linkedin-link").href,
        portfolio: document.getElementById("portfolio-link").href,
        education: educationList,
        workExperience: workExperienceList,
        skills: skillsList,
    };
}
function createShareableUrl(userName) {
    var baseUrl = window.location.href.split("?")[0];
    return "".concat(baseUrl, "/").concat(userName, "/resume");
}
// Handle sharing resume
shareResumeButton.addEventListener("click", function () {
    var _a;
    var uniqueId = generateUniqueId();
    var resumeData = getResumeData();
    var userName = (_a = document.getElementById("name")) === null || _a === void 0 ? void 0 : _a.textContent;
    // Save to localStorage as a temporary solution
    localStorage.setItem(uniqueId, JSON.stringify(resumeData));
    var shareableUrl = createShareableUrl(userName);
    prompt("Share this URL:", shareableUrl);
});
// Handle downloading resume as PDF
downloadResumeButton.addEventListener("click", function () {
    var doc = new jsPDF();
    doc.text(document.getElementById("resume-container").innerText, 10, 10);
    doc.save("resume.pdf");
});
// Load resume data based on URL parameter
function loadResumeFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeId = urlParams.get("resume");
    if (resumeId) {
        var resumeData = localStorage.getItem(resumeId);
        if (resumeData) {
            var data = JSON.parse(resumeData);
            document.getElementById("name").textContent = data.name;
            document.getElementById("contact").textContent = data.contact;
            document.getElementById("github-link").href = data.github;
            document.getElementById("linkedin-link").href = data.linkedin;
            document.getElementById("portfolio-link").href = data.portfolio;
            document.querySelector(".education ul").innerHTML = data.education
                .map(function (item) { return "<li>".concat(item, "</li>"); })
                .join("");
            document.querySelector(".work-experience ul").innerHTML = data.workExperience
                .map(function (item) { return "<li>".concat(item, "</li>"); })
                .join("");
            document.getElementById("skills-list").innerHTML = data.skills
                .map(function (skill) { return "<li>".concat(skill, "</li>"); })
                .join("");
            toggleResumeActions(true);
        }
        else {
            alert("Resume not found");
        }
    }
}
// Load resume data on page load if URL contains resume ID
window.onload = loadResumeFromUrl;
