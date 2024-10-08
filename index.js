const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatToggle = document.querySelector(".chatbot-toggler")
const chatbotclose = document.querySelector(".close-btn")
const API_KEY = "AIzaSyBTcTJf-oABaF97U-Ix2zqDeOwrWo1PbMc"
// const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;


let userMessage;
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent=message;
    return chatLi;
}
const generateResponse = async (userMessage, incomingChatli) => {
    const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBTcTJf-oABaF97U-Ix2zqDeOwrWo1PbMc";

    const messageElement = incomingChatli.querySelector("p")

    try {
        const resData = await fetch(API_URL,
            {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    // contents: [{
                    //     role: "user",
                    //     parts: [{ text: messageElement }]
                    // }]
                    contents: [{ parts: [{ text: userMessage }] }]
                })
            }
        )

        const Adata = await resData.json();
        const abdata = Adata?.candidates[0].content.parts[0].text;
        messageElement.textContent = abdata;
    } catch 
        (err)
        {
        messageElement.classList.add("err")
        messageElement.textContent = "Opps! something went wrong. Plese try again letter";
    } 
    finally {
        chatbox.scrollTo(0, chatbox.scrollHeight);

    }
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    chatInput.value = ""    
    if (!userMessage) return;
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
        const incomingChatli = createChatLi("typing...", "incoming")
        chatbox.appendChild(incomingChatli);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(userMessage, incomingChatli);
    }, 400
    )
}

chatToggle.addEventListener('click',()=>{document.body.classList.toggle("show-chatbot")})
chatbotclose.addEventListener('click',()=>{document.body.classList.remove("show-chatbot")})
sendChatBtn.addEventListener("click", handleChat);