const toggleSkillsButton =
  document.getElementById("toggle-skills");
const skillsList = document.getElementById(
  "skills-list"
);

if (toggleSkillsButton && skillsList) {
  toggleSkillsButton.addEventListener(
    "click",
    () => {
      if (skillsList.style.display === "none") {
        skillsList.style.display = "block";
      } else {
        skillsList.style.display = "none";
      }
    }
  );
}
