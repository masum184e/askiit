import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embeddings } from "../model";
import path from "node:path";
import fs from "node:fs/promises";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export async function loadVectorStore(pdfDirPath: string): Promise<MemoryVectorStore> {
  const files = await fs.readdir(pdfDirPath);
  const pdfFiles = files.filter(file => file.endsWith(".pdf"));

  const allDocs = [];
  for (const file of pdfFiles) {
    const loader = new PDFLoader(path.join(pdfDirPath, file));
    const docs = await loader.load();
    allDocs.push(...docs);
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const splitDocs = await splitter.splitDocuments(allDocs);
  const vectorstore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

  console.log("✅ Created in-memory vector store");
  return vectorstore;
}
