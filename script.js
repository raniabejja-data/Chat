const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// --- TA CLÉ API OPENROUTER ICI ---
const API_KEY = "TON_API_KEY_ICI"; 

async function askAI(question) {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost", // Requis par OpenRouter
                "X-Title": "Mon Chatbot Universel"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3-8b-instruct:free", // Modèle gratuit et très intelligent
                "messages": [
                    { "role": "system", "content": "Tu es un assistant utile qui répond à absolument toutes les questions de manière claire." },
                    { "role": "user", "content": question }
                ]
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error("Erreur:", error);
        return "Oups, j'ai eu un petit bug. Vérifie ta clé API !";
    }
}

// Fonction pour afficher les messages
function displayMessage(text, type) {
    const div = document.createElement('div');
    div.classList.add('msg', type);
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Action du bouton
sendBtn.addEventListener('click', async () => {
    const text = userInput.value.trim();
    if (text === "") return;

    displayMessage(text, 'user');
    userInput.value = "";

    // Afficher une bulle de chargement temporaire
    displayMessage("Réflexion en cours...", 'bot');
    
    const response = await askAI(text);
    
    // Remplacer le message de chargement par la vraie réponse
    chatBox.lastChild.innerText = response;
});

// Permettre d'envoyer avec la touche "Entrée"
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
