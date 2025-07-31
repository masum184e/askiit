import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const apiKey =
  process.env.GOOGLE_API_KEY ?? process.env.GOOGLE_GENAI_API_KEY ?? "";

if (!apiKey) {
  throw new Error(
    "Missing Google API key. Set GOOGLE_API_KEY (or GOOGLE_GENAI_API_KEY)."
  );
}

export const model = new ChatGoogleGenerativeAI({
  apiKey: apiKey,
  model: "gemini-2.0-flash",
});

export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
});

export default model;