import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Visitor input goes into HTML emails, so it is escaped before use. */
function escapeHtml(value: unknown, max: number): string {
  return String(value ?? "")
    .slice(0, max)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const lead = await request.json();
    const rawEmail = String(lead.email ?? "").trim();

    // Basic Validation
    if (!lead.name || !rawEmail || !lead.service) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, service)." },
        { status: 400 }
      );
    }
    if (rawEmail.length > 254 || !EMAIL_RE.test(rawEmail)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const name = escapeHtml(lead.name, 100);
    const email = escapeHtml(rawEmail, 254);
    const phone = escapeHtml(lead.phone, 30);
    const service = escapeHtml(lead.service, 120);
    const details = escapeHtml(lead.details, 3000);
    const source = escapeHtml(lead.source || "website", 40);
    const submittedAt = escapeHtml(lead.submittedAt, 40);

    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim();

    if (!emailUser || !emailPass) {
      console.error("Missing email configuration environment variables.");
      return NextResponse.json(
        { error: "Server mail configuration is incomplete." },
        { status: 500 }
      );
    }

    // Create SMTP Transporter (defaults to Gmail)
    const host = process.env.EMAIL_HOST?.trim() || "smtp.gmail.com";
    const port = parseInt(process.env.EMAIL_PORT?.trim() || "465");
    const secure = process.env.EMAIL_SECURE?.trim() !== "false";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    // 1. Inquirer Confirmation Email (HTML Template)
    let userHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>We've received your inquiry! · Sorta Famous</title>
  <style>
    body {
      background-color: #f2ece0;
      color: #1c1d1a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f2ece0;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fcfbf9;
      border: 1px solid rgba(28, 29, 26, 0.08);
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
      border-bottom: 1px solid rgba(28, 29, 26, 0.08);
      padding-bottom: 24px;
    }
    .logo {
      font-family: Georgia, serif;
      font-size: 26px;
      font-weight: normal;
      letter-spacing: -0.02em;
      color: #26533f;
      text-decoration: none;
      display: inline-block;
    }
    .tagline {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #7b7e76;
      margin-top: 6px;
    }
    h1 {
      font-family: Georgia, serif;
      font-weight: normal;
      font-size: 24px;
      line-height: 1.2;
      color: #1c1d1a;
      margin-top: 0;
      margin-bottom: 16px;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #41433c;
      margin-bottom: 24px;
    }
    .details-box {
      background-color: #f6f2ea;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 32px;
      border: 1px solid rgba(28, 29, 26, 0.04);
    }
    .details-title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #7b7e76;
      margin-bottom: 16px;
      font-weight: bold;
    }
    .detail-row {
      margin-bottom: 12px;
      font-size: 14px;
      line-height: 1.5;
    }
    .detail-row:last-child {
      margin-bottom: 0;
    }
    .detail-label {
      font-weight: 600;
      color: #1c1d1a;
      width: 100px;
      display: inline-block;
    }
    .detail-value {
      color: #41433c;
    }
    .button-container {
      text-align: center;
      margin-bottom: 32px;
    }
    .button {
      background-color: #26533f;
      color: #f2ece0 !important;
      padding: 14px 28px;
      border-radius: 999px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      display: inline-block;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #7b7e76;
      border-top: 1px solid rgba(28, 29, 26, 0.08);
      padding-top: 24px;
      margin-top: 32px;
    }
    .footer a {
      color: #26533f;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="logo">Sorta Famous</div>
        <div class="tagline">Fame is earned. We manage the rest.</div>
      </div>
      
      <h1>Hey {{name}}, Let's build a reputation people remember.</h1>
      <p>Thanks for getting in touch with us! We have successfully received your inquiry. A strategist from our team is already reviewing your details, and we will reach out to you within 24 hours with a tailored plan.</p>
      
      <div class="details-box">
        <div class="details-title">Summary of your Inquiry</div>
        <div class="detail-row">
          <span class="detail-label">Service:</span>
          <span class="detail-value">{{service}}</span>
        </div>
        {{phone_block}}
        {{details_block}}
      </div>

      <p>In the meantime, feel free to check out our latest case studies or respond to this email if you have any questions.</p>

      <div class="button-container">
        <a href="https://sortafamous.in" class="button">Visit Our Website</a>
      </div>

      <div class="footer">
        <p>&copy; 2026 Sorta Famous. All rights reserved.<br>
        Patel Commercial Premises, Andheri West, Mumbai 400053<br>
        Email: <a href="mailto:hellothere@sortafamous.in">hellothere@sortafamous.in</a> | Phone: <a href="tel:+918814999939">+91 8814 999 939</a></p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Process variables in user HTML
    userHtml = userHtml
      .replace(/{{name}}/g, () => name)
      .replace(/{{service}}/g, () => service)
      .replace(
        /{{phone_block}}/g,
        () =>
          phone
          ? `<div class="detail-row"><span class="detail-label">Phone:</span><span class="detail-value">${phone}</span></div>`
          : ""
      )
      .replace(
        /{{details_block}}/g,
        () =>
          details
          ? `<div class="detail-row"><span class="detail-label">Details:</span><span class="detail-value">${details}</span></div>`
          : ""
      );

    // 2. Admin Notification Email (HTML Template)
    let adminHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead captured · Sorta Famous</title>
  <style>
    body {
      background-color: #f2ece0;
      color: #1c1d1a;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 100%;
      background-color: #f2ece0;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fcfbf9;
      border: 1px solid rgba(28, 29, 26, 0.08);
      border-radius: 24px;
      padding: 40px;
    }
    .header {
      border-bottom: 2px solid #26533f;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .title {
      font-family: Georgia, serif;
      font-size: 22px;
      color: #26533f;
      margin: 0;
    }
    .source-tag {
      display: inline-block;
      background-color: #26533f;
      color: #f2ece0;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 4px 8px;
      border-radius: 4px;
      margin-top: 8px;
      font-weight: bold;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    th, td {
      padding: 12px 0;
      border-bottom: 1px solid rgba(28, 29, 26, 0.08);
      text-align: left;
      vertical-align: top;
    }
    th {
      font-weight: 600;
      color: #1c1d1a;
      width: 130px;
    }
    td {
      color: #41433c;
    }
    .details-content {
      white-space: pre-wrap;
      font-size: 14px;
      line-height: 1.5;
    }
    .reply-button-container {
      text-align: center;
      margin-top: 24px;
    }
    .reply-button {
      background-color: #1c1d1a;
      color: #fcfbf9 !important;
      padding: 12px 24px;
      border-radius: 999px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="title">New Lead captured</h1>
        <span class="source-tag">{{source}}</span>
      </div>
      
      <table>
        <tr>
          <th>Name</th>
          <td>{{name}}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td><a href="mailto:{{email}}">{{email}}</a></td>
        </tr>
        {{phone_row}}
        <tr>
          <th>Service Needed</th>
          <td>{{service}}</td>
        </tr>
        {{details_row}}
        <tr>
          <th>Submitted At</th>
          <td>{{submittedAt}}</td>
        </tr>
      </table>

      <div class="reply-button-container">
        <a href="mailto:{{email}}?subject=Re:%20Inquiry%20regarding%20{{service}}%20-%20Sorta%20Famous" class="reply-button">Reply directly to {{name}}</a>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Process variables in admin HTML
    adminHtml = adminHtml
      .replace(/{{name}}/g, () => name)
      .replace(/{{email}}/g, () => email)
      .replace(/{{service}}/g, () => service)
      .replace(/{{source}}/g, () => source)
      .replace(/{{submittedAt}}/g, () => submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))
      .replace(
        /{{phone_row}}/g,
        () =>
          phone
          ? `<tr><th>Phone</th><td><a href="tel:${phone}">${phone}</a></td></tr>`
          : ""
      )
      .replace(
        /{{details_row}}/g,
        () =>
          details
          ? `<tr><th>Project Details</th><td><div class="details-content">${details}</div></td></tr>`
          : ""
      );

    // Send emails concurrently
    await Promise.all([
      // Send receipt/confirmation to the inquirer
      transporter.sendMail({
        from: `"Sorta Famous" <${emailUser}>`,
        to: rawEmail,
        subject: "We've received your request! · Sorta Famous",
        html: userHtml,
      }),
      // Send notification to the Sorta Famous inbox (EMAIL_USER itself)
      transporter.sendMail({
        from: `"Sorta Famous Lead Bot" <${emailUser}>`,
        to: emailUser, // Sends to self as admin
        subject: `New Lead Alert: ${String(lead.name).slice(0, 100)} - ${String(lead.service).slice(0, 120)} (${source})`,
        html: adminHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending emails:", error);
    return NextResponse.json(
      { error: "Failed to process lead form. Please email hellothere@sortafamous.in." },
      { status: 500 }
    );
  }
}
