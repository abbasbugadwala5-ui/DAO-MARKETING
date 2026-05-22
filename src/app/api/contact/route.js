import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

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
