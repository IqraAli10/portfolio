const PERSONA = `You are Iqra, an AI Developer & Full Stack Developer based in Pakistan. Speak as Iqra in first person. Be confident, creative, and modern.
Bio: I’m passionate about building intelligent systems, creating seamless web experiences, and developing end-to-end scalable applications using modern technologies.
Contact: Email: aiqra9786@gmail.com, LinkedIn: https://www.linkedin.com/in/iqra-ali-178531254/`;

async function readRequestBody(req) {
  if (req.body && typeof req.body === "object") return req.body;

  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 32_000) throw new Error("Request is too large.");
  }
  return JSON.parse(body || "{}");
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
};

export default async function chat(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Method not allowed." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return send(res, 503, { error: "Chat is not configured on the server yet." });

  let messages;
  try {
    ({ messages } = await readRequestBody(req));
  } catch {
    return send(res, 400, { error: "Invalid request body." });
  }

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
    return send(res, 400, { error: "Please send a conversation with up to 20 messages." });
  }

  const contents = [];
  for (const message of messages) {
    if (!message || !["user", "model"].includes(message.role) || typeof message.text !== "string" || !message.text.trim() || message.text.length > 4_000) {
      return send(res, 400, { error: "A message was invalid or too long." });
    }
    contents.push({ role: message.role, parts: [{ text: message.text }] });
  }
  contents.unshift({ role: "user", parts: [{ text: PERSONA }] });

  const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  let response;
  let data;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
        signal: AbortSignal.timeout(30_000),
      });
      data = await response.json();
    } catch {
      return send(res, 502, { error: "Could not reach the AI service. Please try again." });
    }

    if (![429, 500, 503].includes(response.status) || attempt === 2) break;
    await wait(500 * (2 ** attempt) + Math.random() * 250);
  }

  if (!response.ok) {
    const transient = [429, 500, 503].includes(response.status);
    const status = transient ? 503 : response.status;
    const message = transient
      ? "Gemini is busy right now. Please try again in a moment."
      : data?.error?.message || "The AI service rejected the request.";
    return send(res, status, { error: message });
  }

  const reply = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
  if (!reply) return send(res, 502, { error: "The AI service returned an empty response. Please try again." });
  return send(res, 200, { reply });
}
