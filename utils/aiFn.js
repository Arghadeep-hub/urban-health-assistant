const { OpenAI } = require("langchain/llms/openai");
const { HNSWLib } = require("langchain/vectorstores/hnswlib");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const fs = require("fs");
const pdf = require("pdf-parse");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

function openaiCheker() {
  if (!OPENAI_API_KEY) {
    console.error(
      "OpenAI API key is not defined. Make sure you have set it in your environment."
    );
    process.exit(1); // Exit the process if the API key is not available
  }
}

// Function to read and parse multiple PDF files
async function readPDFsFromDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  const pdfContents = [];

  for (const file of files) {
    const filePath = `${directoryPath}/${file}`;
    if (filePath.endsWith(".pdf")) {
      const dataBuffer = fs.readFileSync(filePath);
      try {
        const pdfData = await pdf(dataBuffer);
        pdfContents.push(pdfData.text); // Push the extracted text from PDF
      } catch (error) {
        console.error(`Error reading PDF file: ${filePath}`, error);
      }
    }
  }

  return pdfContents;
}

// Initialize LangChain components with Curring Apprach
async function curringWithLangchain() {
  let docs;
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

  try {
    // Replace this with the path to the folder containing your PDF files
    const pdfTexts = await readPDFsFromDirectory("./pdf_docs");

    // Split the content of all PDF files into chunks
    docs = await textSplitter.createDocuments(pdfTexts);
  } catch (error) {
    console.error("Error creating documents:", error);
    process.exit(1);
  }

  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
  const vectorStoreRetriever = vectorStore.asRetriever();

  // Pass the environment API key here
  const openAiModel = new OpenAI({
    apiKey: OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
  }); // Added modelName

  return { openAiModel, vectorStoreRetriever };
}

module.exports = { openaiCheker, curringWithLangchain };
