import axios from "axios";

export async function parseTextNLU(text) {
  const baseURLRaw = process.env.NLU_URL || "";
  const baseURL = baseURLRaw.trim().replace(/\/+$/, ""); 
  const apiKey = (process.env.NLU_API_KEY || "").trim();

  if (!/^https?:\/\//i.test(baseURL)) {
    throw new Error(`Invalid NLU_URL: "${baseURLRaw}"`);
  }
  if (!apiKey) {
    throw new Error("Missing NLU_API_KEY");
  }

  const http = axios.create({
    baseURL,              
    timeout: 30000,     
    headers: {
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
  });

  const { data } = await http.post("/nlu", { text });
  return data;
}
