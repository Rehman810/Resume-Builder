const toggleFormButton = document.getElementById(
  "toggle-form"
);
const formSection = document.getElementById(
  "form-section"
);
const resumeContainer = document.getElementById(
  "resume-container"
);

const resumeForm = document.getElementById(
  "resume-form"
) as HTMLFormElement;
const addEducationButton =
  document.getElementById(
    "add-education"
  ) as HTMLButtonElement;
const addExperienceButton =
  document.getElementById(
    "add-experience"
  ) as HTMLButtonElement;
const addSkillButton = document.getElementById(
  "add-skill"
) as HTMLButtonElement;

const educationFieldsContainer =
  document.getElementById(
    "education-fields"
  ) as HTMLDivElement;
const experienceFieldsContainer =
  document.getElementById(
    "experience-fields"
  ) as HTMLDivElement;
const skillsFieldsContainer =
  document.getElementById(
    "skills-fields"
  ) as HTMLDivElement;

if (
  toggleFormButton &&
  formSection &&
  resumeContainer
) {
  toggleFormButton.addEventListener(
    "click",
    () => {
      if (
        formSection.style.display === "none" ||
        formSection.style.display === ""
      ) {
        formSection.style.display = "block";
        resumeContainer.style.display = "none";
        toggleFormButton.textContent =
          "Hide Resume Form";
      } else {
        formSection.style.display = "none";
        resumeContainer.style.display = "block";
        toggleFormButton.textContent =
          "Create Resume";
      }
    }
  );
}

const toggleSkillsButton =
  document.getElementById("toggle-skills");
const skillsList = document.getElementById(
  "skills-list"
);

if (toggleSkillsButton && skillsList) {
  toggleSkillsButton.addEventListener(
    "click",
    () => {
      if (
        skillsList.style.display === "none" ||
        skillsList.style.display === ""
      ) {
        skillsList.style.display = "block";
        toggleSkillsButton.textContent =
          "Hide Skills";
      } else {
        skillsList.style.display = "none";
        toggleSkillsButton.textContent =
          "Show Skills";
      }
    }
  );
}

addEducationButton.addEventListener(
  "click",
  () => {
    const newEducationField =
      document.createElement("input");
    newEducationField.type = "text";
    newEducationField.classList.add(
      "form-education"
    );
    newEducationField.placeholder =
      "Enter additional education details";
    newEducationField.required = true;
    educationFieldsContainer.appendChild(
      newEducationField
    );
  }
);

addExperienceButton.addEventListener(
  "click",
  () => {
    const newExperienceField =
      document.createElement("input");
    newExperienceField.type = "text";
    newExperienceField.classList.add(
      "form-experience"
    );
    newExperienceField.placeholder =
      "Enter additional work experience";
    newExperienceField.required = true;
    experienceFieldsContainer.appendChild(
      newExperienceField
    );
  }
);

addSkillButton.addEventListener("click", () => {
  const newSkillField =
    document.createElement("input");
  newSkillField.type = "text";
  newSkillField.classList.add("form-skills");
  newSkillField.placeholder =
    "Enter additional skill";
  newSkillField.required = true;
  skillsFieldsContainer.appendChild(
    newSkillField
  );
});

resumeForm.addEventListener(
  "submit",
  (event: Event) => {
    event.preventDefault();

    const fullName = (
      document.getElementById(
        "form-name"
      ) as HTMLInputElement
    ).value;
    const email = (
      document.getElementById(
        "form-email"
      ) as HTMLInputElement
    ).value;
    const githubLink = (
      document.getElementById(
        "form-github"
      ) as HTMLInputElement
    ).value;
    const linkedinLink = (
      document.getElementById(
        "form-linkedin"
      ) as HTMLInputElement
    ).value;
    const portfolioLink = (
      document.getElementById(
        "form-portfolio"
      ) as HTMLInputElement
    ).value;

    const educationFields =
      document.querySelectorAll(
        ".form-education"
      );
    const educationList = Array.prototype.slice
      .call(educationFields)
      .map((field) => field.value);

    const experienceFields =
      document.querySelectorAll(
        ".form-experience"
      );
    const experienceList = Array.prototype.slice
      .call(experienceFields)
      .map((field) => field.value);

    const skillFields = document.querySelectorAll(
      ".form-skills"
    );
    const skillsList = Array.prototype.slice
      .call(skillFields)
      .map((field) => field.value);

    document.getElementById("name")!.textContent =
      fullName;
    document.getElementById(
      "contact"
    )!.textContent = `Email: ${email}`;
    document
      .getElementById("github-link")!
      .setAttribute("href", githubLink);
    document
      .getElementById("linkedin-link")!
      .setAttribute("href", linkedinLink);
    document
      .getElementById("portfolio-link")!
      .setAttribute("href", portfolioLink);

    document.querySelector(
      ".education ul"
    )!.innerHTML = educationList
      .map((item) => `<li>${item}</li>`)
      .join("");
    document.querySelector(
      ".work-experience ul"
    )!.innerHTML = experienceList
      .map((item) => `<li>${item}</li>`)
      .join("");
    document.getElementById(
      "skills-list"
    )!.innerHTML = skillsList
      .map((skill) => `<li>${skill}</li>`)
      .join("");

    formSection!.style.display = "none";
    resumeContainer!.style.display = "block";
    toggleFormButton!.textContent =
      "Create Resume";
  }
);
