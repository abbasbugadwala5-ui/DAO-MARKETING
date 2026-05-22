'use client';
import { useState } from 'react';

const servicesList = ['Strategy', 'Branding', 'Product Design', 'Web Design & Dev', 'E-commerce', 'CRO Audit', 'SEO', 'Paid Media', 'Social Media', 'Email & CRM'];
const budgets = ['Under $10k', '$10k – $25k', '$25k – $50k', '$50k+'];

export default function ContactFormSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
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
              <div className="cv2-success-dot" />
              <h3 className="cv2-success-title">Thank you — message received.</h3>
              <p className="cv2-success-note">
                We&rsquo;ll be in touch within one business day.
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
                  <label>Company</label>
                  <input value={form.company} onChange={set('company')} placeholder="Company name" />
                </div>
              </div>
              <div className="cv2-field-row">
                <div className="cv2-field">
                  <label>Service</label>
                  <select required value={form.service} onChange={set('service')}>
                    <option value="" disabled>Select one</option>
                    {servicesList.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="cv2-field">
                  <label>Budget</label>
                  <select required value={form.budget} onChange={set('budget')}>
                    <option value="" disabled>Select range</option>
                    {budgets.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>
              <div className="cv2-field">
                <label>Project details</label>
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
          <div className="cv2-aside-item">
            <span className="cv2-aside-label">Email</span>
            <a href="mailto:fraz@daomarketing.com" className="cv2-aside-value">fraz@daomarketing.com</a>
          </div>
          <div className="cv2-aside-item">
            <span className="cv2-aside-label">Phone</span>
            <a href="tel:+971504425845" className="cv2-aside-value">+971 50 442 5845</a>
          </div>
          <div className="cv2-aside-item">
            <span className="cv2-aside-label">Office</span>
            <span className="cv2-aside-value">The One Tower</span>
            <span className="cv2-aside-sub">24th Floor · Office 9<br />Sheikh Zayed Road, Dubai</span>
          </div>
          <div className="cv2-aside-item">
            <span className="cv2-aside-label">Hours</span>
            <span className="cv2-aside-value">Mon – Sat</span>
            <span className="cv2-aside-sub">8:00 – 6:00 GST</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
