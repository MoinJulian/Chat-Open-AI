// HTML elements
const formElement = document.getElementById("form");
const outputElement = document.getElementById("output");
const textArea = document.querySelector("textarea");

//handle orm submission
formElement.addEventListener("submit", async (e) => {
  // prevent page reload
  e.preventDefault();

  // show loading status
  outputElement.innerText = "Loading...";

  // make request to /completion endpoint
  const response = await fetch("/completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: textArea.value,
    }),
  });

  //convert answer to json
  const data = await response.json();

  if (data.answer) {
    // show answer in output Element
    outputElement.innerText = data.answer;
  } else if (data.error) {
    outputElement.innerText = data.error;
  }
});
