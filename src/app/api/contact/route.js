import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// ── Zoho CRM Web-to-Lead ────────────────────────────────────────────────
// Public form identifiers from the Zoho "Website Contact Form" web form.
// (These are the same tokens Zoho embeds in a public web form — not secrets.)
const ZOHO_LEAD_URL = 'https://crm.zoho.com/crm/WebToLeadForm';
const ZOHO_XNQSJSDP = 'cb04311586b4d53d21eca6d4ce092feb34e902bc40e2d24e90330204cc93fa1b';
const ZOHO_XMIWTLD  = '4e9902a206a564502be1d296549f7266c13f3a20816bbafabe362d0594aa58a6a275be003d66d407cc3d99c52d70f576';

// Creates a Lead in Zoho CRM. Never throws — a CRM hiccup must not break
// the contact form or the email notification.
async function sendToZohoLead({ name, email, company, message }) {
  try {
    const params = new URLSearchParams({
      xnQsjsdp: ZOHO_XNQSJSDP,
      xmIwtLD: ZOHO_XMIWTLD,
      actionType: 'TGVhZHM=', // base64 for "Leads"
      'Last Name': name,                 // Zoho requires Last Name
      'Email': email,                    // Zoho requires Email
      'Company': company || 'Not provided', // Zoho requires Company
      'Description': message,
    });

    const res = await fetch(ZOHO_LEAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      redirect: 'manual', // Zoho replies with a redirect to returnURL; we ignore it
    });
    // Zoho returns 200 or a 3xx redirect on success.
    if (res.status >= 400) {
      console.error('[/api/contact] Zoho lead non-OK status:', res.status);
    }
  } catch (zErr) {
    console.error('[/api/contact] Zoho lead error:', zErr);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, company, service, budget, message } = data || {};

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    // Forward the enquiry to Zoho CRM as a Lead (non-blocking, never throws).
    await sendToZohoLead({ name, email, company, message });

    const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
    const port = Number(process.env.SMTP_PORT || 465);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to   = process.env.CONTACT_TO || user;

    if (!user || !pass) {
      return Response.json(
        { success: false, error: 'SMTP credentials not configured on the server.' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const safe = (s) => String(s || '').replace(/[<>]/g, '');

    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #faf2d8; padding: 28px;">
        <h2 style="font-family: Georgia, serif; font-style: italic; font-weight: 500; color: #1a1a1a; margin: 0 0 12px;">
          New enquiry — DAO Marketing
        </h2>
        <p style="color: #5c5c5c; margin: 0 0 24px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;">
          From the website contact form
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1a1a1a;">
          <tr><td style="padding: 8px 0; width: 110px; color: #8E6F47;">Name</td><td>${safe(name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #8E6F47;">Email</td><td><a href="mailto:${safe(email)}" style="color: #1a1a1a;">${safe(email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #8E6F47;">Company</td><td>${safe(company) || '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #8E6F47;">Service</td><td>${safe(service)}</td></tr>
          <tr><td style="padding: 8px 0; color: #8E6F47;">Budget</td><td>${safe(budget)}</td></tr>
        </table>
        <h3 style="margin: 28px 0 10px; color: #1a1a1a; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase;">
          Project details
        </h3>
        <p style="color: #1a1a1a; line-height: 1.6; white-space: pre-wrap; margin: 0;">${safe(message)}</p>
        <hr style="border: none; border-top: 1px solid rgba(26,26,26,0.12); margin: 28px 0;">
        <p style="font-size: 11px; color: #8E6F47; text-align: center; letter-spacing: 0.18em; text-transform: uppercase; margin: 0;">
          DAO Marketing · Dubai
        </p>
      </div>
    `;

    const text =
      `New enquiry — DAO Marketing\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Company: ${company || '—'}\n` +
      `Service: ${service}\n` +
      `Budget: ${budget}\n\n` +
      `Project details:\n${message}`;

    await transporter.sendMail({
      from: `"DAO Marketing Website" <${user}>`,
      to,
      replyTo: email,
      subject: `New enquiry — ${name}`,
      text,
      html,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('[/api/contact] sendMail error:', err);
    return Response.json(
      { success: false, error: 'Could not send. Please try again.' },
      { status: 500 }
    );
  }
}
