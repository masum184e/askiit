import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { existsSync } from "node:fs";
// import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embeddings } from "../model";
import path from "node:path";
import fs from "node:fs/promises";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// const VECTOR_STORE_PATH = process.env.VECTOR_STORE_PATH || "vector_store";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});

export async function loadVectorStore(pdfDirPath: string): Promise<MemoryVectorStore> {
  // if (existsSync(VECTOR_STORE_PATH)) {
  //   const db = await MemoryVectorStore.load(VECTOR_STORE_PATH, embeddings);
  //   console.log("Loaded existing FAISS vector store from disk");
  //   return db;
  // }

  const files = await fs.readdir(pdfDirPath);
  const pdfFiles = files.filter(file => file.endsWith(".pdf"));

  const allDocs = [];
  for (const file of pdfFiles) {
    const loader = new PDFLoader(path.join(pdfDirPath, file));
    const docs = await loader.load();
    allDocs.push(...docs);
  }

  const splitDocs = await splitter.splitDocuments(allDocs);
  // const db = await FaissStore.fromDocuments(splitDocs, embeddings);
  // await db.save(VECTOR_STORE_PATH);
  const vectorstore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

  console.log("Created and saved new Memory vector store");
  return vectorstore;
}
