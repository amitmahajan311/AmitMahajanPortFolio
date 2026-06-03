export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Retrieve secret variables from the server environment, supporting VITE_ prefixes as fallbacks
  const apiKey = process.env.BREVO_API_KEY || process.env.VITE_BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.VITE_BREVO_SENDER_EMAIL || "amitmahajan264889@gmail.com";
  const senderName = process.env.BREVO_SENDER_NAME || process.env.VITE_BREVO_SENDER_NAME || "Amit Mahajan Portfolio";

  if (!apiKey) {
    return res.status(500).json({ message: 'Server configuration error: Brevo API key is not set.' });
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail
        },
        to: [
          {
            email: senderEmail,
            name: "Amit Mahajan"
          }
        ],
        replyTo: {
          email: email,
          name: name
        },
        subject: `Portfolio Contact: ${subject}`,
        htmlContent: `
          <h3>New Message from Portfolio Contact Form</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; line-height: 1.5; color: #333;">${message}</p>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to send email via Brevo.");
    }

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Serverless Email Error:", error);
    return res.status(500).json({ message: error.message || "Failed to process email request." });
  }
}
