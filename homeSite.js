export const homeSite = {
  elements: [
    {
      class: "homeDiv",
      type: "div",
      children: [
        {
          id: "home-photo",
          type: "div",
        },
        {
          id: "textHome-div",
          type: "div",
          children: [
            {
              class: "homeTitles",
              type: "span",
              content: "About me",
            },
            {
              type: "span",
              content:
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
            },
          ],
        },
        {
          id: "skills-div",
          type: "div",
          children: [
            { class: "homeTitles", type: "span", content: "My Skills" },
            { id: "skills-list", type: "div" },
          ],
        },
      ],
    },
    {
      id: "home-projects",
      type: "div",
      children: [],
    },
    {
      id: "arrows-div",
      type: "div",
      children: [
        { id: "home-left", type: "div" },
        { id: "home-right", type: "div" },
      ],
    },
  ],
};

export const skills = [
  { title: "HTML", years: "5 years"},
  { title: "CSS", years: "10 years"},
  { title: "JavaScript", years: "3 years"},
  { title: "Git", years: "2 years"},
  { title: "Figma", years: "2 years"},
  { title: "Chrome", years: "1 year"},
  { title: "VSCode", years: "2 years"},
  { title: "GitHub", years: "0 years"},
];

export function renderSkills() {
  const skillsListDiv = document.getElementById("skills-list");
  skillsListDiv.innerHTML = "";

  skills.forEach((skill) => {
    const skillDiv = document.createElement("div");
    skillDiv.classList.add("skillItem");
    const skillContentDiv = document.createElement("div");
    skillContentDiv.classList.add("skillContent");

    const skillLogo = document.createElement("div");
    skillLogo.classList.add("skillLogo");
    skillLogo.style.backgroundImage = `url(img/${skill.title}.png)`;

    skillContentDiv.appendChild(skillLogo);
    const skillTextDiv = document.createElement("div");
    skillTextDiv.classList.add("skillText");
    const skillTitle = document.createElement("span");
    skillTitle.classList.add("skillTitle");
    skillTitle.textContent = skill.title;
    skillTextDiv.appendChild(skillTitle);

    const totalDots = 5;
    const yearsExperience = parseInt(skill.years);

    const fadedDots = Math.min(yearsExperience, totalDots);

    const progressDots = document.createElement("div");
    progressDots.classList.add("progressDots");

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i < fadedDots) {
        dot.classList.add("filled"); 
      } else {
        dot.classList.add("faded"); 
      }
      progressDots.appendChild(dot);
    }

    skillTextDiv.appendChild(progressDots);

    const skillYears = document.createElement("span");
    skillYears.classList.add("skillYears");
    skillYears.textContent = skill.years;
    skillTextDiv.appendChild(skillYears);
    skillContentDiv.appendChild(skillTextDiv);
    skillDiv.appendChild(skillContentDiv);
    skillsListDiv.appendChild(skillDiv);
  });
}

