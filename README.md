# Urban Health Assistant

The **Urban Health Assistant** is a web application that integrates D-ID with LangChain and OpenAI. It provides an interface to interact with documents, enabling functionalities like PDF parsing and language processing. The project is structured using Node.js, Express, and other supporting libraries.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [License](#license)

## Features

- **PDF Parsing**: Extracts data from PDF documents.
- **Language Processing**: Utilizes OpenAI's API through LangChain for processing and interacting with data.
- **Express Server**: Web server to manage routes and interactions.
- **D-ID Integration**: Connects to D-ID for avatar-based interactions.
- **Frontend Integration**: EJS templates and CSS for frontend.

## Project Structure

```
├── pdf_docs/                     # Directory for PDF files
│   ├── mh2.pdf
│   ├── mh3.pdf
│   ├── mh4.pdf
│   ├── mh5.pdf
│   ├── mw1.pdf
│   └── mw6.pdf
├── public/                       # Public assets
│   ├── css/
│   │   └── style.css             # Custom CSS styles
│   ├── img/
│   │   ├── avtarVid.webm         # Video file for avatar interaction
│   │   └── favicon.ico           # Favicon for the app
│   └── js/
│       ├── langindex.js          # JavaScript for language indexing
│       └── streaming-client-api.js
├── utils/
│   └── aiFn.js                   # Utility functions for AI interaction
├── views/
│   └── index.ejs                 # Main EJS template
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── app.js                        # Main server file
├── package.json                  # Project metadata and dependencies
└── yarn.lock                     # Yarn lock file
```

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd urban_health_assistant
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and specify necessary environment variables. Example:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the server**:

   ```bash
   yarn dev
   ```

## Usage

1. Place your PDF files in the `pdf_docs` directory.
2. Access the app through the local server, and interact with the data using the provided interface.

## Dependencies

- **dotenv**: Handles environment variables.
- **ejs**: Templating engine for rendering HTML.
- **express**: Web framework for Node.js.
- **fs**: File system operations.
- **hnswlib-node**: Efficient index for nearest neighbor search.
- **langchain**: Library for interacting with OpenAI.
- **node-fetch**: HTTP requests library.
- **nodemon**: Auto-restart for server during development.
- **openai**: Library to interact with OpenAI's API.
- **pdf-parse**: Parses PDF documents.

## Scripts

- **start**: Starts the server.

  ```bash
  yarn start
  ```

- **dev**: Starts the server with `nodemon` for development.

  ```bash
  yarn dev
  ```

## License

This project is licensed under the MIT License.
