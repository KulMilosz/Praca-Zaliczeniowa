export const messagesSite = {
  elements: [
    {
      id: "messages-div",
      type: "div",
      children: [
        { id: "no-messages", type: "div", content: "brak wiadomości" },
      ],
    },
  ],
};

export function addNewMessage(name, email, message) {
  return {
    type: "div",
    children: [
      { type: "span", content: `Name: ${name}` },
      { type: "span", content: `Email: ${email}` },
      { type: "span", content: `Message: ${message}` },
    ],
  };
}
