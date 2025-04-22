import fetch from "node-fetch";

export async function generateWithOllama(userInput) {
    const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral",
          prompt: `Napravi cjenik od: ${userInput}`,
          stream: false,
        }),
      });
    
      const data = await response.json();
    
      return data.response;
}
