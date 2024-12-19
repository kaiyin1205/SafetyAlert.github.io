const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Callback endpoint to handle LINE Notify authorization
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  try {
    // Exchange authorization code for access token
    const response = await axios.post('https://notify-bot.line.me/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://kaiyin1205.github.io/SafetyAlert.github.io/callback',
        client_id: 'TK8T26jWCtKnR9r6B2xS0C',
        client_secret: 'YOUR_CLIENT_SECRET', // Replace with your LINE Notify Client Secret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;

    // Save the access token (e.g., to a database, here logged as an example)
    console.log('Access Token:', accessToken);

    // Respond with a success message to the user
    res.send('Authorization successful! You have linked LINE Notify and can now receive notifications.');
  } catch (error) {
    console.error('Error exchanging code for access token:', error.response?.data || error);
    res.status(500).send('Authorization failed. Please try again.');
  }
});

// API endpoint to send LINE notifications
app.post('/send-notification', async (req, res) => {
  const { token, message } = req.body;

  try {
    const response = await axios.post('https://notify-api.line.me/api/notify', null, {
      params: {
        message,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Notification sent:', response.data);
    res.send('Notification sent successfully!');
  } catch (error) {
    console.error('Error sending notification:', error.response?.data || error);
    res.status(500).send('Failed to send notification. Please check the token or message content.');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
