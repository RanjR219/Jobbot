const jobDescription = `
We're looking for a Backend Engineer with strong Node.js experience,
familiarity with Docker and Kubernetes for deployment, and interest in
integrating AI/LLM features into products. Experience with cloud platforms
like AWS is a plus.
`;

const resumeSnippet = `
Software developer with 3 years of experience building Node.js applications.
Recently learned Docker and Kubernetes, deployed containerized apps to a
local cluster. Currently building an AI-powered job application tool using
the Anthropic API.
`;

async function main() {
  const response = await fetch(
    "http://host.docker.internal:11434/api/generate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: `Here is a job description:\n${jobDescription}\n\nHere is my resume snippet:\n${resumeSnippet}\n\nWrite a short, tailored 3-sentence summary highlighting why I'm a good fit for this specific role.`,
        stream: false,
      }),
    },
  );

  const data = await response.json();
  console.log(data.response);
}

main();
