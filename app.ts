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

interface ResumeData {
  name: string;
  contact: string;
  github: string;
  linkedin: string;
  portfolio: string;
  education: string[];
  workExperience: string[];
  skills: string[];
}

const { jsPDF } = window as any;

const shareResumeButton = document.getElementById(
  "share-resume"
) as HTMLButtonElement;
const downloadResumeButton =
  document.getElementById(
    "download-resume"
  ) as HTMLButtonElement;

// Toggle visibility of resume actions
function toggleResumeActions(
  show: boolean
): void {
  const actions = document.getElementById(
    "resume-actions"
  );
  if (actions) {
    actions.style.display = show
      ? "block"
      : "none";
  }
}

function generateUniqueId(): string {
  return (
    "resume-" +
    Math.random().toString(36).substr(2, 9)
  );
}

function getResumeData(): ResumeData {
  const educationList: string[] = [];
  const workExperienceList: string[] = [];
  const skillsList: string[] = [];

  document
    .querySelectorAll(".education ul li")
    .forEach((li) => {
      if (li instanceof HTMLLIElement) {
        educationList.push(li.textContent || "");
      }
    });

  document
    .querySelectorAll(".work-experience ul li")
    .forEach((li) => {
      if (li instanceof HTMLLIElement) {
        workExperienceList.push(
          li.textContent || ""
        );
      }
    });

  document
    .querySelectorAll("#skills-list li")
    .forEach((li) => {
      if (li instanceof HTMLLIElement) {
        skillsList.push(li.textContent || "");
      }
    });

  return {
    name:
      (
        document.getElementById(
          "name"
        ) as HTMLElement
      ).textContent || "",
    contact:
      (
        document.getElementById(
          "contact"
        ) as HTMLElement
      ).textContent || "",
    github: (
      document.getElementById(
        "github-link"
      ) as HTMLAnchorElement
    ).href,
    linkedin: (
      document.getElementById(
        "linkedin-link"
      ) as HTMLAnchorElement
    ).href,
    portfolio: (
      document.getElementById(
        "portfolio-link"
      ) as HTMLAnchorElement
    ).href,
    education: educationList,
    workExperience: workExperienceList,
    skills: skillsList,
  };
}

function createShareableUrl(
  userName: any
): string {
  const baseUrl =
    window.location.href.split("?")[0];
  return `${baseUrl}/${userName}/resume`;
}

// Handle sharing resume
shareResumeButton.addEventListener(
  "click",
  () => {
    const uniqueId = generateUniqueId();
    const resumeData = getResumeData();
    const userName =
      document.getElementById(
        "name"
      )?.textContent;

    // Save to localStorage as a temporary solution
    localStorage.setItem(
      uniqueId,
      JSON.stringify(resumeData)
    );

    const shareableUrl =
      createShareableUrl(userName);
    prompt("Share this URL:", shareableUrl);
  }
);

// Handle downloading resume as PDF
downloadResumeButton.addEventListener(
  "click",
  () => {
    const doc = new jsPDF();
    doc.text(
      (
        document.getElementById(
          "resume-container"
        ) as HTMLElement
      ).innerText,
      10,
      10
    );
    doc.save("resume.pdf");
  }
);

// Load resume data based on URL parameter
function loadResumeFromUrl(): void {
  const urlParams = new URLSearchParams(
    window.location.search
  );
  const resumeId = urlParams.get("resume");

  if (resumeId) {
    const resumeData =
      localStorage.getItem(resumeId);
    if (resumeData) {
      const data: ResumeData =
        JSON.parse(resumeData);
      (
        document.getElementById(
          "name"
        ) as HTMLElement
      ).textContent = data.name;
      (
        document.getElementById(
          "contact"
        ) as HTMLElement
      ).textContent = data.contact;
      (
        document.getElementById(
          "github-link"
        ) as HTMLAnchorElement
      ).href = data.github;
      (
        document.getElementById(
          "linkedin-link"
        ) as HTMLAnchorElement
      ).href = data.linkedin;
      (
        document.getElementById(
          "portfolio-link"
        ) as HTMLAnchorElement
      ).href = data.portfolio;

      document.querySelector(
        ".education ul"
      )!.innerHTML = data.education
        .map((item) => `<li>${item}</li>`)
        .join("");
      document.querySelector(
        ".work-experience ul"
      )!.innerHTML = data.workExperience
        .map((item) => `<li>${item}</li>`)
        .join("");
      (
        document.getElementById(
          "skills-list"
        ) as HTMLElement
      ).innerHTML = data.skills
        .map((skill) => `<li>${skill}</li>`)
        .join("");

      toggleResumeActions(true);
    } else {
      alert("Resume not found");
    }
  }
}

// Load resume data on page load if URL contains resume ID
window.onload = loadResumeFromUrl;
