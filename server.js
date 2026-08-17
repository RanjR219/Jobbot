const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/tailor", async (req, res) => {
  try {
    const { jobDescription, resume } = req.body;
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: `Here is a job description:\n${jobDescription}\n\nHere is my resume snippet:\n${resume}\n\nWrite a short, tailored 3-sentence summary highlighting why I'm a good fit for this specific role.`,
        stream: false,
      }),
    });
    const data = await response.json();
    res.json({ summary: data.response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/health", async (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3001, () => console.log("JobBot server running on port 3001"));
