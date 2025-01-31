const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = "";

    try {
        const response = await fetch("https://3000-nur8080-aibackend-7gl0do5x4a4.ws-us117.gitpod.io/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        if (data.reply) {
            chatBox.innerHTML += `<p><strong>Gemini AI:</strong> ${data.reply}</p>`;
        } else {
            chatBox.innerHTML += `<p><strong>Gemini AI:</strong> I'm not sure how to respond.</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        chatBox.innerHTML += `<p><strong>Gemini AI:</strong> Error connecting to AI.</p>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
