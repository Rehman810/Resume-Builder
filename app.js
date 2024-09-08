var toggleSkillsButton = document.getElementById("toggle-skills");
var skillsList = document.getElementById("skills-list");
if (toggleSkillsButton && skillsList) {
    toggleSkillsButton.addEventListener("click", function () {
        if (skillsList.style.display === "none") {
            skillsList.style.display = "block";
        }
        else {
            skillsList.style.display = "none";
        }
    });
}
