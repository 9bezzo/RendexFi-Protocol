export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // ImprovMX API aufrufen
    const response = await fetch('https://api.improvmx.com/v3/send', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('api:' + process.env.IMPROVMX_API_KEY).toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'beta@rendexfi.app',      // deine Domain-Mail
        to: 'bezzo19@gmx.de',           // wohin die Nachricht gesendet werden soll
        subject: 'Neue Beta-Anmeldung',
        text: `Neue Beta-Anmeldung von: ${email}`
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Mail Error:', error);
    res.status(500).json({ error: 'E-Mail-Versand fehlgeschlagen.' });
  }
}
