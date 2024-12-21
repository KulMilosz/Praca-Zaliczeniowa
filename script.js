import { homeSite, renderSkills } from "./homeSite.js";
import { aboutSite } from "./aboutSite.js";
import { projectsSite } from "./projectsSite.js";
import { contactSite, setValidationEnabled } from "./contactSite.js";
import { messagesSite } from "./messagesSite.js";
import { validateForm } from "./contactSite.js";
import { addNewMessage } from "./messagesSite.js";
import { addNewProject } from "./projectsSite.js";

const hamburgerMenu = document.getElementById("hamburger-menu");
const menu = document.getElementById("menu");

hamburgerMenu.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburgerMenu.classList.toggle("active");
});

const heroText1 = document.getElementById("hero-t1");
const heroText2 = document.getElementById("hero-t2");
let showNoMessages;
const projects = [];

const personalInfo = {
  name: "Jan",
  surname: "Kowalski",
  phoneNumber: "+123 456 789",
  email: "jan_kowalski@gmail.com",
};

function renderPage(site) {
  const main = document.getElementById("main");
  main.innerHTML = "";

  site.elements.forEach((el) => {
    const newElement = createElement(el);
    if (newElement) {
      main.appendChild(newElement);
    }
  });

  const contactButton = document.getElementById("contact-button");

  if (contactButton) {
    contactButton.addEventListener("click", function () {
      setValidationEnabled(true);

      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const messageField = document.getElementById("message");

      if (nameField && emailField && messageField) {
        const isNameValid = validateForm(nameField);
        const isEmailValid = validateForm(emailField);
        const isMessageValid = validateForm(messageField);

        if (isNameValid && isEmailValid && isMessageValid) {
          const newName = nameField.value;
          const newEmail = emailField.value;
          const newMessage = messageField.value;
          nameField.value = "";
          emailField.value = "";
          messageField.value = "";
          setValidationEnabled(false);
          const nameError = document.getElementById("nameError");
          const emailError = document.getElementById("emailError");
          const messageError = document.getElementById("messageError");
          if (nameError) nameError.textContent = "";
          if (emailError) emailError.textContent = "";
          if (messageError) messageError.textContent = "";
          const newMessageDiv = addNewMessage(newName, newEmail, newMessage);
          messagesSite.elements[0].children.push(newMessageDiv);
          showNoMessages = "No";
        }
      }
    });
  }

  const projectsOverlay = document.getElementById("overlay");
  const addProjectsButton = document.getElementById("projects-button");
  const closeOverlayButton = document.getElementById("close-button");

  if (addProjectsButton) {
    addProjectsButton.addEventListener("click", () => {
      projectsOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }

  if (closeOverlayButton) {
    closeOverlayButton.addEventListener("click", () => {
      projectsOverlay.style.display = "none";
      document.body.style.overflow = "";
    });
  }
}

function createElement(el) {
  if (!el.type) {
    return "brak elementu";
  }

  let newElement;

  if (el.type === "photo") {
    newElement = document.createElement("img");
    if (el.src) newElement.src = el.src;
    if (el.alt) newElement.alt = el.alt;
  } else {
    newElement = document.createElement(el.type);
    if (el.content) newElement.textContent = el.content;
  }

  if (el.id) newElement.id = el.id;
  if (el.class) newElement.classList.add(...el.class.split(" "));
  if (el.attributes) {
    for (let [key, value] of Object.entries(el.attributes)) {
      newElement.setAttribute(key, value);
    }
  }

  if (el.children) {
    el.children.forEach((child) => {
      const childElement = createElement(child);
      if (childElement) newElement.appendChild(childElement);
    });
  }

  return newElement;
}

function resetLinkColors() {
  const links = document.querySelectorAll(
    ".home-link, .about-link, .projects-link, .contact-link, .messages-link"
  );
  links.forEach((link) => {
    link.style.color = "";
  });
}
function setActiveLink(link) {
  if (link) {
    link.style.color = "#ADB6C4";
  }
}

function setupMenuLinks() {
  const links = document.querySelectorAll(
    ".home-link, .about-link, .projects-link, .contact-link, .messages-link"
  );

  links.forEach((link) => {
    link.addEventListener("click", function () {
      const clickedClass = link.classList[0];
      resetLinkColors();
      const matchingLinks = document.querySelectorAll(`.${clickedClass}`);
      matchingLinks.forEach((matchedLink) => {
        setActiveLink(matchedLink);
      });
      if (link.classList.contains("home-link")) {
        heroText1.textContent =
          personalInfo.name.toUpperCase() +
          " " +
          personalInfo.surname.toUpperCase();
        heroText2.textContent = "WEB-DESIGNER";
        renderPage(homeSite);
        renderSkills();
        const projectsHome = document.getElementById("home-projects");
        renderProjects(projectsHome, projects, "home");
        const leftArrow = document.getElementById("home-left");
        const rightArrow = document.getElementById("home-right");

        if (leftArrow && rightArrow) {
          leftArrow.addEventListener("click", () => {
            shiftProjects("left", projectsHome, projects, "home");
          });

          rightArrow.addEventListener("click", () => {
            shiftProjects("right", projectsHome, projects, "home");
          });
        }
      } else if (link.classList.contains("projects-link")) {
        heroText1.textContent = "MY PROJECTS";
        heroText2.textContent = "MADE WITH LOVE";
        menu.classList.toggle("active");
        renderPage(projectsSite);
        const addProjectButton = document.getElementById("addProjects-button");
        const projectsWrapper = document.getElementById("projects-wrapper");
        renderProjects(projectsWrapper, projects, "projects");
        setupDeleteProjectButtons();
        addProjectsToSite(addProjectButton, projectsWrapper);
      } else if (link.classList.contains("about-link")) {
        heroText1.textContent = "ABOUT ME";
        heroText2.textContent =
          "IT’S A-ME, " + personalInfo.name.toUpperCase() + "!";
        renderPage(aboutSite);
        const aboutButton = document.getElementById("about-button");
        if (aboutButton) {
          aboutButton.addEventListener("click", function () {
            resetLinkColors();
            const contactLinks = document.querySelectorAll(".contact-link");
            contactLinks.forEach((contactLink) => {
              setActiveLink(contactLink);
            });
            heroText1.textContent = "CONTACT ME";
            heroText2.textContent = "SAY HELLO TO ME";
            renderPage(contactSite);
          });
        }
      } else if (link.classList.contains("contact-link")) {
        heroText1.textContent = "CONTACT ME";
        heroText2.textContent = "SAY HELLO TO ME";
        renderPage(contactSite);
      } else if (link.classList.contains("messages-link")) {
        heroText1.textContent = "MESSAGES";
        heroText2.textContent = "MESSAGE FROM THE INTERESTED PERSON";
        renderPage(messagesSite);
        if (showNoMessages === "No") {
          hideObjectById("no-messages");
        }
      }
      menu.classList.remove("active");
      hamburgerMenu.classList.remove("active");
    });
  });
  const homeLinks = document.querySelectorAll(".home-link");
  homeLinks.forEach((homeLink) => {
    setActiveLink(homeLink);
  });
}

function hideObjectById(id) {
  const objectToHide = document.getElementById(id);
  objectToHide.style.display = "None";
}

function addProjectsToSite(button, projectsWrapper) {
  if (button) {
    button.addEventListener("click", function () {
      setValidationEnabled(true);
      if (titleField && technologiesField) {
        const isTitleValid = validateForm(titleField);
        const isTechnologiesValid = validateForm(technologiesField);
        if (isTitleValid && isTechnologiesValid) {
          const title = titleField.value;
          const technologies = technologiesField.value;
          titleField.value = "";
          technologiesField.value = "";
          setValidationEnabled(false);
          const titleError = document.getElementById("project-titleError");
          const technologiesError = document.getElementById(
            "project-technologiesError"
          );
          if (titleError) titleError.textContent = "";
          if (technologiesError) technologiesError.textContent = "";

          const newProjectDiv = addNewProject(title, technologies);
          projects.push(newProjectDiv);
          renderProjects(projectsWrapper, projects);
          setupDeleteProjectButtons();
        }
      }
    });
  }

  const titleField = document.getElementById("project-title");
  const technologiesField = document.getElementById("project-technologies");

  if (nameField) {
    nameField.addEventListener("input", function () {
      validateForm(nameField);
    });
  }

  if (emailField) {
    emailField.addEventListener("input", function () {
      validateForm(emailField);
    });
  }

  if (messageField) {
    messageField.addEventListener("input", function () {
      validateForm(messageField);
    });
  }

  if (titleField) {
    titleField.addEventListener("input", function () {
      validateForm(titleField);
    });
  }

  if (technologiesField) {
    technologiesField.addEventListener("input", function () {
      validateForm(technologiesField);
    });
  }
}

let projectsIndex = 0;

function renderProjects(projectsWrapper, projects, projectType) {
  projectsWrapper.innerHTML = "";

  if (projectType === "projects" && projects.length === 0) {
    projectsWrapper.textContent = "Brak nowych projektów";
    return;
  }

  let projectsToRender = [];

  if (projectType === "home") {
    const totalProjects = projects.length;

    for (let i = 0; i < 3; i++) {
      const currentIndex = (projectsIndex + i) % totalProjects;
      projectsToRender.push(projects[currentIndex]);
    }
  } else {
    projectsToRender = projects;
  }

  projectsToRender.forEach((project) => {
    if (projectType === "home") {
      const deleteButtons = project.querySelectorAll(".deleteProject");
      deleteButtons.forEach((button) => {
        button.style.display = "none";
      });
    }

    if (projectType === "projects") {
      const deleteButtons = project.querySelectorAll(".deleteProject");
      deleteButtons.forEach((button) => {
        button.style.display = "flex";
      });
    }

    projectsWrapper.appendChild(project);
  });

  if (projectType === "home") {
    const arrowButtonsDiv = document.getElementById("arrows-div");

    if (arrowButtonsDiv) {
      arrowButtonsDiv.style.display = projects.length > 3 ? "flex" : "none";
    }
  }
}

function shiftProjects(direction, projectsWrapper, projects, projectType) {
  if (projectType !== "home") return;

  const totalProjects = projects.length;

  if (direction === "left") {
    projectsIndex = (projectsIndex - 1 + totalProjects) % totalProjects;
  } else if (direction === "right") {
    projectsIndex = (projectsIndex + 1) % totalProjects;
  }

  renderProjects(projectsWrapper, projects, projectType);
}

function setupDeleteProjectButtons() {
  const deleteButtons = document.querySelectorAll(".deleteProject");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const projectElement = button.closest(".newProject");
      if (projectElement) {
        const titleElement = projectElement.querySelector(".newProjectTitle");
        if (titleElement) {
          const projectTitle = titleElement.textContent;

          projectElement.remove();

          const projectIndex = projects.findIndex(
            (project) =>
              project.querySelector(".newProjectTitle").textContent ===
              projectTitle
          );

          if (projectIndex !== -1) {
            projects.splice(projectIndex, 1);
          }
          const projectsWrapper = document.getElementById("projects-wrapper");
          if (projects.length === 0) {
            projectsWrapper.textContent = "Brak nowych projektów";
          }
        }
      }
    });
  });
}

setupMenuLinks();
renderPage(homeSite);
renderSkills();
