const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const { Resend } = require("resend");

dotenv.config();

const app = express();
const isProd = process.argv.includes("--prod") || process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 3000);
const resendApiKey = process.env.RESEND_API_KEY || "";
const resendFrom = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
const contactTo = process.env.CONTACT_TO_EMAIL || "noor.alam2002@outlook.com";
const siteName = process.env.WEBSITE_NAME || "SK. Nur Alam Portfolio";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

app.use(express.json({ limit: "1mb" }));

app.post("/api/contact", async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  if (message.length < 5) {
    return res.status(400).json({ error: "Message is too short." });
  }

  if (!resend) {
    return res.status(500).json({ error: "RESEND_API_KEY is not configured." });
  }

  try {
    const subject = `Portfolio contact from ${name || "Website"}`;
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;padding:24px;">
        <h2 style="margin:0 0 16px;">${escapeHtml(siteName)} contact request</h2>
        <p style="margin:0 0 12px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin:0 0 12px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        <div style="margin:18px 0 0;padding:16px;border-left:4px solid #111;background:#f7f7f7;white-space:pre-wrap;">${escapeHtml(message)}</div>
      </div>
    `;

    const text = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    const result = await resend.emails.send({
      from: resendFrom,
      to: [contactTo],
      replyTo: email,
      subject,
      html,
      text,
    });

    return res.json({ ok: true, id: result?.data?.id || null });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Failed to send email.",
    });
  }
});

async function start() {
  if (isProd) {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(port, () => {
    console.log(`Portfolio server running on http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
