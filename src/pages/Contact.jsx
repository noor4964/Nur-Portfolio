import { useState } from "react";
import SectionHead from "../components/SectionHead";
import usePageMeta from "../hooks/usePageMeta";
import { PROFILE } from "../data/profile";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div className="info-block">
      <div className="info-label">Email</div>
      <div className="copy-row">
        <a className="info-value" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        <button
          type="button"
          className={`copy-btn${copied ? " ok" : ""}`}
          onClick={copy}
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default function Contact() {
  usePageMeta(
    `Contact — ${PROFILE.name}`,
    `Get in touch with ${PROFILE.name} for full-stack development roles, AI/ML research collaborations or freelance projects.`
  );

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ email: false, message: false });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const emailValid = EMAIL_RE.test(email);
    const msgValid = message.length > 4;

    if (!emailValid || !msgValid) {
      setErrors({ email: !emailValid, message: !msgValid });
      return;
    }

    setSending(true);
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(payload?.error || "Failed to send message.");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page">
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Contact"
            title="Let's build something great"
            desc="Whether it's a full-time role, an internship, a research collaboration or a product idea — I'd love to hear about it."
          />

          <div className="contact-grid">
            {/* ── info column ── */}
            <div>
              <div className="info-list">
                <CopyEmail />
                <div className="info-block">
                  <div className="info-label">Phone</div>
                  <a className="info-value" href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>
                    {PROFILE.phone}
                  </a>
                </div>
                <div className="info-block">
                  <div className="info-label">Location</div>
                  <span className="info-value">{PROFILE.location}</span>
                </div>
                <div className="info-block">
                  <div className="info-label">GitHub</div>
                  <a className="info-value" href={PROFILE.github} target="_blank" rel="noreferrer">
                    {PROFILE.githubLabel}
                  </a>
                </div>
                <div className="info-block">
                  <div className="info-label">LinkedIn</div>
                  <a className="info-value" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                    {PROFILE.linkedinLabel}
                  </a>
                </div>
              </div>

              <div className="contact-note" style={{ marginTop: 28 }}>
                I usually reply within 24 hours. For opportunities, attaching context about the
                role or project helps me respond faster.
              </div>
            </div>

            {/* ── form column ── */}
            <div className="form-card">
              {sent ? (
                <div className="form-success" role="status">
                  <h3>Message sent</h3>
                  <p>Thanks for reaching out — I'll get back to you shortly.</p>
                  <button className="btn btn-secondary" onClick={() => setSent(false)}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <div className="field">
                    <label htmlFor="cf-name">Your name</label>
                    <input
                      id="cf-name"
                      className="input"
                      placeholder="Jane Doe"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="cf-email">Email address</label>
                    <input
                      id="cf-email"
                      type="email"
                      className={`input${errors.email ? " invalid" : ""}`}
                      placeholder="jane@company.com"
                      autoComplete="email"
                      value={form.email}
                      aria-invalid={errors.email}
                      aria-describedby={errors.email ? "cf-email-error" : undefined}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, email: e.target.value }));
                        setErrors((s) => ({ ...s, email: false }));
                      }}
                    />
                    {errors.email && (
                      <span id="cf-email-error" className="error-text" role="alert">
                        Please enter a valid email address.
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label htmlFor="cf-message">Your message</label>
                    <textarea
                      id="cf-message"
                      rows={6}
                      className={`textarea${errors.message ? " invalid" : ""}`}
                      placeholder="Tell me about the role, project or idea…"
                      value={form.message}
                      aria-invalid={errors.message}
                      aria-describedby={errors.message ? "cf-msg-error" : undefined}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, message: e.target.value }));
                        setErrors((s) => ({ ...s, message: false }));
                      }}
                    />
                    {errors.message && (
                      <span id="cf-msg-error" className="error-text" role="alert">
                        Message is a little short (minimum 5 characters).
                      </span>
                    )}
                  </div>

                  {serverError && (
                    <div className="form-alert error" role="alert">
                      {serverError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Send message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
