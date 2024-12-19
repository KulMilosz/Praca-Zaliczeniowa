export const projectsSite = {
  elements: [
    {
      id: "projects-div",
      type: "div",
      children: [
        { id: "projects-button", type: "button", content: "+ Add Project" },
        { id: "projects-wrapper", type: "div", children: [] },
      ],
    },
    {
      id: "overlay",
      type: "div",
      children: [
        {
          id: "projects-pop",
          type: "div",
          children: [
            { id: "close-button", type: "button", content: "x" },
            {
              id: "add-projects",
              type: "div",
              children: [
                {
                  id: "projects-form",
                  type: "form",
                  children: [
                    {
                      type: "label",
                      class: "projectsLabel",
                      content: "Project title",
                      children: [
                        {
                          id: "project-title",
                          class: "projectsInput",
                          type: "input",
                          attributes: {
                            type: "text",
                            placeholder: "Project title",
                          },
                        },
                        { id: "project-titleError", type: "p", class: "error" },
                      ],
                    },
                    {
                      type: "label",
                      class: "projectsLabel",
                      content: "Technologies",
                      children: [
                        {
                          id: "project-technologies",
                          class: "projectsInput",
                          type: "input",
                          attributes: {
                            type: "text",
                            placeholder: "html,css,javascript",
                          },
                        },
                        {
                          id: "project-technologiesError",
                          type: "p",
                          class: "error",
                        },
                      ],
                    },
                  ],
                },
                {
                  id: "projectsButton-div",
                  type: "div",
                  children: [
                    {
                      id: "addProjects-button",
                      class: "multiButton",
                      type: "button",
                      content: "+ Add project",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export function toggleProjects() {
  const projectsButton = document.getElementById("projects-button");
  const overlay = document.getElementById("overlay");
  projectsButton.addEventListener("click", () => {
    overlay.style.display = "flex";
  });
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });
}

export function addNewProject(title, technologies) {
  const techList = Array.isArray(technologies)
    ? technologies
    : technologies.split(",").map((tech) => tech.trim());
  const newProject = document.createElement("div");
  newProject.classList.add("newProject");
  const titleElement = document.createElement("h3");
  titleElement.classList.add("newProjectTitle");
  titleElement.textContent = title;
  newProject.appendChild(titleElement);
  const ulElement = document.createElement("ul");
  techList.forEach((tech) => {
    const liElement = document.createElement("li");
    liElement.textContent = tech;
    ulElement.appendChild(liElement);
  });
  newProject.appendChild(ulElement);
  const deleteElement = document.createElement("div");
  deleteElement.classList.add("deleteProject");
  newProject.appendChild(deleteElement);

  return newProject;
}
