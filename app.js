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
