const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const menuRouter = require('./routes/menu');

const app = express();

// FRONTEND_URL: orígenes separados por comas, con trim.
// Si no está definida (o es '*'), se permiten todos.
const configuredOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin:
    configuredOrigins.length === 0 || configuredOrigins.includes('*')
      ? '*'
      : configuredOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(menuRouter);

const PORT = process.env.PORT || 5000;

app.post('/send-email', async (req, res) => {
  const { name, email, phone, reason, message } = req.body;

  if (!name || !email || !phone || !reason) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
      console.error('Faltan RESEND_API_KEY o CONTACT_EMAIL en el entorno');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Se crea dentro del handler: si no hay API key, el constructor lanza y
    // se captura aquí en vez de tumbar el servidor al arrancar.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Oníriko Web <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL],
      replyTo: email,
      subject: 'New Contact Form: ' + reason,
      text: `You have a new message from your website:

Name: ${name}
Email: ${email}
Phone: ${phone}
Reason: ${reason}
Message: ${message}`,
    });

    if (error) {
      console.error('Error de Resend al enviar el correo:', error);
      const status =
        error.statusCode >= 400 && error.statusCode < 500 ? 400 : 500;
      return res.status(status).json({ error: 'Error sending email' });
    }

    console.log('Correo enviado con id:', data?.id);
    return res
      .status(200)
      .json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
