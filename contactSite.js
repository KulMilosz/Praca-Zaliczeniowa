export const contactSite = {
  elements: [
    {
      id: "contact-h2",
      type: "h2",
      content: "Contact me",
    },
    {
      class: "contactDiv",
      type: "div",
      children: [
        {
          id: "contact-form",
          type: "form",
          children: [
            {
              type: "label",
              class: "label",
              content: "Name",
              children: [
                {
                  id: "name",
                  type: "input",
                  attributes: {
                    type: "text",
                    placeholder: "Your Name",
                  },
                },
                { id: "nameError", type: "p", class: "error" },
              ],
            },
            {
              type: "label",
              class: "label",
              content: "Email",
              children: [
                {
                  id: "email",
                  type: "input",
                  attributes: {
                    type: "email",
                    placeholder: "email@example.com",
                  },
                },
                { id: "emailError", type: "p", class: "error" },
              ],
            },
            {
              type: "label",
              class: "label",
              content: "Message",
              children: [
                {
                  id: "message",
                  type: "input",
                  attributes: {
                    placeholder: "Hello, my name is...",
                  },
                },
                { id: "messageError", type: "p", class: "error" },
              ],
            },
          ],
        },
        {
          id: "contact-button",
          class: "multiButton",
          type: "button",
          content: "Send message",
        },
      ],
    },
  ],
};

export let isValidationEnabled = false;
export function setValidationEnabled(value) {
  isValidationEnabled = value;
}

export function validateForm(inputContent) {
  if (!isValidationEnabled) return true;
  let isValid = true;
  let errorMessage = "";
  const errorElement = document.getElementById(`${inputContent.id}Error`);
  if (inputContent.id === "name") {
    if (inputContent.value.trim() === "") {
      errorMessage = "Name is required.";
      isValid = false;
    } else if (inputContent.value.length < 3) {
      errorMessage = "The name must be at least 3 characters long.";
      isValid = false;
    } else if (inputContent.value.length > 20) {
      errorMessage = "The name must not exceed 20 characters.";
      isValid = false;
    }
  }
  if (inputContent.id === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (inputContent.value.trim() === "") {
      errorMessage = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(inputContent.value)) {
      errorMessage = "Please enter a valid email address.";
      isValid = false;
    }
  }
  if (inputContent.id === "message") {
    if (inputContent.value.trim() === "") {
      errorMessage = "The message cannot be empty.";
      isValid = false;
    } else if (inputContent.value.length > 100) {
      errorMessage =  "The message must not exceed 100 characters.";
      isValid = false;
    }
  }
  if (inputContent.id === "project-title") {
    if (inputContent.value.trim() === "") {
      errorMessage = "Title is required.";
      isValid = false;
    } else if (inputContent.value.length < 3) {
      errorMessage = "Title must be at least 3 characters long.";
      isValid = false;
    } else if (inputContent.value.length > 30) {
      errorMessage = "The title must not exceed 30 characters.";
      isValid = false;
    }
  }
  if (inputContent.id === "project-technologies") {
    if (inputContent.value.trim() === "") {
      errorMessage = "Please add some technologies.";
      isValid = false;
    } else if (inputContent.value.includes(" ")) {
      errorMessage = "To separate technologies use '  ,  '.";
      isValid = false;
    }
  }
  if (errorElement) {
    errorElement.textContent = errorMessage;
  }
  return isValid;
}
