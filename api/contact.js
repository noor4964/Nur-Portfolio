const { Resend } = require("resend");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const resendFrom = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
const contactTo = process.env.CONTACT_TO_EMAIL || "noor.alam2002@outlook.com";
const siteName = process.env.WEBSITE_NAME || "SK. Nur Alam Portfolio";

module.exports = async function (req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST");
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  try {
    const { name = "", email = "", message = "" } = req.body || {};
    const n = String(name || "").trim();
    const e = String(email || "").trim();
    const m = String(message || "").trim();

    if (!n || !e || !m) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: "Name, email, and message are required." }));
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: "Please provide a valid email address." }));
    }

    if (m.length < 5) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: "Message is too short." }));
    }

    if (!resend) {
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: "RESEND_API_KEY is not configured." }));
    }

    const subject = `Portfolio contact from ${n || "Website"}`;
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;padding:24px;">
        <h2 style="margin:0 0 16px;">${escapeHtml(siteName)} contact request</h2>
        <p style="margin:0 0 12px;"><strong>Name:</strong> ${escapeHtml(n)}</p>
        <p style="margin:0 0 12px;"><strong>Email:</strong> ${escapeHtml(e)}</p>
        <div style="margin:18px 0 0;padding:16px;border-left:4px solid #111;background:#f7f7f7;white-space:pre-wrap;">${escapeHtml(m)}</div>
      </div>
    `;

    const text = [`Name: ${n}`, `Email: ${e}`, "", m].join("\n");

    const result = await resend.emails.send({
      from: resendFrom,
      to: [contactTo],
      replyTo: e,
      subject,
      html,
      text,
    });

    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, id: result?.data?.id || null }));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send email.";
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: message }));
  }
};
