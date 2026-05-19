'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';

const servicesList = ['Strategy','Branding','Product Design','E-commerce','CRO Audit'];
const budgets = ['Under $10k','$10k – $25k','$25k – $50k','$50k+'];
const steps = [
  { n:'01', t:'We reply within 24 hours', d:'A real person from the studio reads every enquiry and responds fast.', c:'#B8472B' },
  { n:'02', t:'Discovery call', d:'A 30-minute call to align on goals, scope and timeline — no pitch theatre.', c:'#1E3D38' },
  { n:'03', t:'Tailored proposal', d:'A clear proposal with scope, milestones and pricing, usually within a week.', c:'#2E2140' },
];

export default function ContactPage() {
  const root = useRef(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', company:'', service:'', budget:'', message:'' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.c-word', { yPercent:115, duration:1.1, ease:'expo.out', stagger:0.06, delay:0.15 });
    gsap.from('.c-fade', { y:30, opacity:0, duration:0.9, ease:'power3.out', stagger:0.1, delay:0.5 });
    gsap.from('.c-step', { y:50, opacity:0, duration:0.9, ease:'power3.out', stagger:0.12,
      scrollTrigger:{ trigger:'.c-steps', start:'top 82%' } });
  }, { scope: root });

  return (
    <main ref={root} className="pt-[120px]">
      <section className="section-wrap">
        <div className="eyebrow text-inksoft" style={{ marginBottom:18 }}>Get in touch</div>
        <h1 className="section-title" style={{ maxWidth:'16ch' }}>
          {"Let's start the conversation.".split(' ').map((w,i)=>(
            <span key={i} className="reveal-line"><span className="c-word reveal-word">{w}&nbsp;</span></span>
          ))}
        </h1>
        <p className="c-fade body-lg" style={{ maxWidth:'46ch', marginTop:22, color:'var(--color-inksoft)' }}>
          Tell us about the project. Whether it is a full rebrand or a focused
          conversion sprint, we will come back with a clear next step.
        </p>
      </section>

      <section className="section-wrap" style={{ paddingTop:72, paddingBottom:40 }}>
        <div className="contact-grid">
          <div className="c-fade contact-form-card">
            {sent ? (
              <div className="contact-success">
                <div className="contact-success-dot" />
                <h3 className="card-title" style={{ fontSize:'clamp(24px,2.4vw,34px)' }}>Thank you — message received.</h3>
                <p className="body" style={{ color:'var(--color-inksoft)', marginTop:12 }}>
                  We will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={(e)=>{e.preventDefault();setSent(true);}} className="contact-form">
                <div className="field"><label>Your name</label>
                  <input required value={form.name} onChange={set('name')} placeholder="Jane Doe" /></div>
                <div className="field-row">
                  <div className="field"><label>Email</label>
                    <input required type="email" value={form.email} onChange={set('email')} placeholder="jane@company.com" /></div>
                  <div className="field"><label>Company</label>
                    <input value={form.company} onChange={set('company')} placeholder="Company name" /></div>
                </div>
                <div className="field-row">
                  <div className="field"><label>Service</label>
                    <select required value={form.service} onChange={set('service')}>
                      <option value="" disabled>Select one</option>
                      {servicesList.map(s=><option key={s}>{s}</option>)}
                    </select></div>
                  <div className="field"><label>Budget</label>
                    <select required value={form.budget} onChange={set('budget')}>
                      <option value="" disabled>Select range</option>
                      {budgets.map(b=><option key={b}>{b}</option>)}
                    </select></div>
                </div>
                <div className="field"><label>Project details</label>
                  <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="A few lines about what you need…" /></div>
                <button type="submit" className="contact-submit">Send enquiry <span aria-hidden>↗</span></button>
              </form>
            )}
          </div>
          <aside className="c-fade contact-aside">
            <div><h4 className="eyebrow text-inksoft">Email</h4>
              <a href="mailto:hello@daostudio.ae" className="contact-line">hello@daostudio.ae</a></div>
            <div><h4 className="eyebrow text-inksoft">Phone</h4>
              <a href="tel:+97140000000" className="contact-line">+971 4 000 0000</a></div>
            <div><h4 className="eyebrow text-inksoft">Studio</h4>
              <p className="contact-line">Design District<br/>Dubai, UAE</p></div>
            <div><h4 className="eyebrow text-inksoft">Hours</h4>
              <p className="contact-line">Sun – Thu<br/>9:00 – 18:00 GST</p></div>
          </aside>
        </div>
      </section>

      <section className="section-wrap c-steps" style={{ paddingTop:80, paddingBottom:120 }}>
        <div className="eyebrow text-inksoft" style={{ marginBottom:18 }}>What happens next</div>
        <div className="steps-grid">
          {steps.map((s)=>(
            <div key={s.n} className="c-step step-card">
              <span className="step-dot" style={{ background:s.c }} />
              <span className="step-num">{s.n}</span>
              <h3 className="heading-md" style={{ marginTop:14 }}>{s.t}</h3>
              <p className="body-sm" style={{ color:'var(--color-inksoft)', marginTop:8 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
