import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendQuoteNotification = async (quote) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.ADMIN_DEFAULT_EMAIL,
    subject: `New Quote Request from ${quote.name}`,
    html: `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${quote.name}</p>
      <p><strong>Email:</strong> ${quote.email}</p>
      <p><strong>Phone:</strong> ${quote.phone || 'N/A'}</p>
      <p><strong>Project Type:</strong> ${quote.projectType || 'N/A'}</p>
      <p><strong>Budget:</strong> ${quote.budget || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p>${quote.message}</p>
      <p><strong>Submitted:</strong> ${new Date(quote.createdAt).toLocaleString()}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
