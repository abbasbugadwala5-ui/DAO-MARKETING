import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

// ── Zoho CRM Web-to-Lead ────────────────────────────────────────────────
// Public form identifiers from the Zoho "Website Contact Form" web form.
// (These are the same tokens Zoho embeds in a public web form — not secrets.)
const ZOHO_LEAD_URL = 'https://crm.zoho.com/crm/WebToLeadForm';
const ZOHO_XNQSJSDP = 'f1c08c82d933119571c47f2b912bc76a1ec41640fe3cc1f4e2a3d01d2b527198';
const ZOHO_XMIWTLD  = '434a2088501fb6e074c89af27cb7171cbd4ce668b63284546872178e92c1aa6f6c82b1b4eca4257b7709d73e6446ee25';

// Creates a Lead in Zoho CRM. Never throws — returns true if Zoho accepted
// the submission, false otherwise. A CRM hiccup must not break the form.
async function sendToZohoLead({ name, email, phone, company, website, message }) {
  try {
    const params = new URLSearchParams({
      xnQsjsdp: ZOHO_XNQSJSDP,
      xmIwtLD: ZOHO_XMIWTLD,
      actionType: 'TGVhZHM=', // base64 for "Leads"
      'Last Name': name,                 // Zoho requires Last Name
      'Email': email,                    // Zoho requires Email
      'Phone': phone || '',
      'Website': website || '',
      'Company': company || 'Not provided', // Zoho requires Company
      'Description': message,
      'Lead Source': 'Web Download',  // value from the Zoho Lead Source picklist
      'Lead Status': 'Not Contacted', // closest "new lead" value in the picklist
    });

    const res = await fetch(ZOHO_LEAD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // A browser-like UA helps Zoho accept the Web-to-Lead POST.
        'User-Agent': 'Mozilla/5.0 (compatible; DAO-Website/1.0)',
      },
      body: params.toString(),
      redirect: 'manual', // Zoho replies with a redirect to returnURL; we ignore it
    });
    // Zoho returns 200 or a 3xx redirect on success; >=400 means rejected.
    const ok = res.status < 400;
    if (!ok) console.error('[/api/contact] Zoho lead non-OK status:', res.status);
    return ok;
  } catch (zErr) {
    console.error('[/api/contact] Zoho lead error:', zErr);
    return false;
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, company, website, service, budget, message } = data || {};

    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: 'Name, email and message are required.' },
        { status: 400 }
      );
    }

    // 1) Forward the enquiry to Zoho CRM as a Lead (never throws).
    const zohoOk = await sendToZohoLead({ name, email, phone, company, website, message });

    // 2) Send the email notification — best-effort. If email is misconfigured
    //    or fails, we still treat the submission as successful as long as the
    //    CRM lead was captured, so the visitor never sees a false error.
    let emailOk = false;
    try {
      const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
      const port = Number(process.env.SMTP_PORT || 465);
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;
      const to   = process.env.CONTACT_TO || user;

      if (!user || !pass) {
        throw new Error('SMTP credentials not configured on the server.');
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
          <tr><td style="padding: 8px 0; color: #8E6F47;">Phone</td><td>${safe(phone) || '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #8E6F47;">Website</td><td>${safe(website) || '—'}</td></tr>
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
      `Phone: ${phone || '—'}\n` +
      `Website: ${website || '—'}\n` +
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
      emailOk = true;
    } catch (mailErr) {
      console.error('[/api/contact] email error:', mailErr);
    }

    // Success if the lead reached Zoho OR the email was sent.
    if (zohoOk || emailOk) {
      return Response.json({ success: true });
    }

    return Response.json(
      { success: false, error: 'Could not send. Please try again.' },
      { status: 500 }
    );
  } catch (err) {
    console.error('[/api/contact] handler error:', err);
    return Response.json(
      { success: false, error: 'Could not send. Please try again.' },
      { status: 500 }
    );
  }
}
