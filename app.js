require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const { openaiCheker, curringWithLangchain } = require("./utils/aiFn");
const { RetrievalQAChain } = require("langchain/chains");

openaiCheker();
const langchainFn = curringWithLangchain();

app.use(express.json());

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route for rendering the index.ejs template
app.get("/", (req, res) => {
  res.render("index");
});

// Define a route to handle queries
app.post("/query", async (req, res) => {
  const chain = RetrievalQAChain.fromLLM(
    (await langchainFn).openAiModel,
    (await langchainFn).vectorStoreRetriever
  );
  try {
    const response = await chain.call({ query: req.body.query });
    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
