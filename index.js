import express from "express";
const app = express();
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const PORT = 9000;

app.get("/", (req, res) => {
  res.send("hello world");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folderPath = path.join(__dirname, "files");

// Middleware to create the folder if it doesn't exist
fs.mkdirSync(folderPath, { recursive: true });

app.get("/create-file", (req, res) => {
  const timestamp = new Date().toISOString(); // Get the current timestamp
  const filename = `${new Date().toISOString().slice(0, 10)}_${Date.now()}.txt`; // Create a filename with current date-time
  const filePath = path.join(folderPath, filename); // Define the full file path

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      return res.status(500).send("Error creating file");
    }
    res.send(`File created: ${filename}`);
  });
});

app.listen(PORT, console.log("server started on port ", PORT));
