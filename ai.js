function displayQuote(response) {
  document.querySelector("#quote").innerHTML = "";

  new Typewriter("#quote", {
    strings: response.data.answer,
    autoStart: true,
    delay: 20,
    cursor: "",
  });
}

function generateQuote(event) {
  event.preventDefault();

  const promptInput = document.querySelector("#user-prompt").value;

  const apiKey = "bf12aoc52a0037b78bd1dd944a5e64ta";

  const prompt = `User prompt: ${promptInput}`;
  const context =
    "You are a data analyst and data scientist. Answer data-related questions using HTML <br/> for line breaks. Max 4 lines. End with <strong>Stay curious</strong>.";

  const apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  const quoteElement = document.querySelector("#quote");
  quoteElement.classList.remove("hidden");
  quoteElement.innerHTML = `<div class="blink">⏳ Generating response...</div>`;

  axios.get(apiUrl).then(displayQuote);
}

document
  .querySelector("#quote-generator")
  .addEventListener("submit", generateQuote);