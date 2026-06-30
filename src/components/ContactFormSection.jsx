'use client';
import { useState } from 'react';

export default function ContactFormSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', website: '', message: '',
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    // Required fields: Name, Email, Description.
    // Company is optional.
    const name    = form.name.trim();
    const email   = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) {
      setError('Please fill in your name, email and description.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('That email doesn’t look right — please check and try again.');
      return;
    }

    setSending(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        setSent(true);
      } else {
        setError(
          data?.error ||
          'Could not send. Please email fraz@daomarketing.com directly.'
        );
      }
    } catch (err) {
      setError('Network issue. Please email fraz@daomarketing.com directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="cv2-form-section">
      <div className="cv2-form-grid">
        <div className="cv2-form-card">
          {sent ? (
            <div className="cv2-success">
              <div className="cv2-success-seal" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none">
                  <path
                    d="M14 25l7 7 14-15"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="cv2-success-title">
                Thank you — message <em>received</em>.
              </h3>
              <p className="cv2-success-note">
                One of our team members will review your enquiry and reply with a clear
                next step within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="cv2-form">
              <div className="cv2-field">
                <label>Your name</label>
                <input required value={form.name} onChange={set('name')} placeholder="Jane Doe" />
              </div>
              <div className="cv2-field-row">
                <div className="cv2-field">
                  <label>Email</label>
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" />
                </div>
                <div className="cv2-field">
                  <label>Phone <span className="cv2-optional">— optional</span></label>
                  <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+971 50 000 0000" />
                </div>
              </div>
              <div className="cv2-field-row">
                <div className="cv2-field">
                  <label>Company <span className="cv2-optional">— optional</span></label>
                  <input value={form.company} onChange={set('company')} placeholder="Company name" />
                </div>
                <div className="cv2-field">
                  <label>Website <span className="cv2-optional">— optional</span></label>
                  <input type="text" value={form.website} onChange={set('website')} placeholder="yourcompany.com" />
                </div>
              </div>
              <div className="cv2-field">
                <label>Description</label>
                <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="A few lines about what you need…" />
              </div>

              {error && <p className="cv2-error">{error}</p>}

              <button type="submit" className="cv2-submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send enquiry'}
                <span aria-hidden className="cv2-submit-arrow">↗</span>
              </button>
            </form>
          )}
        </div>

        <aside className="cv2-aside">
          {/* OFFICE */}
          <div className="cv2-aside-item">
            <svg className="cv2-aside-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="cv2-aside-value">
              The One Tower<br />
              24th Floor · Office 9<br />
              Sheikh Zayed Road, Dubai
            </p>
          </div>

          {/* HOURS */}
          <div className="cv2-aside-item">
            <svg className="cv2-aside-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <p className="cv2-aside-value">Mon – Sat</p>
            <span className="cv2-aside-sub">8:00 – 6:00 GST</span>
          </div>

          {/* EMAIL */}
          <div className="cv2-aside-item">
            <svg className="cv2-aside-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
              <path d="m3 6 9 7 9-7" />
            </svg>
            <a
              href="mailto:fraz@daomarketing.com"
              className="cv2-aside-value"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'email_click', {
                    email: 'fraz@daomarketing.com',
                    location: 'contact_aside',
                  });
                }
              }}
            >
              fraz@daomarketing.com
            </a>
          </div>

          {/* PHONE */}
          <div className="cv2-aside-item">
            <svg className="cv2-aside-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <a
              href="tel:+971504425845"
              className="cv2-aside-value"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'phone_click', {
                    phone: '+971504425845',
                    location: 'contact_aside',
                  });
                }
              }}
            >
              +971 50 442 5845
            </a>
          </div>

        </aside>
      </div>
    </section>
  );
}
