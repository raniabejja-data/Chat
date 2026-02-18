async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value;
  const chatBox = document.getElementById("chat-box");

  if (message === "") return;

  // User message
  chatBox.innerHTML += `
    <div class="message user">
      <p>${message}</p>
      <img src="IMG_7006.jpeg">
    </div>
  `;

  input.value = "";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].message.content;

  chatBox.innerHTML += `
    <div class="message bot">
      <img src="IMG_7004.jpeg">
      <p>${botReply}</p>
    </div>
  `;

  chatBox.scrollTop = chatBox.scrollHeight;
}
