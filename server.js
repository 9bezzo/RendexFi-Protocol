const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());

// Damit dein HTML und CSS erreichbar sind:
const __dirname = path.resolve();
app.use(express.static(__dirname));

// API Route
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) return res.status(400).json({ error: 'Invalid email' });

  try {
    const response = await fetch('https://api.improvmx.com/v3/send', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('api:' + process.env.IMPROVMX_API_KEY).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'beta@rendexfi.app',
        to: 'bezzo19@gmx.de',
        subject: 'Neue Beta-Anmeldung',
        text: `Neue Beta-Anmeldung von: ${email}`
      })
    });

    if (!response.ok) throw new Error(await response.text());
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'E-Mail-Versand fehlgeschlagen.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ RendexFi läuft auf http://localhost:${PORT}`));